import axios from "axios";
import { getCurrentLoggedUser } from "./auth-http-utils";

const apiUrl = 'http://localhost:3005/manga';

export function getManga(){
    return axios.get(apiUrl);
}

export function getMangaById( currentMangaId ){
    return axios.get(`${apiUrl}/${currentMangaId}`);
}

export function saveManga(currentManga){

    if(!currentManga.photo){
        currentManga.photo = `https://picsum.photos/200/300?random=${Math.random()}`;
    }

    const loggedUser  = getCurrentLoggedUser();
   
    if(currentManga.id && loggedUser.isAdmin){
        return axios.put(`${apiUrl}/${currentManga.id}`, currentManga);
    }

    if(currentManga.id && !loggedUser.isAdmin){
        return axios.put(`${apiUrl}/${currentManga.id}`, currentManga);
    }

    return axios.post(apiUrl, currentManga);
}

export function deleteManga( mangaToDeleteId){
    return axios.delete(`${apiUrl}/${mangaToDeleteId}`)
}