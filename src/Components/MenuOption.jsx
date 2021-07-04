import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

const MenuOption = ({ label, onPick, ...rest }) => (
  <MenuItem
    cursor="pointer"
    _hover={{
      background: 'red.200',
    }}
    onClick={onPick}
    {...rest}
  >
    {label}
  </MenuItem>
);

MenuOption.propTypes = {
  label: PropTypes.string.isRequired,
  onPick: PropTypes.func.isRequired,
};

export default MenuOption;
