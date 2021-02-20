import axios from 'axios';

export function likeReview(authKey, location_id, review_id) {
    axios.post('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/like', { }, { headers: {
        "X-Authorization": authKey } 
    })
    .then((response) => {
        console.log(response + 'Review liked')
    }, (error) => {
        console.log(error)
    })
}

export function unlikeReview(authKey, location_id, review_id) {
    axios.delete('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/like', { headers: {
        'X-Authorization': authKey }
    })
    .then((response) => {
        console.log(response + 'Review un Liked')
    }, (error) => {
        console.log(error)
    })
}