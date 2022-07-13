import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SET_POSITIONS,
    SET_POSITION_DETAIL,
    SET_POSITION_DEFAULT,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import { SERVER_URI, SERVER_API, JWT } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SetPositionDefault = () => (dispatch) => {
    dispatch({
        type: SET_POSITION_DEFAULT,
    })
}

export const AddPosition = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Adding Position"
    })
    const { values, count, toDisplay } = getState().Position;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/position/new`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                position: {
                    ...values
                }
            }
        })
            .then((res) => {
                // res.data.position

                var newList = [...toDisplay];

                if (newList.length > 10) {
                    newList.pop();
                }

                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "Position Successfully Added"
                });
                dispatch({
                    type: SET_POSITIONS,
                    data: {
                        positions: (toDisplay.length <= 10)?[{...res.data.position}, ...toDisplay]:[{...res.data.position}, ...newList],
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

export const SetPositionDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().Position;
    const positions = toDisplay.filter((per) => per._id == id);
    console.log(positions);
    dispatch({
        type: SET_POSITION_DETAIL,
        detail: {
            position: [...positions]
        }
    })
}

export const UpdatePosition = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Updating Position"
    })

    const { values, count, toDisplay } = getState().Position;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/position/update`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                position: {
                    ...values
                }
            }
        })
            .then((res) => {
                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "Position Successfully Added"
                });

                var newList = toDisplay.map((list) => {
                    return (list._id == values._id) ?values :list;
                });
                dispatch({
                    type: SET_POSITIONS,
                    data: {
                        positions: newList,
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


