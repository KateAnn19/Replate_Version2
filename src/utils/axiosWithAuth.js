import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            authorization: token
        },
        baseURL: 'https://replater.herokuapp.com/api/'
    })
}

// {
// 	"type": "bread",
// 	"amount": "3 loaves",
// 	"pickup-date": "2020-07-12"
// }