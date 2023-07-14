import PropTypes from 'prop-types';
import { Overlay, ModalImg } from './Modal.styled';

export const Modal = ({ url, closeModal }) => {
  return (
    <>
      <Overlay>
        <ModalImg>
          <img src={url} alt="" onClick={closeModal} />
        </ModalImg>
      </Overlay>
    </>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
