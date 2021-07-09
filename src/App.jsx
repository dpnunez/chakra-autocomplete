import { Box, Divider, Checkbox, Text } from '@chakra-ui/react';
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
  {
    label: 'Dólor',
    value: 3,
  },
  {
    label: 'sit',
    value: 4,
  },
  {
    label: 'amet',
    value: 5,
  },
  {
    label: 'Consectetur',
    value: 6,
  },
  {
    label: 'Adipiscing',
    value: 7,
  },
  {
    label: 'Elit',
    value: 8,
  },
];

// sit amet, consectetur adipiscing elit

const App = () => {
  const [controledValue, setControledValue] = useState(2);
  const [filterOption, setFilterOptions] = useState({
    caseSensitive: false,
    accentSensitive: false,
  });

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
        <Text>State: {controledValue}</Text>
        <Autocomplete
          // debugMode
          label="Controlado"
          onChange={setControledValue}
          value={controledValue}
          options={mockedOptions}
        />
        <Divider my="8" />
        <Autocomplete
          debugMode
          label="Filter option control"
          options={mockedOptions}
          filterOptions={filterOption}
        />
        <Checkbox
          isChecked={filterOption.caseSensitive}
          onChange={e =>
            setFilterOptions({
              ...filterOption,
              caseSensitive: e.target.checked,
            })
          }
        >
          Case sensitive
        </Checkbox>
        <Checkbox
          isChecked={filterOption.accentSensitive}
          onChange={e =>
            setFilterOptions({
              ...filterOption,
              accentSensitive: e.target.checked,
            })
          }
        >
          Accent sensitive
        </Checkbox>
        <Divider my="8" />
        <Autocomplete
          label="Custom empty"
          options={mockedOptions}
          emptyMessage="Nenhuma opção encontrada"
        />
        <Divider my="8" />
        <Autocomplete label="Menu size" options={mockedOptions} menuSize={8} />
      </Box>
    </Box>
  );
};

export default App;
