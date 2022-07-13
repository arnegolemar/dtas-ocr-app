import { SERVER_API, SERVER_URI, JWT } from 'config';
import axios from 'axios';
import {
  GetDate,
  GetMonths,
  GetMonth
} from './dateAction';
import {
  GetTime
} from './timeAction';
import {
  TOGGLE_ALERT,
  CHANGE_ALERT,
} from '../../types';

export const ConvertHours = (time) => () => {
  if (!time) return "";
  time = (time + "").split(".");
  var h = time[0],
    m = "0." + time[1];
  return h + "h " + Math.floor((m * 1) * 60) + "m";
}

export const ArrangeDate = (date, withTime = true) => () => {
  if (withTime) {
    return (date) ? GetDate(new Date(date), 1, "y-m-d", "-")() + " - " + GetTime(new Date(date))() : "";
  } else {
    return (date) ? GetDate(new Date(date), 1, "y-m-d", "-")() : "";
  }
}

export const GetAge = (date) => () => {
  // if (!date){
  //   return "";
  // }
  // date = date.split("T");

  // var ageDifMs = Date.now() - (new Date(date[0])).getTime();
  // var ageDate = new Date(ageDifMs); // miliseconds from epoch
  // return Math.abs(ageDate.getUTCFullYear() - 1970);

  if (date != "" && date != null) {

    var ageDifMs = Date.now() - (new Date(date)).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);

  }
  return "";

}

export const ArrangeName = (name, type = 0) => () => {
  if (name) {
    if (typeof (name) == "string") {
      return name.toUpperCase();
    }

    var first = name.first;
    var last = name.last;
    name = [
      last.toUpperCase() + ", " + first.toUpperCase() + " " + ((name.mid == "N/A" || !name.mid) ? "" : name.mid.toUpperCase()),
      first.toUpperCase() + " " + ((name.mid == "N/A" || !name.mid) ? "" : name.mid.toUpperCase()) + " " + last.toUpperCase(),
      first.toUpperCase() + "-" + ((name.mid == "N/A" || !name.mid) ? "NA" : name.mid.toUpperCase()) + "-" + last.toUpperCase(),
      (first.charAt(0).toUpperCase() + first.slice(1)) + " " + (last.charAt(0).toUpperCase() + last.slice(1))
    ];

    return name[type];
  } else {
    return "";
  }
}

export const ArrangeAmount = (amount, type = "₱") => () => {
  if (!amount) {
    return 0;
  }
  return type + " " + (Math.ceil(amount)).toLocaleString();
}

export const GetData = (obj, props) => () => {
  props = props.split(".");
  try {
    for (var x = 0; x < props.length; x++) {
      obj = obj[props[x]];
      if (x + 1 == props.length) {
        return obj;
      }
    }
  } catch (err) {
    return "";
  }
}

export const GetObjectPropValue = (data, name, type = "", level = "", currentLevel = 1) => () => {
  const keys = Object.keys(data);
  if (type === "") {
    if (name === "" && type === "")
      return data;

    name = name.split(".");
    if (keys.includes(name[0])) {
      return GetObjectPropValue(data[name.shift()], name.join("."))();
    } else {
      return false;
    }
  } else {
    for (var x = 0, len = keys.length; x < len; x++) {
      if (TypeOf(data[keys[x]])() === type) {
        return data[keys[x]];
      }
    }
    return type.toUpperCase() + " Property not found";
  }
};



export const TypeOf = (val) => () => {
  var type = typeof (val);
  if (type == "object") {
    type = (Array.isArray(val)) ? "array" : "object"
  }
  return type;
}

export const TraceNode = (target, nodeName) => () => {
  if (target.nodeName == nodeName) {
    return target;
  } else {
    return TraceNode(target.parentNode, nodeName)();
  }
}

export const SetValue = (e, reducer) => (dispatch) => {
  var tar = e.target, isAlp, isNum, ch;
  var props = tar.getAttribute("data-prop"),
    type = tar.getAttribute("data-type") * 1,
    dcase = tar.getAttribute("data-case");
  ch = e.nativeEvent.data;
  isAlp = IsAlpha(ch)();
  isNum = IsNumeric(ch)();
  if (
    (type == 1 && isAlp) || (type == 2 && isNum) || (type == 3 && (isNum || isAlp)) ||
    (type == 4 && !isAlp) || (type == 5 && !isNum) || (!type) || (e.nativeEvent.inputType == "deleteContentBackward")
  ) {
    tar.value = (dcase) ? tar.value.toUpperCase() : tar.value;
    props = props.split(".");
    dispatch({
      type: reducer,
      props: props,
      value: tar.value
    })
  }
}

export const SetValue2 = (prop, value, type) => (dispatch) => {
  prop = prop.split(".");
  dispatch({
    type: type,
    props: prop,
    value: value
  })
}

export const CheckFields = (data, excemptions = []) => (dispatch) => {
  if (typeof (data) != "object") {
    return (data === "") ? false : true;
  } else if (data === null || data === undefined) {
    return false;
  } else {
    var keys = Object.keys(data);
    for (var x = 0; x < keys.length; x++) {
      if ((!CheckFields(data[keys[x]], excemptions)()) && (excemptions.indexOf(keys[x]) == -1)) {
        return false;
      }
    }
    return true;
  }
}

