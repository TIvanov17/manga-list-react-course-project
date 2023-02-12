import axios                    from "axios";
import { getCurrentLoggedUser } from "./auth-http-utils";
import { getUserById }          from "./user-http-utils";

const apiUrl = 'http://localhost:3005/review';

export function getReview(){
    return axios.get(apiUrl);
}

export function getReviewById( currentReviewId ){
    return axios.get(`${apiUrl}/${currentReviewId}`);
}

export async function getReviewedUser( currentReviewId ){
    const review = (await getReviewById(currentReviewId)).data;
    return getUserById(review.userId);
} 

export async function saveReview( currentReview ){
    const loggedUser  = getCurrentLoggedUser();
    currentReview.userId = loggedUser.id;

    return axios.post(apiUrl, currentReview);
}