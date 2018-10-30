import React, { Component } from 'react';
import { connect } from 'react-redux';
import WeightClasses from 'views/pages/match/weightClasses';
import * as Fighters from 'ducks/fighters';

const { getFighters } = Fighters.actions;

function mapStateToProps(state) {
  return {};
}

export class Match extends Component {
  componentWillMount() {
    this.props.getFighters();
  }

  render() {
    return (
      <div id="match-page">
        <div className="background" />
        <div className="content">
          <h1>MMA MATCHMAKER</h1>
          <span className="instructions">Select a Weight Class</span>
          <WeightClasses />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getFighters },
)(Match);
