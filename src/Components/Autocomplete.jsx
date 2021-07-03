import PropTypes from 'prop-types';
import { Box, Input } from '@chakra-ui/react';
import { useClickOutside } from '@naveteam/prometheus';
import { useRef } from 'react';
import Menu from './Menu';

import { useOptions, useStateManager } from '../hooks';
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

  /* Propriedades aplicadas na box de fora */
  containerProps,
}) => {
  const options = useOptions(propsOptions, getOptionLabel, getOptionValue);
  const state = useStateManager({
    onChange,
    value: externalValue,
    defaultInputValue: externalValue
      ? getOptionByValue(options, externalValue).label
      : undefined,
  });

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
      return state.onInputChange('');
    }
    state.onInputChange(currentOption.label);
    return state.onMenuClose();
  }, containerRef);

  return (
    <Box ref={containerRef} position="relative" {...containerProps}>
      <Input
        onChange={handleInputSearch}
        value={state.inputValue}
        flex={1}
        placeholder={label}
        onClick={state.onMenuOpen}
      />
      <Menu
        options={options}
        open={state.menuIsOpen}
        onPickOption={onPickOption}
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
  containerProps: PropTypes.any,
};

Autocomplete.defaultProps = {
  getOptionLabel: option => option.label,
  getOptionValue: option => option.value,
};

export default Autocomplete;
