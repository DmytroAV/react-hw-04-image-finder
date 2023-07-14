import PropTypes from 'prop-types';
import { ContainerImage, ImageWeb } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webImage, largeImage, onClick }) => {
  return (
    <>
      <ContainerImage className="gallery-item">
        <ImageWeb
          src={webImage}
          onClick={() => onClick(largeImage)}
          alt="Images and photos"
        />
      </ContainerImage>
    </>
  );
};

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
