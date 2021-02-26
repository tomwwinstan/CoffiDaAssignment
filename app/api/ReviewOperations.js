import axios from "axios";
import { handleError } from '../components/shared/ErrorHandling';
import { getToken } from '../components/shared/AuthToken';
import { Alert } from "react-native";

export async function addReviewToLocation(location_id, newReview) {
    const authKey = await getToken()
    await axios.post('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review', {
        overall_rating: parseInt(newReview.overall_rating),
        price_rating: parseInt(newReview.price_rating),
        quality_rating: parseInt(newReview.quality_rating),
        clenliness_rating: parseInt(newReview.clenliness_rating),
        review_body: newReview.review_body
        }, { headers: { "X-Authorization": authKey }
    })
    .then(() => {
        Alert.alert('Review Added')
    })
    .catch((error) => {
        handleError(error)
    })
}

export async function deleteReview(location_id, review_id) {
    const authKey = await getToken()
    await axios.delete('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id, { headers: {
        "X-Authorization": authKey } 
    })
    .then(() => {
        Alert.alert('Review Deleted')
    }, (error) => {
        handleError(error)
    })
}

export async function updateReview(location_id, review_id, updatedReview) {
    const authKey = await getToken()
    await axios.patch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id, {
        overall_rating: parseInt(updatedReview.overall_rating),
        price_rating: parseInt(updatedReview.price_rating),
        quality_rating: parseInt(updatedReview.quality_rating),
        clenliness_rating: parseInt(updatedReview.clenliness_rating),
        review_body: updatedReview.review_body
    }, { headers: { 'X-Authorization': authKey }
    })
    .then(() => {
        Alert.alert('Review Updated')
    })
    .catch((error) => {
        handleError(error)
    })
}

export async function likeReview(location_id, review_id) {
    const authKey = await getToken()
    await axios.post('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/like', { }, { headers: {
        "X-Authorization": authKey } 
    })
    .then(() => {
        Alert.alert('Review Liked')
    })
    .catch((error) => {
        handleError(error)
    })
}

export async function unlikeReview(location_id, review_id) {
    const authKey = await getToken()
    await axios.delete('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/like', { headers: {
        'X-Authorization': authKey }
    })
    .then(() => {
        Alert.alert('Review Un Liked')
    })
    .catch((error) => {
        handleError(error)
    })
}