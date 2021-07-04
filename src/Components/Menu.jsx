import { forwardRef } from 'react';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Menu = forwardRef(({ options, open, onPickOption }, ref) => {
  if (!open) return null;

  return (
    <Box
      ref={ref}
      position="absolute"
      top="100%"
      marginY="4px"
      width="100%"
      boxSizing="border-box"
      borderRadius={4}
      boxShadow="0 0 0 1px hsl(0deg 0% 0% / 10%), 0 4px 11px hsl(0deg 0% 0% / 10%)"
      background="blue.200"
      as="ul"
      listStyleType="none"
      zIndex="2"
      overflow="auto"
    >
      {options.map(option => (
        <Box
          cursor="pointer"
          _hover={{
            background: 'red.200',
          }}
          px="10px"
          py="5px"
          as="li"
          key={option.value}
          onClick={() => onPickOption(option)}
        >
          {option.label}
        </Box>
      ))}
    </Box>
  );
});

Menu.propTypes = {
  options: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  onPickOption: PropTypes.func.isRequired,
};

export default Menu;
