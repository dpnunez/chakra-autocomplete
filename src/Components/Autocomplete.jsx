import PropTypes from 'prop-types';
import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useClickOutside } from '@naveteam/prometheus';
import { useRef } from 'react';
import Menu from './Menu';

import { useOptions, useStateManager, useFilter } from '../hooks';
import { getOptionByValue } from '../helpers';

const Autocomplete = ({
  /* Label do input */
  label,

  /* Funcao que, recebendo uma opcao por parametro, retornará a sua label */
  getOptionLabel,

  /* Funcao que, recebendo uma opcao por parametro, retornará a sua value */
  getOptionValue,

  /* Opcoes do input em qualquer padrao (as props getOptionLabel e getOptionValue poderao ser usadas para parsear essas opcoes) */
  options: propsOptions,

  /* Valor externo, usado em componentes controlados */
  value: externalValue,

  /* Funcao chamada quando alguma opcao for selecionada (ou clear) */
  onChange,

  /* controlado a forma com que o filtro ocorrerá */
  filterOptions,

  emptyMessage,

  /* Quantidade de itens renderizados "sem scroll" */
  menuSize,

  debugMode,

  ...rest
}) => {
  const allOptions = useOptions(propsOptions, getOptionLabel, getOptionValue);

  const state = useStateManager({
    onChange,
    value: externalValue,
    defaultInputValue: externalValue
      ? getOptionByValue(allOptions, externalValue).label
      : undefined,
  });

  const options = useFilter(allOptions, state.inputValue, filterOptions);

  // ========================
  // References
  // ========================
  const containerRef = useRef();
  const menuRef = useRef();

  // ========================
  // Handlers
  // ========================
  const handleInputSearch = event => state.onInputChange(event.target.value);

  const onPickOption = option => {
    state.onChange(option);
    state.onMenuClose();
    return option;
  };

  // ========================
  // Listners
  // ========================

  // Executado no clique fora das opcoes e do input (deve resetar para o valor atual)
  useClickOutside(() => {
    // ToDo: Verificar se essa lógica do onClose deve ir para dentro do stateManager
    const currentOption = getOptionByValue(options, state.value);
    if (currentOption === undefined) {
      state.onInputChange('');
    } else {
      state.onInputChange(currentOption.label);
    }
    return state.onMenuClose();
  }, containerRef);

  if (debugMode) {
    console.log(
      `%cState do autocomplete (${label})`,
      'color: red; font-family:monospace; font-size: 20px',
    );
    console.group('state');
    console.log(filterOptions);
    console.log(state);
    console.log(options);
    console.group('state');
  }

  return (
    <Box ref={containerRef} position="relative" {...rest}>
      <InputGroup>
        <Input
          onChange={handleInputSearch}
          value={state.inputValue}
          flex={1}
          placeholder={label}
          onClick={state.onMenuOpen}
        />
        <InputRightElement>
          {state.value && (
            <CloseIcon
              onClick={state.onClear}
              cursor="pointer"
              w="10px"
              h="10px "
            />
          )}
          <ChevronDownIcon ml="10px" />
        </InputRightElement>
      </InputGroup>
      <Menu
        options={options}
        open={state.menuIsOpen}
        onPickOption={onPickOption}
        emptyMessage={emptyMessage}
        size={menuSize}
        ref={menuRef}
      />
    </Box>
  );
};

Autocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  value: PropTypes.any,
  onChange: PropTypes.func,
  filterOptions: PropTypes.shape({
    caseSensitive: PropTypes.bool,
    accentSensitive: PropTypes.bool,
  }),
  emptyMessage: PropTypes.string,
  menuSize: PropTypes.number,
  debugMode: PropTypes.bool,
};

Autocomplete.defaultProps = {
  getOptionLabel: option => option.label,
  getOptionValue: option => option.value,
  filterOptions: {
    caseSensitive: false,
    accentSensitive: false,
  },
  emptyMessage: 'No options',
  menuSize: 5,
};

export default Autocomplete;
