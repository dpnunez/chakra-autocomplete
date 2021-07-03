import PropTypes from 'prop-types';
import { Box, Input } from '@chakra-ui/react';
import { useClickOutside } from '@naveteam/prometheus';
import { useRef } from 'react';
import Menu from './Menu';

import { useOptions, useStateManager } from '../hooks';

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
  const state = useStateManager({ value: externalValue });
  const options = useOptions(propsOptions, getOptionLabel, getOptionValue);

  // ========================
  // References
  // ========================
  const containerRef = useRef();
  const menuRef = useRef();

  console.log('state');
  console.log(state);
  // ========================
  // Handlers
  // ========================
  const handleInputSearch = event => state.onInputChange(event.target.value);

  const onPickOption = option => {
    const optionLabel = option.label;
    const optionValue = option.value;

    state.onInputChange(optionLabel);
    state.onChange(optionValue);
    state.onMenuClose();
  };

  // ========================
  // Listners
  // ========================

  // Executado no clique fora das opcoes e do input (deve resetar para o valor atual)
  useClickOutside(() => {
    const currentOption = options.find(option => state.value === option.value);

    state.onInputChange(currentOption.label);
    state.onMenuClose();
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
