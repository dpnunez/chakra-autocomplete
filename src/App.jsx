import { Box } from '@chakra-ui/react';

import { Autocomplete } from './Components';

const mockedOptions = [
  {
    label: 'Lorem',
    value: 1,
  },
  {
    label: 'Ipsum',
    value: 2,
  },
];

const App = () => {
  return (
    <Box display="flex" height="100vh" width="100vw">
      <Box margin="auto">
        <Autocomplete value={2} label="Lorem ipsum" options={mockedOptions} />
      </Box>
    </Box>
  );
};

export default App;
