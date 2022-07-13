import {
    SET_PROFILE_DATA,
    SET_USER_INFO,
    SET_PROFILE_FILE,
    UPDATE_FILES,
    SET_USER_AVATAR,
} from './types';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import { SERVER_API, JWT, PRE } from 'config';
import axios from 'axios';
import { SaveFile } from 'store/actions/helpers/displayAction';

export const SetProfileData = (data) => (dispatch) => {
    dispatch({
        type: SET_PROFILE_DATA,
        value: data
    })
}

export const GetProfileFile = (file, type) => (dispatch, getState) => {
    dispatch({
        type: SET_PROFILE_FILE,
        file: file,
        fType: type,
    })
}

export const SaveProfileFile = (type, cb) => (dispatch, getState) => {
    const { Profile } = getState();
    const files = [...Profile.tempFiles];
    var file = null;
    for (let i = 0; i < files.length; i++) {
        if (files[i].type == type) {
            file = { ...files[i] };
            break;
        }
    }

    var spl = file.file[0].file.name.split(".");

    var name = JSON.parse(localStorage.getItem(PRE + "-info")).name;
    var tkn = localStorage.getItem(PRE + "-tkn");
    tkn = tkn.slice(0, 15);

    var fname = (name.last.split(" ").join("-")) + "-" + (name.first.split(" ").join("-")) + "-" + type + "-" + new Date().valueOf() + '.' + spl[spl.length - 1];

    toast.promise(
        new Promise(async (resolve, reject) => {

            await SaveFile('user/upload-file', fname, fname, type, files[0].file[0].file)
                .then((res) => {
                    if (res.status) {
                        dispatch({
                            type: UPDATE_FILES,
                            files: [...res.files],
                        })
                        cb();
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });

        })
        , {
            loading: 'Updating Profile...',
            success: 'File Successfully Saved',
            error: 'Failed to Save File',
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
export const SaveInfoUpdates = (data) => (dispatch, getState) => {
    const { Profile } = getState();
    const values = { ...Profile.values };

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/user/update`,
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

                    resolve();
                })
                .catch(err => {
                    reject();
                    alert(err);
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Updating Profile...',
            success: 'Successfully Updated',
            error: 'Failed to Update',
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

export const SavePassword = (passwords, callback) => (dispatch, getState) => {

    toast.promise(
        new Promise((resolve, reject) => {
            axios({
                url: `${SERVER_API}/user/update-password`,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(JWT)}`
                },
                data: {
                    old: passwords.old.val,
                    new: passwords.new.val,
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        callback();
                        resolve();
                    } else {
                        reject({ message: res.data.message });
                    }
                })
                .catch(err => {
                    reject();
                    alert(err);
                    // this.props.ToggleAlert("failed", 'Login Failed', true);
                })
        })
        , {
            loading: 'Updating Password...',
            success: 'Password Updated',
            error: (err) => `${err.message}`,
        }, {
        loading: {
            duration: Infinity
        },
        success: {
            duration: 3000
        },
        error: {
            duration: 5000
        }
    }
    );

}

export const GetMyInfo = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/user/get-my-info`,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            params: {
            }
        })
            .then((res) => {
                res.data.info[0].files.map((file, i) => {
                    if (file.type == "avatar" && file.status == "current") {
                        localStorage.setItem(PRE + "-pp", file.path);
                    }
                })

                dispatch({
                    type: SET_USER_INFO,
                    info: res.data.info[0]

                })
            });
    })
}

export const SetUserAvatar = (file, base64) => (dispatch, getState) => {
    dispatch({
        type: SET_USER_AVATAR,
        file: file,
        base64: base64,
    });
}

export const UpdateProfilePic = (cb = () => { }) => (dispatch, getState) => {

    var { tempAvatar } = getState().Profile;

    var spl = tempAvatar.file.name.split(".");
    var name = JSON.parse(localStorage.getItem(PRE + "-info")).name;
    var fname = (name.last.split(" ").join("-")) + "-" + (name.first.split(" ").join("-")) + "-profile-picture-" + new Date().valueOf() + '.' + spl[spl.length - 1];

    toast.promise(
        new Promise(async (resolve, reject) => {

            await SaveFile('user/upload-file', fname, fname, "avatar", tempAvatar.file)
                .then((res) => {
                    if (res.status) {
                        dispatch({
                            type: UPDATE_FILES,
                            files: [...res.files],
                        })
                        localStorage.setItem(PRE + "-pp", res.files[res.files.length - 1].path);
                        dispatch({
                            type: SET_USER_AVATAR,
                            file: null,
                            base64: null,
                        });
                        cb();
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });

        })
        , {
            loading: 'Updating Profile...',
            success: 'Profile Successfully Updated',
            error: 'Failed to Update Profile',
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
