import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SET_DOCUMENTS,
    SET_DOCUMENT_DETAIL,
    SET_DOCUMENT_DEFAULT,
    SET_DOCUMENTS_INCOMING,
    SET_DOCUMENTS_RECEIVED,
    SET_DOCUMENTS_SEARCHED_STUD,
    SET_DOCUMENT_TEMP_STUDENT,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import {
    SaveFile,
} from 'store/actions/helpers/displayAction';

import { SERVER_URI, SERVER_API, JWT, PRE } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

export const SetDocumentDefault = () => (dispatch) => {
    dispatch({
        type: SET_DOCUMENT_DEFAULT,
    })
}

export const SetDocumentOwner = (ownerID, owner) => (dispatch, getState) => {
    console.log(owner);
    const { values } = getState().Document;

    dispatch({
        type: SET_DOCUMENT_DETAIL,
        detail: {
            document: [{
                ...values,
                owner: ownerID
            }]
        }
    })

    if (ownerID != "") {
        dispatch({
            type: SET_DOCUMENT_TEMP_STUDENT,
            student: {
                ...owner
            }
        })
    }
}

export const SetStudents = (list) => (dispatch, getState) => {

    dispatch({
        type: SET_DOCUMENTS_SEARCHED_STUD,
        data: {
            students: list
        }
    })
}

