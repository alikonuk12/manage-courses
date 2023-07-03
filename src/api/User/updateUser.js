import axios from 'axios';
import { BASE_URL } from '../constant';

const updateUser = async (id, data) => {
    try {
        const config = {
            baseURL: BASE_URL,
            url: `/users/${id}`,
            method: 'PUT',
            data
        };

        const { status } = (await axios(config));
        return status;
    } catch (e) {
        console.log(e);
    }
}

export default updateUser;