import { Form, Table }                      from "react-bootstrap";
import Card                                 from 'react-bootstrap/Card';
import { useEffect, useState }              from "react";
import { useNavigate }                      from "react-router-dom";
import { getCurrentLoggedUser }             from "../../../utils/services/auth-http-utils";
import { getUserReadMangaByUserId, 
         saveUserReadManga }                from "../../../utils/services/user-read-manga-http-utils";

import { getManga, saveManga, deleteManga } from "../../../utils/services/manga-http-utils";
import { saveUserMangaProcess }             from "../../../utils/services/utils";

export function MangaList(){
    
    const emptyUserReadManga = {
        userId          : "",
        mangaId         : "",
        title           : "",
        photo           : "",
        readingStatus   : "",
        userScore       : 0,
        readingChapters : 0
    };    

    const loggedUser                            = getCurrentLoggedUser();
    const [mangaCollection, setMangaCollection] = useState([]);
    const navigate                              = useNavigate();

    useEffect( () => {
        getManga().then( (response) => {
            setMangaCollection( response.data );
        });
    }, []);
    

    const renderTableBody = () => {
        return mangaCollection.map( manga => {   
            
            const renderActionButtons = () => {
               if(loggedUser.isAdmin){
                    return <>
                            <td className="action-buttons">
                                <button className="edit" style = {{float:"left"}}  onClick = { onEdit }>Edit</button>
                                <button className="delete" onClick = { onDelete }>Delete</button>
                            </td>
                        </>
               }
            }

            const onEdit = () => {
                navigate(`/manga/edit/${manga.id}`)
            }

            const onDelete = () => {
                deleteManga(manga.id).then(() =>{
                    setMangaCollection( allManga  => {
                        return allManga.filter(m => m.id != manga.id);
                    })
                });
            }

            const addMangaToList = () => {
                emptyUserReadManga.mangaId = manga.id;
                saveUserReadManga(emptyUserReadManga, false).then( () => {
                    manga.readers++;
                }).then( () => saveManga(manga)).catch( err => {console.log(err)});
            };
            
            const updateNavigator = () => {
                navigate(`/mangapage/${manga.id}`);
            }

            const updateMangaScore = ( event ) => {
                let userManga;
                getUserReadMangaByUserId().then( ( response ) => {
                    userManga = response.data.find(um => um.mangaId === manga.id);
                }).then( () => { 
                
                    if(!userManga){
                        return;
                    }  
                    const newScore = parseInt(event.target.value);
                    userManga.userScore = newScore;
                    saveUserMangaProcess(userManga);
                });
            }

            return <tr key={manga.id}>
                <td>{manga.id}</td>
                <td>
                <Card.Link onClick = { updateNavigator }>
                    <img src = {manga.photo}  style = {{width : "30%"}}/>
                </Card.Link>
                </td>
                <td>{manga.title}</td>
                <td>{manga.summary}</td>
                <td>{manga.status}</td>
                <td>{manga.author}</td>
                <td><img src = "https://static.vecteezy.com/system/resources/thumbnails/001/189/165/small/star.png" 
                    style = {{width : "50%", float:"left"}}
                    />{manga.score}</td>
                <td>
                    <Form.Select name="score" onChange = { updateMangaScore } >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Select>
                </td>
               
                <td className="action-buttons">
                    { renderActionButtons() }
                    <button className="addToList" onClick={ addMangaToList }>Add To Your Manga List</button>
                </td>
            </tr>
        })
    }

    return (
        <div className="tasks-list" style={{margin: '10%'}}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td style = {{width : "20%"}}>Cover</td>
                        <td>Title</td>
                        <td style = {{width : "40%"}}>Summary</td>
                        <td style = {{width : "10%"}}>Status</td>
                        <td style = {{width : "10%"}}>Author</td>
                        <td style = {{width : "7%"}}>Score</td>
                        <td style = {{width : "10%"}}>Your</td>
                        <td style = {{width : "30%"}}>Actions</td>
                    </tr>
                </thead>
                <tbody>
                  { renderTableBody() }
                </tbody>
            </Table>
        </div>
    );
}