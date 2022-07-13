import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SET_TEMP2S,
    SET_TEMP2_DETAIL,
    SET_TEMP2_DEFAULT,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import { SERVER_URI, SERVER_API, JWT } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SetTemp1Default = () => (dispatch) => {
    dispatch({
        type: SET_TEMP2_DEFAULT,
    })
}

export const AddTemp1 = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Adding Temp1"
    })
    const { values, count, toDisplay } = getState().Temp1;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/temp3/new`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                temp3: {
                    ...values
                }
            }
        })
            .then((res) => {
                // res.data.temp3

                var newList = [...toDisplay];

                if (newList.length > 10) {
                    newList.pop();
                }

                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "Temp1 Successfully Added"
                });
                dispatch({
                    type: SET_TEMP2S,
                    data: {
                        temp3s: (toDisplay.length <= 10)?[{...res.data.temp3}, ...toDisplay]:[{...res.data.temp3}, ...newList],
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

export const SetTemp1Detail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().Temp1;
    const temp3s = toDisplay.filter((per) => per._id == id);
    console.log(temp3s);
    dispatch({
        type: SET_TEMP2_DETAIL,
        detail: {
            temp3: [...temp3s]
        }
    })
}

export const UpdateTemp1 = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Updating Temp1"
    })

    const { values, count, toDisplay } = getState().Temp1;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/temp3/update`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                temp3: {
                    ...values
                }
            }
        })
            .then((res) => {
                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "Temp1 Successfully Added"
                });

                var newList = toDisplay.map((list) => {
                    return (list._id == values._id) ?values :list;
                });
                dispatch({
                    type: SET_TEMP2S,
                    data: {
                        temp3s: newList,
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


