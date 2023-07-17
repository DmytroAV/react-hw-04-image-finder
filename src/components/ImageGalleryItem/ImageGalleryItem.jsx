import { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import { ContainerImage, ImageWeb } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  useEffect(() => {
    window.addEventListener('click', handleCloseModal);
    window.addEventListener('keydown', closeModalOnEscape);
    return () => {
      document.removeEventListener('click', handleCloseModal);
      document.removeEventListener('keydown', closeModalOnEscape);
    };
  }, []);

  const handleOpenModal = url => {
    setIsOpenModal(true);
  };

  const handleCloseModal = e => {
    const name = e.target.tagName;
    if (name === 'IMG') {
      return;
    }
    setIsOpenModal(false);
  };

  const closeModalOnEscape = e => {
    if (e.keyCode === 27) {
      setIsOpenModal(false);
    }
  };

  return (
    <>
      {item && (
        <ContainerImage className="gallery-item">
          <ImageWeb
            id={item.id}
            src={item.webformatURL}
            onClick={handleOpenModal}
            alt="Images and photos"
          />
          {isOpenModal && (
            <Modal closeModal={handleCloseModal} url={item.largeImageURL} />
          )}
        </ContainerImage>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
