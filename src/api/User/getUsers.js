import axios from 'axios';
import { BASE_URL } from '../constant';

const getUsers = async (limit, skip, search) => {
    try {
        const config = {
            baseURL: BASE_URL,
            url: `/users${!!search?.length ? `/search?q=${search}&` : '?'}limit=${limit}&skip=${skip}`,
            method: 'GET'
        };

        const { status, data } = (await axios(config));
        if (status === 200) return data;
    } catch (e) {
        console.log(e);
    }
}

export default getUsers;