import { Box, Divider } from '@chakra-ui/react';
import { useState } from 'react';

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
  const [controledValue, setControledValue] = useState(2);

  return (
    <Box
      background="blackAlpha.500"
      display="flex"
      height="100vh"
      width="100vw"
    >
      <Box padding="4" borderRadius="2xl" background="white" margin="auto">
        <Autocomplete label="Uncontroled" options={mockedOptions} />
        <Divider my="8" />
        <Autocomplete
          label="Controlado"
          onChange={setControledValue}
          value={controledValue}
          options={mockedOptions}
        />
      </Box>
    </Box>
  );
};

export default App;
