import axios from 'axios';
import { BASE_URL } from '../constant';

const deleteUser = async (id) => {
    try {
        const config = {
            baseURL: BASE_URL,
            url: `/users/${id}`,
            method: 'DELETE'
        };

        const { data: { isDeleted }} = (await axios(config));
        return isDeleted;
    } catch (e) {
        console.log(e);
    }
}

export default deleteUser;