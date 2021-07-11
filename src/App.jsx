import { Box, Divider, Checkbox, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { Autocomplete, AsyncAutocomplete } from './Components';

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

  const getOptions = async textFilter => {
    return fetch(`http://universities.hipolabs.com/search?${textFilter}`);
  };

  return (
    <Box
      flexDirection="column"
      display="flex"
      minHeight="100vh"
      width="100vw"
      background="white"
    >
      <Box
        display="flex"
        alignItems="center"
        height="300px"
        bgGradient="linear(to-r, teal.500,green.500)"
        width="100vw"
        marginBottom="16"
      >
        <Text ml="42px" fontWeight="black" fontSize="6xl" tex color="white">
          💡 Chakra autocomplete
        </Text>
      </Box>
      <Box
        width="50vw"
        margin="auto"
        padding="4"
        borderRadius="2xl"
        background="white"
      >
        <Text
          fontWeight="black"
          color="gray.600"
          marginBottom="4"
          fontSize="32px"
        >
          Basic
        </Text>
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

        <Divider my="24" />

        <Text
          fontWeight="black"
          color="gray.600"
          marginBottom="4"
          fontSize="32px"
        >
          Async
        </Text>

        <AsyncAutocomplete
          label="Async example"
          service={getOptions}
          triggerService={3}
        />
      </Box>
    </Box>
  );
};

export default App;
