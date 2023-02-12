import axios                        from "axios";
import { getCurrentLoggedUser }     from "./auth-http-utils";
import { getMangaById, saveManga }  from "./manga-http-utils";

const apiUrl = "http://localhost:3005/user-read-manga";

export function getUserReadMangaByUserId(){
    
    const loggedUser = getCurrentLoggedUser();

    const url = `${apiUrl}?userId=${loggedUser.id}`;

    return axios.get(url);
}

export async function getMangaScore( mangaId ){

    const url = `${apiUrl}?mangaId=${mangaId}`;

    const allScores = (await axios.get(url)).data;

    let sum = 0;
    for(let i = 0; i < allScores.length; i++) {
        let currentScore = allScores[i].userScore;
        sum += currentScore;
    }

    let average = sum / allScores.length;
    return average;
}

export async function saveUserReadManga( userMangaObj, isUpdate ){

    if(userMangaObj.id && isUpdate){
        return axios.put(`${apiUrl}/${userMangaObj.id}`, userMangaObj);
    }

    const mangaList = (await getUserReadMangaByUserId()).data;
    const foundMangaInList = mangaList.find( m => m.mangaId == userMangaObj.mangaId);
    
    if(foundMangaInList && !isUpdate){
        return;
    }

    const loggedUser = getCurrentLoggedUser();
    const currentManga = (await getMangaById(userMangaObj.mangaId)).data;
    
    if(!userMangaObj.id){
        
        userMangaObj.userId = loggedUser.id;
        userMangaObj.title  = currentManga.title;
        userMangaObj.photo  = currentManga.photo;
    
        return axios.post(apiUrl, userMangaObj);
    }
    
    return axios.put(`${apiUrl}/${userMangaObj.id}`, userMangaObj);
}
