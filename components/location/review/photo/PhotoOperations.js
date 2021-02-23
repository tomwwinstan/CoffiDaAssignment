export function addPhotoForReview(authKey, location_id, review_id, photo) {
    fetch('http://10.0.2.2:3333/api/1.0.0/location/' + location_id + '/review/' + review_id + '/photo',
        {
          method: 'POST',
          headers: {
            "Content-Type": "image/jpeg",
            "X-Authorization": authKey
          },
            body: photo
          })
          .then((response) => {
            console.log('Image Uploaded')
          })
          .catch((error) => {
            console.error(error);
          });
}