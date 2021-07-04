import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

const MenuEmpty = ({ message }) => (
  <MenuItem fontStyle="italic">{message}</MenuItem>
);

MenuEmpty.propTypes = {
  message: PropTypes.string,
};

MenuEmpty.defaultProps = {
  message: 'No options',
};

export default MenuEmpty;
