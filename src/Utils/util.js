import {days} from "./enum";
var moment = require('moment');

export function getDateArray (date)  {
    let dt = new Date(date);

    // GET THE MONTH AND YEAR OF THE SELECTED DATE.
    let month = dt.getMonth(),
        year = dt.getFullYear();

    // GET THE FIRST AND LAST DATE OF THE MONTH.
    let FirstDay = new Date(year, month, 1);
    let LastDay = new Date(year, month + 1, 0);

    let arr = [];
    let dt1 = new Date(FirstDay);
    while (dt1 <= LastDay) {
        arr.push(new Date(dt1));
        dt1.setDate(dt1.getDate() + 1);
    }
    return arr;
};
export function getDayName(date) {
    var dayName = days[date.getDay()];
    return dayName;
}

export function compare_dates (dt1,dt2)  {
    let date1 = new Date(dt1.date);
    let date2 = new Date(dt2);
    if (date1.getMonth()===date2.getMonth() && date1.getFullYear()===date2.getFullYear() && date1.getDate()===date2.getDate()) {
        return true
    } else {
        return false
    }
};
export function displayTime (dt1)  {
    let date1 = new Date(dt1.date);
    return date1.getHours() + ':' + date1.getMinutes();

};

export function makeCsvDate (myEvents)  {
    let csv_data =[];
    myEvents.map(event => {
        csv_data.push({id:event.id, description: event.title, date: moment(event.date).format('YYYY-MM-DD HH:SS')})
        event.date = moment(event.date).format();
        return event;
    });
    return csv_data;
};

export function changeCalenderdateClick (date, nextMonth)  {
    let d1 = new Date(date);
    let month = (d1.getMonth()+1)+nextMonth;
    let year =  d1.getFullYear();
    if(month>12){
        year = year + 1;
        month = month = 1;
    }
    if(month === 0){
        year = year - 1;
        month = month = 12;
    }
    let newDate = year + '/' + month + '/' + d1.getDate();
    return newDate
};

export function getArrayElement (arr, start, end)  {
     return arr.filter((val,i)=> {
         return (i >= start && i <= end)
     }
    )
};

export function compareTime (date)  {
    var now = moment(new Date()); //todays date
    var end = moment(date); // another date
    return moment.duration(end.diff(now));

};

export function convertTimeToISOString (date)  {
    return moment(date).toISOString()

};

export function convertTimeToString (date)  {
    return moment(date).format();

};

