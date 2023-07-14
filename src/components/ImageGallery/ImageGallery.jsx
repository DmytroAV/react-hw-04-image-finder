import { Component } from 'react';
import { fetchImages } from '../../services/fetchImage';
import { Loader } from '../Loader/Loader';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { ContainerGallery } from './ImageGallery.styled';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { HTTP_ERR_MSG } from '../../constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

const notifyOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

let page = 1;
class ImageGallery extends Component {
  state = {
    items: [],
    currentQuery: '',
    largeImage: '',
    isLoader: false,
    isOpenModal: false,
    error: null,
  };

  componentDidMount() {
    window.addEventListener('click', this.handleCloseModal);
    window.addEventListener('keydown', this.closeModalOnEscape);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.fetchImages(this.props.query, page);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleCloseModal);
    document.removeEventListener('keydown', this.closeModalOnEscape);
  }

  fetchImages = async (query, page) => {
    this.setState({
      isLoader: true,
      currentQuery: query,
      error: null,
    });

    if (query !== this.state.currentQuery) {
      this.setState({ items: [] });
    }

    try {
      const data = await fetchImages(query, page);
      if (data.hits.length <= 0) {
        toast.error(
          `Sorry, there are no images matching your search query '${query}'. Please try again.`,
          notifyOptions
        );
        return;
      }

      if (data.hits.length > 0 && page === 1) {
        toast.success(`Found ${data.totalHits} images`, notifyOptions);
      }
      this.setState(state => ({
        items: [...state.items, ...data.hits],
      }));
    } catch (error) {
      if (error) {
        if (error.code !== 'ERR_CANCELED') {
          this.setState({ error: HTTP_ERR_MSG });
        }
      }
    } finally {
      this.setState({ isLoader: false });
    }
  };

  handleLoadMore = () => {
    this.fetchImages(this.state.currentQuery, (page += 1));
  };

  handleOpenModal = url =>
    this.setState({
      isOpenModal: true,
      largeImage: url,
    });

  handleCloseModal = e => {
    const name = e.target.tagName;
    if (name === 'IMG') {
      return;
    }
    this.setState({ isOpenModal: false });
  };

  closeModalOnEscape = e => {
    if (e.keyCode === 27) {
      this.setState({
        isOpenModal: false,
      });
    }
  };

  render() {
    const { items, isLoader, isOpenModal, largeImage, error } = this.state;
    return (
      <>
        {isLoader && <Loader />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ContainerGallery>
          {items.length > 0 &&
            items.map(item => (
              <ImageGalleryItem
                key={item.id}
                webImage={item.webformatURL}
                largeImage={item.largeImageURL}
                onClick={this.handleOpenModal}
              />
            ))}
          {isOpenModal && (
            <Modal closeModal={this.handleCloseModal} url={largeImage} />
          )}
        </ContainerGallery>
        {items.length > 11 && <Button onLoadMore={this.handleLoadMore} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
