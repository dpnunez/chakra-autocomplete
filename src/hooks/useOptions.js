const useOptions = (options = [], getLabel, getValue) =>
  options.map(op => ({ value: getValue(op), label: getLabel(op) }));

export default useOptions;
