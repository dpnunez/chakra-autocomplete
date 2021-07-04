import PropTypes from 'prop-types';
import { clearAccent } from '../helpers';

const useFilter = (options = [], filterText = '', filterOptions) => {
  let normalizedFilterText = filterText;

  if (!filterOptions.caseSensitive) {
    normalizedFilterText = filterText.toLowerCase();
  }

  if (!filterOptions.accentSensitive) {
    normalizedFilterText = clearAccent(normalizedFilterText);
  }

  return options.filter(option => {
    let normalizedLabel = option.label;

    if (!filterOptions.caseSensitive) {
      normalizedLabel = option.label.toLowerCase();
    }

    if (!filterOptions.accentSensitive) {
      normalizedLabel = clearAccent(normalizedLabel);
    }

    return normalizedLabel.includes(normalizedFilterText);
  });
};

useFilter.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string,
    }),
  ),
  filterText: PropTypes.string,
  filterOptions: PropTypes.shape({
    caseSensitive: PropTypes.bool,
    accentSensitive: PropTypes.bool,
  }),
};

export default useFilter;
