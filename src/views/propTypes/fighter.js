import { PropTypes } from 'prop-types';

const fighter = PropTypes.shape({
  belt_thumbnail: PropTypes.string,
  draws: PropTypes.number,
  fighter_status: PropTypes.string,
  first_name: PropTypes.string,
  id: PropTypes.number,
  last_name: PropTypes.string,
  left_full_body_image: PropTypes.string,
  link: PropTypes.string,
  losses: PropTypes.number,
  nickname: PropTypes.string,
  pound_for_pound_rank: PropTypes.string,
  profile_image: PropTypes.string,
  rank: PropTypes.string,
  right_full_body_image: PropTypes.string,
  statid: PropTypes.number,
  thumbnail: PropTypes.string,
  title_holder: PropTypes.bool,
  weight_class: PropTypes.string,
  wins: PropTypes.number,
});

export default {
  fighter,
};
