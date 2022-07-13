import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SET_OFFICES,
    SET_OFFICE_DETAIL,
    SET_OFFICE_DEFAULT,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import { SERVER_URI, SERVER_API, JWT } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SetOfficeDefault = () => (dispatch) => {
    dispatch({
        type: SET_OFFICE_DEFAULT,
    })
}

export const AddOffice = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Adding Office"
    })
    const { values, count, toDisplay } = getState().Office;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/office/new`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                office: {
                    ...values
                }
            }
        })
            .then((res) => {
                // res.data.office

                var newList = [...toDisplay];

                if (newList.length > 10) {
                    newList.pop();
                }

                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "Office Successfully Added"
                });
                dispatch({
                    type: SET_OFFICES,
                    data: {
                        offices: (toDisplay.length <= 10)?[{...res.data.office}, ...toDisplay]:[{...res.data.office}, ...newList],
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

export const SetOfficeDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().Office;
    const offices = toDisplay.filter((per) => per._id == id);
    console.log(offices);
    dispatch({
        type: SET_OFFICE_DETAIL,
        detail: {
            office: [...offices]
        }
    })
}

export const UpdateOffice = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Updating Office"
    })

    const { values, count, toDisplay } = getState().Office;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/office/update`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                office: {
                    ...values
                }
            }
        })
            .then((res) => {
                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "Office Data Successfully Updated"
                });

                var newList = toDisplay.map((list) => {
                    return (list._id == values._id) ?values :list;
                });
                dispatch({
                    type: SET_OFFICES,
                    data: {
                        offices: newList,
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


