// This regex makes sure that an email is in the correct format e.g. twin@example.com
export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// This regex makes sure password is at least 6 characters, no white space and contains at least 1 upper and lowecase letter
export function validatePassword(password) {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
    return re.test(password);
}

export function validateReviewBody(reviewBody) {
    // Add words you do not want in a review
    var profanity = ['tea', 'cake', 'pastries']

    return profanity.some(word => reviewBody.toLowerCase().includes(word))
}
