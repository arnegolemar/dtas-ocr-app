import {
  ArrangeNumber
} from './displayAction';

const D = {
  now: new Date(),
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  days: ['Sunday','Monday','Tuesday','Wednesday',
              'Thursday','Friday','Saturday'],
  prefixes: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
};

export const GetSemester = (date = null)  => () => {
  var month = ((date)?(new Date(date)):new Date()).getMonth();
  
  return (month < 6)?1:2;
}

export const GetNowAndPrevious = (date) => {
  date.l = GetLastDay(new Date(date.y + "-" + date.m * 1 + "-" + "01"))();
  var lastDay        = GetLastDay(new Date(year + "-" + date.m * 1 + "-" + "01"))()
  var prevMonth      = (date.m+0)-1;
  var prevMonLastDay = 0;
  var year           = date.y;

  if (prevMonth == 0){
    prevMonth      = 12;
    year--;
    prevMonLastDay = GetLastDay(new Date(year + "-" + prevMonth * 1 + "-" + "01"))();
  } else {
    prevMonLastDay = GetLastDay(new Date(date.y + "-" + prevMonth * 1 + "-" + "01"))();
  }

  var prev = {
    d: 1, m: prevMonth, y: year, l: prevMonLastDay
  };

  return {
    now: date,
    prev: prev,
    lastDay: lastDay
  }
}

export const GetMonths = () => () => {
  return D.months;
}

export const GetDate = (date = D.now, type = 0, format = "y-m-d", separator = '-') => () => {
  // 0 Numbers, 1 Text, 2 Object Number, 3 Object Letter
  var now = {
    'y': date.getFullYear(),
    'm': date.getMonth() + 1,
    'd': date.getDate()
  };
  format = format.split(separator);

  const d = [
    ArrangeNumber(now[format[0]], 2) + separator + ArrangeNumber(now[format[1]], 2) + separator + ArrangeNumber(now[format[2]], 2), /// 0
    D.months[now.m - 1] + " " + now.d + " " + now.y, /// 1
    now, /// 2
    {
      'y': now.y,
      'd': (now.d < 10)?"0"+(now.d+""):now.d,
      'm': (D.months[now.m - 1] < 10)?"0"+(D.months[now.m - 1]+""):D.months[now.m - 1]
    } /// 3
  ];

  return d[type];
}

export const GetWeek = (type = 0, date = D.now) => () => {
  //type == 0 Number, type == 1 Word
  var week = Math.floor(date.getDate() / 7);
  return (type == 1) ? D.prefixes[week] : week;
}

export const GetDayOfTheWeek = (type = 0, date = D.now) => () => {
  return (type == 1) ? D.days[date.getDay()] : date.getDay();
}

export const GetDayOfTheMonth = () => () => {
  return D.now.getDate();
}

export const GetLastDay = (date = D.now) => () => { // get the last day of the specified date(month)
	return (new Date(date.getFullYear(),date.getMonth()+1,1,-1).getDate());
}


// export const GetLastDay = (month = D.now.getMonth()+1 , year = D.now.getFullYear()) => () => { // get the last day of the specified date(month)
// 	return (new Date(year,month,1,-1).getDate());
// }

export const GetYear = () => () => {
  return D.now.getFullYear();
}

export const GetMonth = (type = 0) => () =>{ // get the current month, 0 = Month number, 1 = Month name
  var monthNum = D.now.getMonth();
  return (type == 0) ? (monthNum + 1):(D.months[monthNum]);
}

export const IsWeekend = (day = D.getDate(), month = D.getMonth(0), year = D.getYear(0)) => () => { // identify if the specified date is a weekend or not
	var weekEnds = ['sun','sat'],
		date = new Date(year,D.getMonthNum(month) - 1,day),
		wk = ((date + '').slice(0,3)).toLowerCase();
	return (wk == 'sat' || wk == 'sun') ? true:false;
}

export const MonthToggle = (month) => () => { // reverse the value of the specified month
  if (isNaN(month)){
    month = month.toLowerCase();
    var first = month[0].toUpperCase();
    month = month.slice(1, month.length);
    month = first + month;

    return (D.months.indexOf(month) + 1);
  } else {
    return D.months[month-1];
  }
}
