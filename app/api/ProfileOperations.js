import axios from 'axios';
import { handleError, handleLoginError } from '../components/shared/ErrorHandling';
import { getToken, removeTokenAndID, getUserId, storeToken } from '../components/shared/AuthToken';

export async function logIn(email, password, navigation) {
    axios.post('http://10.0.2.2:3333/api/1.0.0/user/login', {
      email: email,
      password: password
      })
      .then(async (response) => {
        await storeToken(response.data.token, JSON.stringify(response.data.id))
        navigation.navigate('ProfileDetails')
      })
      .catch((error) => {
        handleLoginError(error)
    })
}

export async function getDetails(navigation) {
    const authKey = await getToken()
    const id = await getUserId()
    let response =  await axios.get('http://10.0.2.2:3333/api/1.0.0/user/' + id, {headers: {
        'X-Authorization': authKey }
    })
    .catch((error) => {
        handleError(error, navigation)
    })
    return response
}

export async function addNewUser(details) {
    axios.post('http://10.0.2.2:3333/api/1.0.0/user', {
        first_name: details.first_name,
        last_name: details.last_name,
        email: details.email,
        password: details.password
    })
    .then(() => {
        console.log('User created')
    })
    .catch((error) => {
        handleError(error)
    })
}

export async function updateUserDetails(details) {
    const authKey = await getToken()
    const id = await getUserId()
    axios.patch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
        first_name: details.first_name,
        last_name: details.last_name,
        email: details.email,
        password: details.password
        }, 
        { headers: {
            'X-Authorization': authKey }
    })
    .then(() => {
        console.log('User with ID: ' + id + ' Updated')
    })
    .catch((error) => {
        handleError(error)
    })
}

export async function logOut() {
    const authKey = await getToken()
    await axios.post('http://10.0.2.2:3333/api/1.0.0/user/logout', {}, {headers: {
        'X-Authorization': authKey }
    })
    .then(() => {
        console.log("User logged out")
        removeTokenAndID()
    })
    .catch((error) => {
        handleError(error)
    })
}