export const IsAlpha = (ch) => () => {
  return (ch) ? ch.toLowerCase() != ch.toUpperCase() : false;
}

export const IsNumeric = (ch) => () => {
  return (ch) ? ("1234567890".indexOf(ch) >= 0) ? true : false : false;
}

export const ArrangeNumber = (value, places) => {
  var valLen = (value + "").length;
  if (valLen >= places)
    return value

  var zeros = "";

  while (valLen++ < places)
    zeros = zeros + "0";
  return zeros + (value + "");
}

export const ValidateInput = (keyword, type) => () => {
  var regexs = {
    'email': /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'cellphone number': /^(09|\+639)\d{9}$/g
  };
  return regexs[type].test(String(keyword).toLowerCase());
}

export const AmountInText = (amount) => () => {
  return "Eighteen Thousand Pesos Only";
}

export const ArrangeMobileNumber = (number) => () => {
  return (typeof (number) == "object")
    ? ((number.hasOwnProperty("prefix")) ? number.prefix : "+") + ((number.hasOwnProperty("number")) ? number.number : 0)
    : "";
}

export const ArrangeAddress = (address) => () => {
  return (typeof (address) == "object")
    ? (((address.block) ? address.block : "") + " " + ((address.street) ? address.street : "") + " " + ((address.village) ? address.village : "") + ", " + ((address.brgy) ? address.brgy : "") + ", " + ((address.cm) ? address.cm : "") + ", " + ((address.province) ? address.province : "") + ", " + ((address.zipcode) ? address.zipcode : ""))
    : "";
}

export const GetList = (api, reducer, page = 1, count = 10, find, sort, select, cb = () => {}) => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "loading",
    msg: ""
  })

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/${api}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      params: {
        filters: {
          page: page,
          count: count,
          find: find,
          sort: sort,
          select: select
        }
      }
    })
      .then((res) => {
        if (res.data.status) {
          cb(res.data);

          if (reducer) {
            dispatch({
              type: reducer,
              data: { ...res.data.data },
              page: page
            });
          }

          dispatch({
            type: TOGGLE_ALERT,
            value: false,
          })
        } else {
          dispatch({
            type: CHANGE_ALERT,
            resType: "failed",
            msg: "Server Error"
          })
        }
      });
  })
}

export const GetDetail = (api, reducer, value, prop = '_id', extra = {}, select) => (dispatch) => {

  return new Promise((resolve, reject) => {
    axios({
      url: `${SERVER_API}/${api}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      params: {
        value: value,
        prop: prop,
        extra: extra,
        select: select,
      }
    })
      .then((res) => {
        if (res.data.status) {
          dispatch({
            type: reducer,
            detail: res.data,
          });
          resolve();
        }
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const SavePicture2 = (api, name, file) => {
  if (!file) {
    return "";
  } else {
    const fd = new FormData();
    fd.append(name, file);
    axios
      .post(`${SERVER_API}/${api}`, fd, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(JWT)}`
        }
      })
      .then(res => {
        if (res.data.success) {
          return res.data.filename;
        } else {
          return "";
        }
      })
      .catch(err => {
        return "";
      });
  }
}

export const SavePicture = (api, name, file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
    } else {
      const fd = new FormData();
      fd.append(name, file);
      axios
        .post(`${SERVER_API}/${api}`, fd, {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(JWT)}`
          }
        })
        .then(res => {
          if (res.data.success) {
            resolve(res.data.filename);
          }
        })
        .catch(err => reject(err));
    }
  })
}

export const SaveFile = (api, name, path, type, file, otherData = null) => {

  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
    } else {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("type", type);
      fd.append("name", name);
      fd.append("path", path);
      if (otherData) {
        for (let x = 0; x < otherData.length; x++) {
          fd.append(otherData[x].name, otherData[x].value);
        }
      }
      axios
        .post(`${SERVER_API}/${api}`, fd, {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(JWT)}`
          }
        })
        .then(res => {
          if (res.data.success || res.data.status) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    }
  })
}

export const SavePictures = (api, name, files) => {
  return new Promise(async (resolve, reject) => {
    if (files.length == 0)
      resolve([]);
    var filenames = [], fileType;
    await files.map(async (file, i) => {
      fileType = TypeOf(file)();
      if (fileType == "object") {
        await SavePicture(api, name, file.file).then((fileName) => {
          filenames.push(fileName);
          return;
        });
      } else if (fileType == "string") {
        filenames.push(file);
      }
      if (i + 1 == files.length) {
        resolve(filenames);
      }
    })
  })
}

export const SendToReducer = (reducer, data) => (dispatch) => {
  dispatch({
    type: reducer,
    data: data,
  });
}

export const GetSafe = (fn, defaultVal) => (dispatch) => {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

export const UpperCaseFirstChar = (str) => (dispatch) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const CheckPassword = (password) => (dispatch) => {

  return new Promise((resolve, reject) => {

    axios({
      url: `${SERVER_API}/user/checkpassword`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(JWT)}`
      },
      params: {
        password: password
      }


    })
      .then(res => {
      })
      .catch(err => {
        return false;
      });

  })

}

export const InputDate = (date) => () => {
  if (date != null) {
    if (date.split("T").length == 2) {
      return GetDate(new Date(date))();
    } else {
      return date;
    }

  }

  return "";
}