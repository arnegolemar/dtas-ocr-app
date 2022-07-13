export const CheckFields = (data, excemptions = []) => (dispatch) => {
    if (typeof (data) != "object") {
        return (data === "") ? false : true;
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