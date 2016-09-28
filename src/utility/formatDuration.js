import Moment from 'moment';
import React from 'react';


const FORMAT_TYPE_HMS = 'hh:mm:ss';

export function formatDuration(totalSec, format){
    var duration = Moment.duration(totalSec * 1000); 
    var hasHour = Math.floor(duration.asHours()) > 0; 
    var hasMinute = duration.minutes() > 0; 

    if (!format) {
        let results = []; 
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
        
        let roundedHours = Math.floor(duration.asHours());

        let hours = (roundedHours < 10) ? `0${roundedHours}` : roundedHours; 
        let minutes = (duration.minutes() < 10) ? `0${duration.minutes()}` : duration.minutes();
        let seconds = (duration.seconds() < 10) ? `0${duration.seconds()}` : duration.seconds();  
        return <span className="duration">{`${hours}:${minutes}:${seconds}`}</span>; 
    }
    
} 
