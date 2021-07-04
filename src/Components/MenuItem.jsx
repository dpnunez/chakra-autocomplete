import { Box } from '@chakra-ui/react';
import { DEFAULT_MENU_ITEM_HEIGHT } from '../constants';

const MenuItem = props => (
  <Box
    minHeight={`${DEFAULT_MENU_ITEM_HEIGHT}px`}
    display="flex"
    alignItems="center"
    px="10px"
    py="5px"
    as="li"
    {...props}
  />
);

export default MenuItem;
