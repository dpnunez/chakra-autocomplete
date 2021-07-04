import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@chakra-ui/react';
import MenuOption from './MenuOption';
import MenuEmpty from './MenuEmpty';

const Menu = forwardRef(
  ({ options, open, onPickOption, emptyMessage }, ref) => {
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
        zIndex="3"
        overflow="auto"
      >
        {!options.length ? (
          <MenuEmpty message={emptyMessage} />
        ) : (
          options.map(option => (
            <MenuOption
              key={option.value}
              onPick={() => onPickOption(option)}
              label={option.label}
            />
          ))
        )}
      </Box>
    );
  },
);

Menu.propTypes = {
  options: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  onPickOption: PropTypes.func.isRequired,
  emptyMessage: PropTypes.emptyMessage,
};

export default Menu;
