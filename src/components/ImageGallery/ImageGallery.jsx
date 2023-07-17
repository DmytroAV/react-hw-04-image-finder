import { useState, useEffect } from 'react';
import { fetchImages } from '../../services/fetchImage';
import { Loader } from '../Loader/Loader';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

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

const limit = 12;

function ImageGallery({ query }) {
  const [items, setItems] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(null);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    if (query !== currentQuery) {
      setItems([]);
    }

    setCurrentQuery(query);
  }, [currentQuery, query]);

  useEffect(() => {
    setIsLoader(true);
    setError(null);
    if (currentQuery === '') {
      return;
    }
    async function getImagesItem(currentQuery) {
      try {
        const data = await fetchImages(currentQuery, page, limit);
        if (data.hits.length <= 0) {
          setIsDisable(false);
          toast.error(
            `Sorry, there are no images matching your search query '${currentQuery}'. Please try again.`,
            notifyOptions
          );
          return;
        }

        if (data.hits.length > 0 && page === 1) {
          toast.success(`Found ${data.totalHits} images`, notifyOptions);
        }
        setItems(prevState => [...prevState, ...data.hits]);
        setIsDisable(true);
      } catch (error) {
        if (error) {
          if (error.code !== 'ERR_CANCELED') {
            setIsLoader(HTTP_ERR_MSG);
          }
        }
      } finally {
        setIsLoader(false);
      }
    }

    getImagesItem(currentQuery);
  }, [currentQuery, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {isLoader && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ContainerGallery>
        {items.length > 0 &&
          items.map((item, idx) => (
            <ImageGalleryItem key={idx} id={item.id} item={item} />
          ))}
      </ContainerGallery>
      {isDisable && <Button onLoadMore={handleLoadMore} />}
    </>
  );
}

export default ImageGallery;
ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
