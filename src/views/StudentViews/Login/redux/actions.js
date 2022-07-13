import { SERVER_API, JWT, PRE_STU } from 'config';
import axios from 'axios';

export const LoginAccount = (info) => (dispatch) => {
    return new Promise((resolve, reject) => {
        console.log(info);
        axios({
            url: `${SERVER_API}/student/login`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: {
                username: info.username,
                password: info.password,
            }
        })
            .then((res) => {
                console.log(res);
                if (res.data.token) {
                    localStorage.setItem(PRE_STU + "-tkn", res.data.token);
                    localStorage.setItem(PRE_STU + "-info", JSON.stringify(res.data.info));
                    resolve(true);
                }
            })
            .catch(err => {
                console.log("AAAAAAAAAAAAAA");
                alert('Login Failed');
                // this.props.ToggleAlert("failed", 'Login Failed', true);
            })
    })
}
