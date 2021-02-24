import axios from 'axios';
import { handleError } from '../../../shared/ErrorHandling';

export function deleteReview(authKey, location_id, review_id) {
    axios.delete('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id, { headers: {
        "X-Authorization": authKey } 
    })
    .then((response) => {
        console.log('Review deleted')
    }, (error) => {
        handleError(error)
    })
}

export function updateReview( authKey, location_id, review_id, overall_rating, price_rating, quality_rating, clenliness_rating, review_body) {
    axios.patch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id, {
        overall_rating: parseInt(overall_rating),
        price_rating: parseInt(price_rating),
        quality_rating: parseInt(quality_rating),
        clenliness_rating: parseInt(clenliness_rating),
        review_body: review_body
    }, { headers: { 'X-Authorization': authKey }
    })
    .then((response) => {
        console.log('Review updated')
    })
    .catch((error) => {
        handleError(error)
    })
}