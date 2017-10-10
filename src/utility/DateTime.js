import React, { Component } from 'react';
import Moment from 'moment';

class DateTime extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  render() {
    const { date, format } = this.props;
    Moment.locale(window.navigator.userLanguage || window.navigator.language);
    const formattedDateTime = Moment(date).format(format);
    return (<span> {formattedDateTime} </span>);
  }
}

export default DateTime;
