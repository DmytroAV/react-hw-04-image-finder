import { ContainerError, Text } from './ErrorMessage.styled';
import PropTypes from 'prop-types';

export const ErrorMessage = ({ children }) => {
  return (
    <ContainerError>
      <Text>{children}</Text>
    </ContainerError>
  );
};

ErrorMessage.propTypes = {
  children: PropTypes.string.isRequired,
};
