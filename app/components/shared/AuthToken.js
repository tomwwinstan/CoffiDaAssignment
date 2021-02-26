import AsyncStorage from '@react-native-async-storage/async-storage';
  
export async function storeToken(auth, id) {
    try {
        await AsyncStorage.setItem('@auth_key', auth)
        await AsyncStorage.setItem('@id_key', id)
        console.log('Auth key stored')
    } catch (e) {
        console.log(e)
    }
}

export async function getToken() {
    try {
        return authKey = await AsyncStorage.getItem('@auth_key')
    } catch (e) {
        console.log(e)
    }
}

export async function getUserId() {
    try {
        return await AsyncStorage.getItem('@id_key')
    } catch (e) {
        console.log(e)
    }
}

export async function removeTokenAndID() {
    try {
        await AsyncStorage.clear()
        console.log('Async cleared')
    } catch (e) {
        console.log(e)
    }
}