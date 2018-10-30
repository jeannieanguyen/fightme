import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Fighters from 'ducks/fighters';
import { isEmpty } from 'lodash';

const Card = fighter => (
  <div className="weight-card">
    <div
      className="image"
      style={{ backgroundImage: `url(${fighter.belt_thumbnail} )` }}
    />
    <span className="weight-class">
      {fighter.weight_class.replace('_', ' ')}
    </span>
  </div>
);

export class WeightClasses extends Component {
  getClassCards = () => this.props.champions.map(champion => Card(champion));
  render() {
    if (isEmpty(this.props.champions)) {
      return null;
    }
    return <div className="weight-classes">{this.getClassCards()}</div>;
  }
}

WeightClasses.propTypes = {
  champions: PropTypes.arrayOf(PropTypes.fighter),
};

WeightClasses.defaultProps = {
  champions: [],
};

function mapStateToProps(state) {
  return {
    champions: Fighters.selectors.getChampions(state),
  };
}
export default connect(
  mapStateToProps,
  {},
)(WeightClasses);
