import { Alert } from "react-native"

export function handleError(error, navigation) {
    if(error.response.status === 401) {
        Alert.alert('Unauthorized', 'You need to Log in to access this', [{ text: "OK", onPress: () => navigation.navigate("Login")}])
    } else if(error.response.status === 400 && error.response.data === 'Bad Request' && !attemptedLogin) {
        Alert.alert('Bad Request', 'Please check you are entering valid information')
    } else if(error.response.status === 403) {
        Alert.alert('Forbidden', 'You do not have permission to access this page')
    } else if(error.response.status === 404) {
        Alert.alert('Not Found', 'The requested URL was not found')
    } else if(error.response.status === 500) {
        Alert.alert('Server Error', 'Internal server error')
    }
}

export function handleLoginError(error) {
    if(error.response.status === 400) {
        Alert.alert('Could not login', 'Invalid email/password supplied')
    } else if(error.response.status === 500) {
        Alert.alert('Server Error', 'Internal server error')
    }
}
