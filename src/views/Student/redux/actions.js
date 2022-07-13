import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SET_STUDENTS,
    SET_STUDENT_DETAIL,
    SET_STUDENT_DEFAULT,
    SET_STUDENT_AVATAR,
} from './types';
import {
    SaveFile,
} from 'store/actions/helpers/displayAction';
import {
    GetSemester,
    GetYear,
} from 'store/actions/helpers/dateAction';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import { SERVER_URI, SERVER_API, JWT } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SetStudentDefault = () => (dispatch) => {
    dispatch({
        type: SET_STUDENT_DEFAULT,
    })
}

export const AddStudent = (cb = () => { }) => (dispatch, getState) => {
    console.log("AA");
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Adding Student"
    })
    const { values, count, toDisplay, tempAvatar } = getState().Student;

    var batchID = ((GetYear()()*1) - 2000) + "" + (GetSemester()());

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/student/new`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                student: {
                    ...values
                },
                batchID: batchID,
            }
        })
            .then((res) => {
                console.log(res);
                if (res.data.success) {

                    var spl = (tempAvatar.file) ? tempAvatar.file.name.split(".") : "";
                    var fileName = (values.personalInfo.name.last.toLowerCase().split(" ").join("-")) + "-" + (values.personalInfo.name.first.toLowerCase().split(" ").join("-")) + "-" + "avatar" + "-" + new Date().valueOf() + '.' + spl[spl.length - 1];

                    SaveFile('user/upload-file', fileName, fileName, "students", tempAvatar.file, [{ name: "studentId", value: res.data.student._id }])
                        .then((res2) => {

                            var newList = [...toDisplay];
                            var newStudent = {
                                ...res.data.student,
                                files: (res2.files) ? res2.files : []
                            };

                            if (newList.length > 10) {
                                newList.pop();
                            }

                            dispatch({
                                type: CHANGE_ALERT,
                                resType: "success",
                                msg: "Student Successfully Added"
                            });
                            dispatch({
                                type: SET_STUDENTS,
                                data: {
                                    students: (toDisplay.length <= 10) ? [newStudent, ...toDisplay] : [newStudent, ...newList],
                                    count: count + 1
                                }
                            });

                            Delay(() => {
                                dispatch({
                                    type: SET_STUDENT_AVATAR,
                                    file: null,
                                    base64: "",
                                });
                                dispatch({
                                    type: SET_STUDENT_DETAIL,
                                    detail: {
                                        student: [{ ...newStudent }]
                                    }
                                })
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


                // var newList = [...toDisplay];

                // if (newList.length > 10) {
                //     newList.pop();
                // }

                // dispatch({
                //     type: CHANGE_ALERT,
                //     resType: "success",
                //     msg: "Student Successfully Added"
                // });
                // dispatch({
                //     type: SET_STUDENTS,
                //     data: {
                //         students: (toDisplay.length <= 10) ? [{ ...res.data.student }, ...toDisplay] : [{ ...res.data.student }, ...newList],
                //         count: count + 1
                //     }
                // });

                // Delay(() => {
                //     cb();
                // }, 1000);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
    })
}

export const SetStudentDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().Student;
    const students = toDisplay.filter((per) => per._id == id);
    dispatch({
        type: SET_STUDENT_DETAIL,
        detail: {
            student: [...students]
        }
    })
}

export const UpdateStudent = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Updating Student"
    })

    const { values, gCount, toDisplay, tempAvatar } = getState().Student;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/student/update`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                student: {
                    ...values
                }
            }
        })
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    console.log(tempAvatar);
                    if (tempAvatar.file) {
                        var spl = (tempAvatar.file) ? tempAvatar.file.name.split(".") : "";
                        var fileName = (values.personalInfo.name.last.toLowerCase().split(" ").join("-")) + "-" + (values.personalInfo.name.first.toLowerCase().split(" ").join("-")) + "-" + "avatar" + "-" + new Date().valueOf() + '.' + spl[spl.length - 1];

                        SaveFile('user/upload-file', fileName, fileName, "students", tempAvatar.file, [{ name: "studentId", value: values._id }])
                            .then((res2) => {
                                dispatch({
                                    type: CHANGE_ALERT,
                                    resType: "success",
                                    msg: "Student Data Successfully Updated"
                                });

                                var newValues = { ...values, files: res2.files };

                                var newList = toDisplay.map((list) => {
                                    return (list._id == values._id) ? newValues : list;
                                });

                                dispatch({
                                    type: SET_STUDENT_DETAIL,
                                    detail: {
                                        student: [newValues]
                                    }
                                })

                                dispatch({
                                    type: SET_STUDENTS,
                                    data: {
                                        students: newList,
                                        count: gCount
                                    }
                                });

                                Delay(() => {
                                    dispatch({
                                        type: SET_STUDENT_AVATAR,
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
                            msg: "Student Data Successfully Updated"
                        });

                        var newList = toDisplay.map((list) => {
                            return (list._id == values._id) ? values : list;
                        });

                        dispatch({
                            type: SET_STUDENTS,
                            data: {
                                students: newList,
                                count: gCount
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

                // dispatch({
                //     type: CHANGE_ALERT,
                //     resType: "success",
                //     msg: "Student Successfully Added"
                // });

                // var newList = toDisplay.map((list) => {
                //     return (list._id == values._id) ? values : list;
                // });
                // dispatch({
                //     type: SET_STUDENTS,
                //     data: {
                //         students: newList,
                //         count: count
                //     }
                // });

                // Delay(() => {
                //     cb();
                // }, 1000);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const SetStudentAvatar = (file, base64) => (dispatch, getState) => {
    dispatch({
        type: SET_STUDENT_AVATAR,
        file: file,
        base64: base64,
    });
}

export const UploadStudentDocument = (file, type, cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Uploading Document"
    });

    const { values, toDisplay, gCount } = getState().Student;

    var spl = (file) ? file.name.split(".") : "";
    var fileName = (values.personalInfo.name.last.toLowerCase().split(" ").join("-")) + "-" + (values.personalInfo.name.first.toLowerCase().split(" ").join("-")) + "-~" + type + "~-" + new Date().valueOf() + '.' + spl[spl.length - 1];
    return new Promise((resolve, reject) => {
        SaveFile('user/upload-file', fileName, fileName, "student-files", file, [{ name: "studentId", value: values._id }])
            .then((res2) => {
                console.log(res2);
                if (res2.status) {
                    var newValues = {
                        ...values,
                        documents: [...values.documents, res2.files]
                    };

                    console.log(newValues);


                    var newList = toDisplay.map((list) => {
                        return (list._id == values._id) ? newValues : list;
                    });
                    console.log(newList);


                    dispatch({
                        type: CHANGE_ALERT,
                        resType: "success",
                        msg: "Document Successfully Added"
                    });

                    dispatch({
                        type: SET_STUDENTS,
                        data: {
                            students: newList,
                            count: gCount
                        }
                    });

                    dispatch({
                        type: SET_STUDENT_DETAIL,
                        detail: {
                            student: [{ ...newValues }]
                        }
                    })

                    Delay(() => {
                        cb();
                    }, 1000);
                }



            })
            .catch(err => {
            })
    })
}
