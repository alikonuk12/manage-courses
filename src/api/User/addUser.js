import axios from 'axios';
import { BASE_URL } from '../constant';

const addUser = async (data) => {
    try {
        const config = {
            baseURL: BASE_URL,
            url: `/users/add`,
            method: 'POST',
            data
        };

        const { status } = (await axios(config));
        return status;
    } catch (e) {
        console.log(e);
    }
}

export default addUser;