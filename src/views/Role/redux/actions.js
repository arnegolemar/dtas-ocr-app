import {
    TOGGLE_ALERT,
    CHANGE_ALERT,
} from 'store/types';

import {
    SET_ROLES,
    SET_ROLE_DETAIL,
    SET_ROLE_DEFAULT,
} from './types';
import {
    Delay,
} from 'store/actions/helpers/alertAction';
import { SERVER_URI, SERVER_API, JWT } from 'config';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SetRoleDefault = () => (dispatch) => {
    dispatch({
        type: SET_ROLE_DEFAULT,
    })
}

export const UpdateRouteList = (route) => (dispatch, getState) => {

    var { values } = getState().Role;
    var updatedRoute = [];

    for (let x = 0; x < values.routes.length; x++) {
        if (values.routes[x] != route) {
            updatedRoute.push(values.routes[x]);
        }
    }

    if (values.routes.length == updatedRoute.length) {
        updatedRoute.push(route);
    }

    dispatch({
        type: SET_ROLE_DETAIL,
        detail: {
            role: [{
                name: values.name,
                routes: updatedRoute,
                systems: [],
                _id: values._id
            }]
        }
    })

}

export const AddRole = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Adding Role"
    })
    const { values, count, toDisplay } = getState().Role;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/role/new`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                role: {
                    ...values
                }
            }
        })
            .then((res) => {
                // res.data.role

                var newList = [...toDisplay];

                if (newList.length > 10) {
                    newList.pop();
                }

                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "Role Successfully Added"
                });
                dispatch({
                    type: SET_ROLES,
                    data: {
                        roles: (toDisplay.length <= 10)?[{...res.data.role}, ...toDisplay]:[{...res.data.role}, ...newList],
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

export const SetRoleDetail = (id) => (dispatch, getState) => {
    const { toDisplay } = getState().Role;
    const roles = toDisplay.filter((per) => per._id == id);
    console.log(roles);
    dispatch({
        type: SET_ROLE_DETAIL,
        detail: {
            role: [...roles]
        }
    })
}

export const UpdateRole = (cb = () => { }) => (dispatch, getState) => {
    dispatch({
        type: TOGGLE_ALERT,
        resType: "loading",
        msg: "Updating Role"
    })

    const { values, count, toDisplay } = getState().Role;

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/role/update`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                role: {
                    ...values
                }
            }
        })
            .then((res) => {
                dispatch({
                    type: CHANGE_ALERT,
                    resType: "success",
                    msg: "Role Successfully Added"
                });

                var newList = toDisplay.map((list) => {
                    return (list._id == values._id) ?values :list;
                });
                dispatch({
                    type: SET_ROLES,
                    data: {
                        roles: newList,
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


