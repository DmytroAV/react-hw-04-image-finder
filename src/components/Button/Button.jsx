import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <>
      <LoadMoreBtn type="submit" onClick={onLoadMore}>
        <span className="button-label">Load more</span>
      </LoadMoreBtn>
    </>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
