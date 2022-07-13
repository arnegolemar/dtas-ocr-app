
import {
    SET_DOCUMENT_ROWS,
} from './types';
import { SERVER_URI, SERVER_API, JWT_STU, PRE_STU } from 'config';
import axios from 'axios';

export const UpdateDocument = (data) => (dispatch, getState) => {

    var { rows } = getState().StudentWebView;

    rows = rows.map(r => {
        return (r._id == data._id)?data:r;
    })

    return new Promise((resolve, reject) => {
        axios({
            url: `${SERVER_API}/document/update`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT_STU)}`
            },
            data: {
                document: {
                    ...data
                }
            }
        })
            .then((res) => {

                dispatch({
                    type: SET_DOCUMENT_ROWS,
                    rows: rows
                })

            })
            .catch(err => {
                reject(err);
            })
    })

}