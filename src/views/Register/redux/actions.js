import axios from 'axios';
import { SERVER_API, JWT } from '../../../config';

export const RegisterAccount = (data) => (dispatch) => {
	console.log();
	return new Promise((resolve, reject) => {
		axios({
			url: `${SERVER_API}/user/new-applicant`,
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				// Authorization: `Bearer ${localStorage.getItem(JWT)}`
			},
			data: {
				email: data.email,
				name: data.name,
				password: data.password,
			}
		})
			.then((res) => {
				resolve({...res.data});
			})
			.catch(err => {
				reject(err);
			})
	})
}
