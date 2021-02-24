import axios from 'axios';
import { handleError } from './ErrorHandling';

export async function getDetails(authKey, id) {
    let response =  await axios.get('http://10.0.2.2:3333/api/1.0.0/user/' + id, {headers: {
        'X-Authorization': authKey }
    })
    .catch((error) => {
        handleError(error)
    })
    return response
}