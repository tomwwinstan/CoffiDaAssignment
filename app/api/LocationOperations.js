import axios from "axios";
import { handleError } from '../components/shared/ErrorHandling';
import { getToken } from '../components/shared/AuthToken';
import { Alert } from "react-native";

export async function findLocationsForGivenURL(url, navigation) {
    const authKey = await getToken()
    let response =  await axios.get(url, {headers: {
            'X-Authorization': authKey}
        })
        .catch((error) => {
            handleError(error, navigation)
        })
    return response
}

// Wasn't sure whether to inculde authKey as you don't need it, but feel like the server actually should?
export async function findLocationById(id) {
    const authKey = await getToken()
    let response = await axios.get('http://10.0.2.2:3333/api/1.0.0/location/' + id, { headers: {
            'X-Authorization': authKey }
        })
        .catch((error) => {
            handleError(error)
        })
    return response
}

export async function likeLocation(id) {
    const authKey = await getToken()
    await axios.post('http://10.0.2.2:3333/api/1.0.0/location/' + id + '/favourite', { }, { headers: {
        "X-Authorization": authKey } 
    })
    .then(() => {
        Alert.alert('Location liked')
    })
    .catch((error) => {
        handleError(error)
    })
}

export async function unlikeLocation (id) {
    const authKey = await getToken()
    await axios.delete('http://10.0.2.2:3333/api/1.0.0/location/' + id + '/favourite', { headers: {
        'X-Authorization': authKey }
    })
    .then(() => {
        Alert.alert('Location Un Liked')
    })
    .catch((error) => {
        handleError(error)
    })
}