export const AddDocument = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Adding Document"
    })
    const { values, count, toDisplay } = getState().Document;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/document/new`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                document: {
                    ...values
                }
            }
        })
            .then((res) => {
                // res.data.document

                var newList = [...toDisplay];

                if (newList.length > 10) {
                    newList.pop();
                }

                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "Document Successfully Added"
                });
                dispatch({
                    type: SET_DOCUMENTS,
                    data: {
                        documents: (toDisplay.length <= 10) ? [{ ...res.data.document }, ...toDisplay] : [{ ...res.data.document }, ...newList],
                        count: count + 1
                    }
                });

                Delay(() => {
                    cb();
                }, 1000);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const SetDocumentDetail = (doc, type) => (dispatch, getState) => {
    console.log("+++++++++++++++++::::::::");
    console.log(doc);
    console.log(type);
    if (typeof doc == "string") {
        const { toDisplay } = (type == "all") ? getState().Document : getState().Document[type];
        const documents = toDisplay.filter((per) => per._id == doc);
        console.log(documents);
        dispatch({
            type: SET_DOCUMENT_DETAIL,
            detail: {
                document: [...documents]
            }
        })
    } else {
        dispatch({
            type: SET_DOCUMENT_DETAIL,
            detail: {
                document: [{ ...doc }]
            }
        })
    }

}

export const UpdateDocument = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Updating Document"
    })

    const { values, count, toDisplay } = getState().Document;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/document/update`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                document: {
                    ...values
                }
            }
        })
            .then((res) => {
                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "Document Successfully Added"
                });

                var newList = toDisplay.map((list) => {
                    return (list._id == values._id) ? values : list;
                });
                dispatch({
                    type: SET_DOCUMENTS,
                    data: {
                        documents: newList,
                        count: count
                    }
                });

                Delay(() => {
                    cb();
                }, 1000);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const MoveDocumentTo = (office, remarks, type, cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Moving Document"
    })

    const { values, gCount, toDisplay, incoming, received, offices } = getState().Document;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/document/move`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                document: {
                    document: values._id,
                    office: office,
                    remarks: remarks,
                    status: "incoming",
                }
            }
        })
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    var ls = JSON.parse(localStorage.getItem(PRE + "-info"));

                    var currentAction = {
                        date: new Date(),
                        movedBy: {
                            name: ls.name,
                            _id: ""
                        },
                        office: offices.filter((off) => off._id == office)[0],
                        officeFrom: ls.office,
                        receivedBy: null,
                        remarks: remarks,
                        status: "incoming"
                    };

                    console.log("---------!!!");
                    console.log(currentAction);

                    dispatch({
                        type: CHANGE_ALERT,
                        resType: "success",
                        msg: "Document Successfully Moved"
                    });

                    if (type == "received") {

                        Delay(() => {
                            dispatch({
                                type: SET_DOCUMENTS_RECEIVED,
                                data: {
                                    documents: received.toDisplay.filter((rec) => rec._id != values._id),
                                    count: received.gCount - 1,
                                }
                            });
                            cb();
                        }, 3000);

                    } else if (type == "all") {
                        console.log(toDisplay);

                        var rec = received.toDisplay.filter((rec) => rec._id != values._id);
                        if (received.toDisplay.length != rec.length) {
                            dispatch({
                                type: SET_DOCUMENTS_RECEIVED,
                                data: {
                                    documents: received.toDisplay.filter((rec) => rec._id != values._id),
                                    count: received.gCount - 1,
                                }
                            });
                        }
                        dispatch({
                            type: SET_DOCUMENTS,
                            data: {
                                documents: toDisplay.map((toD => {
                                    if (toD._id == values._id) {
                                        return {
                                            ...values,
                                            currentAction: {
                                                ...currentAction
                                            },
                                            actions: [...values.actions, currentAction]
                                        }
                                    }
                                    return toD;
                                })),
                                count: gCount
                            }
                        });
                        cb();
                    }
                }


                // dispatch({
                //     type: SET_DOCUMENTS,
                //     data: {
                //         documents: newList,
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

export const ReceiveDocument = (document, cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Receiving Document"
    })

    const { incoming, received } = getState().Document;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/document/receive`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                document: {
                    document: document,
                }
            }
        })
            .then((res) => {
                console.log(res.data.data.currentAction.date);
                if (res.data.success) {
                    dispatch({
                        type: CHANGE_ALERT,
                        resType: "success",
                        msg: "Document Received!"
                    });

                    var incomingList = incoming.toDisplay.filter((inc) => inc._id != document)

                    dispatch({
                        type: SET_DOCUMENTS_INCOMING,
                        data: {
                            documents: incomingList,
                            count: incoming.gCount - 1,
                        }
                    });

                    console.log("+++++++++++++++++++++!");
                    console.log(incoming.toDisplay.filter((inc) => inc._id == document));
                    console.log(received.toDisplay);

                    const toReceive = incoming.toDisplay.filter((inc) => inc._id == document)[0];
                    dispatch({
                        type: SET_DOCUMENTS_RECEIVED,
                        data: {
                            documents: [
                                {
                                    ...toReceive,
                                    currentAction: {
                                        ...toReceive.currentAction,
                                        date: res.data.data.currentAction.date,
                                    }
                                }, ...received.toDisplay],
                            count: received.gCount + 1,
                        }
                    });
                }

                // var action = {
                //     status: "incoming",
                //     remarks: remarks,
                //     office: offices.filter((off) => off._id == office),
                //     receivedBy: null,
                //     date: new Date(),
                // }

                // var newValues = {
                //     ...values,
                //     actions: [...values.actions, action],
                //     currentAction: {
                //         ...action
                //     }
                // }

                // var newList = toDisplay.map((list) => {
                //     return (list._id == values._id) ? newValues : list;
                // });
                // console.log(newList);
                // dispatch({
                //     type: SET_DOCUMENTS,
                //     data: {
                //         documents: newList,
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

export const GetDocumentActivity = (type, cb = () => { }) => (dispatch, getState) => {

    const { values } = getState().Document;

    toast.promise(
        new Promise(async (resolve, reject) => {
            axios({
                url: `${SERVER_API}/document/activities`,
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                params: {
                    document: values._id
                }
            })
                .then((res) => {
                    if (res.data.success) {
                        const { activities } = res.data;

                        dispatch({
                            type: SET_DOCUMENT_DETAIL,
                            detail: {
                                document: [{
                                    ...values,
                                    actions: [...activities]
                                }]
                            }
                        })

                        cb();
                        Delay(() => {
                            resolve();
                        }, 100);


                    }
                });
        })
        , {
            loading: 'Retrieving...',
            success: 'Retrieved',
            error: 'Failed to Retrieve',
        }, {
        loading: {
            duration: Infinity
        },
        success: {
            duration: 3000
        }
    }
    );

}

export const UploadDocument = (file, ownerName, cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Uploading Document"
    });

    const { values, received, tempStudent } = getState().Document;
    console.log(values.type);
    console.log(values.owner);
    console.log();
    var spl = (file) ? file.name.split(".") : "";
    var ls = JSON.parse(localStorage.getItem(PRE + "-info"));
    console.log(tempStudent);
    var fileName = "";

    if (values.owner == "" || values.owner == null) {
        fileName = (ls.office.division + "-" + ls.office.section).split(" ").join("-") + "-~" + values.type + "~-" + new Date().valueOf() + '.' + spl[spl.length - 1];
    } else {
        fileName = ownerName.split(",").join("").split(" ").join("-") + "-~" + values.type + "~-" + new Date().valueOf() + '.' + spl[spl.length - 1];
    }

    return new Promise((resolve, reject) => {
        SaveFile('user/upload-file', fileName, fileName, "student-files", file, [{ name: "studentId", value: values.owner }])
            .then((res2) => {
                console.log(res2.files);
                if (res2.status) {
                    dispatch({
                        type: CHANGE_ALERT,
                        resType: "success",
                        msg: "Document Successfully Added"
                    });

                    console.log("AAAAAAAAAAAAA!!!!!!!!!!!!!!!!!!!!!!!!!");
                    console.log((res2.files.owner != "" || res2.files.owner != null));
                    console.log(tempStudent);

                    dispatch({
                        type: SET_DOCUMENTS_RECEIVED,
                        data: {
                            documents: [
                                {
                                    ...res2.files,
                                    owner: (res2.files.owner != "" || res2.files.owner != null) ? { ...tempStudent } : ""
                                }, ...received.toDisplay],
                            count: received.gCount + 1,
                        }
                    });

                    dispatch({
                        type: SET_DOCUMENT_DETAIL,
                        detail: {
                            document: [{
                                ...res2.files,
                                owner: (res2.files.owner != "" || res2.files.owner != null) ? { ...tempStudent } : ""
                            }]
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