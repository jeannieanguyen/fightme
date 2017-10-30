import { PropTypes } from 'prop-types';

const location = PropTypes.shape({
  query: PropTypes.shape({
    email: PropTypes.string,
    code: PropTypes.string,
  }),
});

export default {
  location,
};
