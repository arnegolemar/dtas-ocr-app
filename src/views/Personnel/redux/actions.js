import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SaveFile,
} from 'store/actions/helpers/displayAction';

import {
    SET_PERSONNELS,
    SET_PERSONNEL_DETAIL,
    SET_PERSONNEL_DEFAULT,
    SET_NEW_PERSONNEL_AVATAR,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import { SERVER_URI, SERVER_API, JWT, PRE } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SetPersonneDefault = () => (dispatch) => {
    dispatch({
        type: SET_PERSONNEL_DEFAULT,
    })
}

export const SetPersonnelDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().Personnel;
    const personnel = toDisplay.filter((per) => per._id == id);

    dispatch({
        type: SET_PERSONNEL_DETAIL,
        detail: {
            personnel: [...personnel]
        }
    })
}

export const AddPersonnel = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Adding New Personnel"
    })
    const { values, count, toDisplay, tempAvatar } = getState().Personnel;



    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/user/new`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                ...values
            }
        })
            .then((res) => {
                if (res.data.success) {

                    var spl = (tempAvatar.file) ? tempAvatar.file.name.split(".") : "";
                    var fileName = (values.name.last.toLowerCase().split(" ").join("-")) + "-" + (values.name.first.toLowerCase().split(" ").join("-")) + "-" + "avatar" + "-" + new Date().valueOf() + '.' + spl[spl.length - 1];

                    SaveFile('user/upload-file', fileName, fileName, "avatar", tempAvatar.file, [{ name: "userId", value: res.data.user._id }])
                        .then((res2) => {

                            var newList = [...toDisplay];
                            var newUser = {
                                ...res.data.user,
                                files: res2.files
                            };

                            if (newList.length > 10) {
                                newList.pop();
                            }

                            dispatch({
                                type: CHANGE_ALERT,
                                resType: "success",
                                msg: "Personnel Successfully Added"
                            });
                            dispatch({
                                type: SET_PERSONNELS,
                                data: {
                                    users: (toDisplay.length <= 10) ? [newUser, ...toDisplay] : [newUser, ...newList],
                                    count: count + 1
                                }
                            });
                            dispatch({
                                type: SET_PERSONNEL_DETAIL,
                                detail: {
                                    personnel: [...newUser]
                                }
                            })

                            Delay(() => {
                                dispatch({
                                    type: SET_NEW_PERSONNEL_AVATAR,
                                    file: null,
                                    base64: "",
                                });
                                cb();
                            }, 1000);
                        })
                        .catch(err => {
                        })
                } else {
                    dispatch({
                        type: CHANGE_ALERT,
                        resType: "failed",
                        msg: "Error: " + res.data.error._message
                    });
                }



            })
            .catch(err => {
            })
    });
}

export const UpdatePersonnel = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Updating Personnel Data"
    })
    const { values, count, toDisplay, tempAvatar } = getState().Personnel;


    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/user/update`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                ...values,
                office: (typeof values.office == "object") ? values.office._id : values.office,
                role: (typeof values.role == "object") ? values.role._id : values.role,
            }
        })
            .then((res) => {
                if (res.data.success) {
                    if (tempAvatar.file) {
                        var spl = (tempAvatar.file) ? tempAvatar.file.name.split(".") : "";
                        var fileName = (values.name.last.toLowerCase().split(" ").join("-")) + "-" + (values.name.first.toLowerCase().split(" ").join("-")) + "-" + "avatar" + "-" + new Date().valueOf() + '.' + spl[spl.length - 1];

                        SaveFile('user/upload-file', fileName, fileName, "avatar", tempAvatar.file, [{ name: "userId", value: values._id }])
                            .then((res2) => {
                                dispatch({
                                    type: CHANGE_ALERT,
                                    resType: "success",
                                    msg: "Personnel Data Successfully Updated"
                                });

                                var newValues = {...values, files: res2.files};

                                var newList = toDisplay.map((list) => {
                                    return (list._id == values._id) ? newValues : list;
                                });

                                dispatch({
                                    type: SET_PERSONNEL_DETAIL,
                                    detail: {
                                        personnel: [newValues]
                                    }
                                })

                                dispatch({
                                    type: SET_PERSONNELS,
                                    data: {
                                        users: newList,
                                        count: count
                                    }
                                });

                                Delay(() => {
                                    dispatch({
                                        type: SET_NEW_PERSONNEL_AVATAR,
                                        file: null,
                                        base64: "",
                                    });
                                    cb();
                                }, 1000);
                            })
                            .catch(err => {
                            })
                    } else {
                        dispatch({
                            type: CHANGE_ALERT,
                            resType: "success",
                            msg: "Personnel Data Successfully Updated"
                        });

                        var newList = toDisplay.map((list) => {
                            return (list._id == values._id) ? values : list;
                        });

                        dispatch({
                            type: SET_PERSONNELS,
                            data: {
                                users: newList,
                                count: count
                            }
                        });

                        Delay(() => {
                            cb();
                        }, 1000);
                    }
                } else {
                    dispatch({
                        type: CHANGE_ALERT,
                        resType: "failed",
                        msg: "Error: " + (res.data.error._message || "")
                    });
                }

            })
            .catch(err => {
            })
    });
}

export const SetPersonnelAvatar = (file, base64) => (dispatch, getState) => {
    dispatch({
        type: SET_NEW_PERSONNEL_AVATAR,
        file: file,
        base64: base64,
    });
}

