import {
  ArrangeNumber
} from './displayAction';

const T = {

};

export const GetTime = (date = new Date(), format="12") => () => {
  var hour = date.getHours(), type = " AM";

  if (format == "12"){
    if (hour > 11){
      hour = hour - 12;
      hour = (hour == 0)?1:hour;
      type = " PM"
    }
  }

  return ArrangeNumber(hour, 2) + ":" + ArrangeNumber(date.getMinutes(), 2) + ":" + ArrangeNumber(date.getSeconds(), 2) + type;
}

export const SetTime = (time, format="12") => () => { // identify if the specified date is a weekend or not
  time = time.split(":");
  var arrTime = (time[0]*1) + 0,
      period = "AM",
      sec = time[2].split(".");

  if (arrTime > 24){
    arrTime -= 24;
  } else if (arrTime > 12){
    arrTime -= 12;
    period = "PM";
  }

  if (format == "24"){
    arrTime += 12;
    period = "";
  }

  arrTime = ((arrTime < 0) ?arrTime*(-1):arrTime) + ":" + time[1];

  if ((sec[0]*1) != 0){
    arrTime += ":" + sec[0];
    if ((sec[1]*1) != 0){
      arrTime += ":" + sec[1];
    }
  }else{
    if ((sec[1]*1) != 0){
      arrTime += ":00:" + sec[0];
    }
  }


  return arrTime + ((format=="12")?(" " + period):"");
}
