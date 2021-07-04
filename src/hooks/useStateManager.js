import { useState, useCallback } from 'react';

const useStateManager = ({
  defaultInputValue = '',
  defaultMenuIsOpen = false,
  defaultValue = null,
  inputValue: propsInputValue,
  menuIsOpen: propsMenuIsOpen,
  onChange: propsOnChange,
  onInputChange: propsOnInputChange,
  onMenuClose: propsOnMenuClose,
  onMenuOpen: propsOnMenuOpen,
  value: propsValue,
}) => {
  const [stateInputValue, setStateInputValue] = useState(
    propsInputValue !== undefined ? propsInputValue : defaultInputValue,
  );
  const [stateMenuIsOpen, setStateMenuIsOpen] = useState(
    propsMenuIsOpen !== undefined ? propsMenuIsOpen : defaultMenuIsOpen,
  );
  const [stateValue, setStateValue] = useState(
    propsValue !== undefined ? propsValue : defaultValue,
  );

  const onChange = useCallback(
    (option, actionMeta) => {
      if (typeof propsOnChange === 'function') {
        propsOnChange(option.value, actionMeta);
      }

      setStateInputValue(option.label);
      setStateValue(option.value);
    },
    [propsOnChange],
  );

  const onInputChange = useCallback(
    (value, actionMeta) => {
      let newValue;
      if (typeof propsOnInputChange === 'function') {
        newValue = propsOnInputChange(value, actionMeta);
      }
      setStateInputValue(newValue !== undefined ? newValue : value);
    },
    [propsOnInputChange],
  );

  const onClear = useCallback(() => {
    if (typeof propsOnChange === 'function') {
      propsOnChange(null, 'clear-value');
    }

    setStateInputValue('');
    setStateValue(null);
  }, [propsOnChange]);

  const onMenuOpen = useCallback(() => {
    if (typeof propsOnMenuOpen === 'function') {
      propsOnMenuOpen();
    }
    setStateMenuIsOpen(true);
  }, [propsOnMenuOpen]);

  const onMenuClose = useCallback(() => {
    if (typeof propsOnMenuClose === 'function') {
      propsOnMenuClose();
    }
    setStateMenuIsOpen(false);
  }, [propsOnMenuClose]);

  const inputValue =
    propsInputValue !== undefined ? propsInputValue : stateInputValue;

  const menuIsOpen =
    propsMenuIsOpen !== undefined ? propsMenuIsOpen : stateMenuIsOpen;

  const value = propsValue !== undefined ? propsValue : stateValue;

  return {
    inputValue,
    menuIsOpen,
    onChange,
    onClear,
    onInputChange,
    onMenuClose,
    onMenuOpen,
    value,
  };
};

useStateManager.propTypes = {};

export default useStateManager;
