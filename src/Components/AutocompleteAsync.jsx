import PropTypes from 'prop-types';
import BaseAutocomplete from './Autocomplete';

import { useAsync } from '../hooks';

const AsyncAutocomplete = ({ service, triggerService, ...rest }) => {
  const asyncState = useAsync({ service, triggerService });

  return <BaseAutocomplete {...rest} />;
};

AsyncAutocomplete.defaultProps = {
  triggerService: 1,
};

AsyncAutocomplete.propTypes = {
  service: PropTypes.func.isRequired,
  triggerService: PropTypes.number,
};

export default AsyncAutocomplete;
