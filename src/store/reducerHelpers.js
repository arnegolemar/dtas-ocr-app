export const SpreadOps = (initialstate) => {
    var keys = Object.keys(initialstate);
    for (var x = 0, len = keys.length; x < len; x++) {
      if (typeof(initialstate[keys[x]]) == "object"){
        if (Array.isArray(initialstate[keys[x]])){
          initialstate[keys[x]] = SpreadOps([...initialstate[keys[x]]]);
        }else {
          initialstate[keys[x]] = SpreadOps({...initialstate[keys[x]]});
        }
      }
    }
    return initialstate;
  }
  
  export const SetRegValueHelper = (temp, value, props, len, ind) => {
  
    var index = props[ind];
    var type  = (!isNaN(index))?[]:{};
  
    if (ind < len){
      if ((ind+1) == len){
        if (Array.isArray(temp)) {
          temp[index] = value;
        }else {
          temp = {
            ...temp,
            [index]: value
          }
        }
        return temp;
      }else {
        if (Array.isArray(temp) || typeof(temp) == "object") {
          temp[index] = SetRegValueHelper(temp[index] || type, value, props, len, ind+1);
        }else {
          temp = {
            ...temp,
            [index]: SetRegValueHelper(temp[index] || type, value, props, len, ind+1)
          }
        }
  
        return temp;
      }
    }
  }
  