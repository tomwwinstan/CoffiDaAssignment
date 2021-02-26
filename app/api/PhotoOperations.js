import { handleError } from "../components/shared/ErrorHandling";
import { getToken } from '../components/shared/AuthToken';
import axios from "axios";
import { Alert } from "react-native";

export async function getPhotoForReview(location_id, review_id) {
    const authKey = await getToken()
    let response = fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/photo', 
    {
      method: 'GET',
      headers: {
        "Content-Type": "image/jpeg",
        "X-Authorization": authKey
      },
    })
    .catch(error => {
      handleError(error)
    })
    return response
}

export async function addPhotoForReview(location_id, review_id, photo) {
    const authKey = await getToken()
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/photo',
    {
      method: 'POST',
      headers: {
      "Content-Type": "image/jpeg",
      "X-Authorization": authKey
    },
      body: photo
    })
    .then(() => {
      Alert.alert('Photo Uploaded')
    })
    .catch((error) => {
      handleError(error)
    });
}

export async function deletePhotoForReview(location_id, review_id) {
  const authKey = await getToken()
  await axios.delete('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/photo', 
  {
    headers: {
      'X-Authorization': authKey
    }
  })
  .then(() => {
    Alert.alert('Photo Deleted')
  })
  .catch((error) => {
    handleError(error)
  });
}
