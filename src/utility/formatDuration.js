import Moment from 'moment';
import React from 'react';


const FORMAT_TYPE_HMS = 'hh:mm:ss';

export function formatDuration(totalSec, format) {
  const duration = Moment.duration(totalSec * 1000);
  const hasHour = Math.floor(duration.asHours()) > 0;
  const hasMinute = duration.minutes() > 0;

  if (!format) {
    const results = [];
    if (hasHour) {
      results.push(`${Math.floor(duration.asHours())} hours`);
    }
    if (hasMinute) {
      results.push(`${duration.minutes()} minutes`);
    } else if (!hasHour) {
      // Only show seconds if show is less than a minute
      return <p className="duration">{`${duration.seconds()} seconds`}</p>;
    }
    return <p className="duration">{results.join(' ')}</p>;
  } else if (format === FORMAT_TYPE_HMS) {
    const roundedHours = Math.floor(duration.asHours());

    const hours = (roundedHours < 10) ? `0${roundedHours}` : roundedHours;
    const minutes = (duration.minutes() < 10) ? `0${duration.minutes()}` : duration.minutes();
    const seconds = (duration.seconds() < 10) ? `0${duration.seconds()}` : duration.seconds();
    return <span className="duration">{`${hours}:${minutes}:${seconds}`}</span>;
  }
}
