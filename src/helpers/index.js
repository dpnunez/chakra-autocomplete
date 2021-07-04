export const getOptionByValue = (options, value) =>
  options.find(option => option.value === value);

export const clearAccent = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
