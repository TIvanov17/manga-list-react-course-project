import { useParams }            from 'react-router';
import { useEffect, useState }  from "react";
import { getMangaById }         from "../../../utils/services/manga-http-utils";
import { MangaCard }            from "../manga-card/MangaCard";


export function MangaPage(){

    const params                            = useParams();
    const [currentManga, setCurrentManga]   = useState({});

    useEffect(() => {
        if (params.id) {
            getMangaById(params.id).then(result => {
                setCurrentManga(result.data);
            });   
        }
    }, [params.id])

    return(
        <div className="user-profile">
            <MangaCard manga = { currentManga }/>        
        </div>
    )
}