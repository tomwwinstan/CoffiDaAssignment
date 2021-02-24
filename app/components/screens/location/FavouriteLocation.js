import axios from 'axios';
import { handleError } from '../../shared/ErrorHandling';

export function likeLocation(authKey, id) {
    axios.post('http://10.0.2.2:3333/api/1.0.0/location/' + id + '/favourite', { }, { headers: {
        "X-Authorization": authKey } 
    })
    .then((response) => {
        console.log('Location liked')
    }, (error) => {
        handleError(error)
    })
}

export function unlikeLocation (authKey, id) {
    axios.delete('http://10.0.2.2:3333/api/1.0.0/location/' + id + '/favourite', { headers: {
        'X-Authorization': authKey }
    })
    .then((response) => {
        console.log('Location un Liked')
    }, (error) => {
        handleError(error)
    })
}