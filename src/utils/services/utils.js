import { Navigate }                 from 'react-router';
import { getCurrentLoggedUser }     from './auth-http-utils';
import { getUserReadMangaByUserId, 
        saveUserReadManga,
         getMangaScore }            from './user-read-manga-http-utils';
import { saveManga, getMangaById}   from './manga-http-utils';

export function saveUserMangaProcess( userManga ){

    saveUserReadManga(userManga, true).then( () => { 
        let newScore;
        
        getMangaScore(userManga.mangaId).then( (response) => {newScore = response });
        let currentManga;
        
        getMangaById(userManga.mangaId).then( (response) => {            
            currentManga = response.data;
            currentManga.score = newScore;

        }).then( () => { saveManga(currentManga).catch( err => {console.log(err)})});
    });
}

export function parseBool( value ) {
    return value === 'true';
}

export async function userMangaColl(){
    const coll = (await getUserReadMangaByUserId()).data;
    return coll;
}

export function onFormControl( event, setter ){    
    setter( (prevState) => {
        return{
            ...prevState,
            [event.target.name]: event.target.value
        }
    });
}

export function navigateController( ) {

    const loggedUser = getCurrentLoggedUser();

    if(loggedUser && !loggedUser.isAdmin){
        return <Navigate to = {'/'}/>
    }
}


export function effect(paramsId, getterById, setter, emptyObj) {
    if(paramsId){
        getterById(paramsId)
            .then( ( response ) => {
                setter(response.data);
            })
    } else{
        setter(emptyObj);
    }
}