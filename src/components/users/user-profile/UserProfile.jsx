import { Form, Table }                       from "react-bootstrap";
import Button                                from 'react-bootstrap/Button';
import { useParams }                         from 'react-router';
import { useNavigate }                       from "react-router-dom";
import { useEffect, useState }               from "react";
import { getUserById }                       from "../../../utils/services/user-http-utils";
import { getManga, getMangaById, saveManga } from "../../../utils/services/manga-http-utils";
import { UserCard }                          from "../user-card/UserCard";
import { useMemo }                           from "react";

import { getMangaScore,  getUserReadMangaByUserId,  saveUserReadManga } 
                from "../../../utils/services/user-read-manga-http-utils";

export function UserProfile(){

    const params                                        = useParams();
    const navigate                                      = useNavigate();
    const [currentUser, setCurrentUser]                 = useState({});
    const [userMangaCollection, setUserMangaCollection] = useState([]);
    const [selectedCategory, setSelectedCategory]       = useState();
    const [mangaCollection, setMangaCollection] =        useState([]);

    useEffect(() => {
        if (params.id) {
            const promises = [getUserById(params.id), getUserReadMangaByUserId(), getManga()];
            Promise.all(promises)
                .then(result => {
                    setCurrentUser(result[0].data);
                    setUserMangaCollection(result[1].data);
                    setMangaCollection(result[2].data);
                });
        }
    }, [params.id])

    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
      }

    function getFilteredList(){
        if (!selectedCategory) {
            return userMangaCollection;
        }
        console.log(selectedCategory);

        if(selectedCategory === "Low"){
            return userMangaCollection.sort( (a, b) => a.userScore > b.userScore);
        }
        if(selectedCategory === "High"){
            return userMangaCollection.sort( (a, b) => a.userScore < b.userScore);
        }
        

        return userMangaCollection.filter( item => item.readingStatus == selectedCategory);
    }

    var filteredList = useMemo(getFilteredList, [selectedCategory, userMangaCollection]);
    

    const renderTableBody = () => {
            
        return filteredList && filteredList.map(userManga => {

                const updateMangaStatus = ( event ) => {
                    const newStatus = event.target.value;
                    userManga.readingStatus = newStatus

                    saveUserReadManga(userManga, true).then(() => {

                        setUserMangaCollection((prevState) => {
                            const userMangaToUpdate = prevState.find( m => m.id === userManga.id);

                            userMangaToUpdate.readingStatus = newStatus;
                            setUserMangaCollection([...prevState]);
                        })
                    });
                }

                const updateMangaScore = ( event ) => {
                    const newScore = parseInt(event.target.value);
                    userManga.userScore = newScore;

                    saveUserReadManga(userManga, true).then(() => {

                        setUserMangaCollection((prevState) => {
                            const userMangaToUpdate = prevState.find( m => m.id === userManga.id);

                            userMangaToUpdate.userScore = newScore;
                            setUserMangaCollection([...prevState]);
                        })
                    }).then( () => { 
                        let newScore;
                        
                        getMangaScore(userManga.mangaId).then( (response) => {newScore = response });
                        let currentManga;
                        
                        getMangaById(userManga.mangaId).then( (response) => {            
                            currentManga = response.data;
                            currentManga.score = newScore;

                        }).then( () => { saveManga(currentManga).catch( err => {console.log(err)})});
                    });
                }

                const renderActionButton = () => {
                    return <>
                        <td style = {{width : "30%"}}>
                        <Form.Select name="readingStatus" onChange = {updateMangaStatus} 
                                     value = {userManga.readingStatus}>
                            
                            <option value="Reading">Reading</option>
                            <option value="Completed">Completed</option>
                            <option value="PlanToRead">Plan To Read</option>
                            <option value="OnHold">On-Hold</option>
                        </Form.Select>
                        </td>
                        <td>
                        <Form.Select name="userScore" onChange = {updateMangaScore} 
                                     value = {userManga.userScore}>
                            
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Form.Select>
                        </td>

                        <td>
                            <Button variant="primary" type="submit" onClick = {onSubmit}> Submit </Button>
                        </td>
                    </>
                }

                const onFormControlChange = (event) =>{
                    userManga.readingChapters = parseInt(event.target.value);
                }

                const onSubmit = ( event ) => {
                    event.preventDefault();
                    const readingChapter = userManga.readingChapters;
                    const foundManga = mangaCollection.find(m => m.id === userManga.mangaId);
                
                    if(readingChapter >= 0 || readingChapter <= foundManga.chapters){
                        saveUserReadManga(userManga, true).catch(error => {
                            console(error.message);
                        });
                    }    
                }
                
                function renderChapters(  ){
                    
                    const foundManga = mangaCollection.find(m => m.id === userManga.mangaId);
                   
                    return <td>
                            <Form.Control type="number" name="chapters" 
                                style = {{marginLeft: "20%",width : "50%", float: "left"}}
                                onChange={ onFormControlChange } value={userManga.chapters} /> 
                            / {foundManga.chapters }
                    </td>
                }

                const updateNavigator = () => {
                    navigate(`/mangapage/${userManga.mangaId}`);
                }

                return <tr key={userManga.id}>
                     <td><img src = {userManga.photo} 
                              style = {{width : "30%"}}
                              onClick = { updateNavigator } /> </td>
                     <td>{userManga.title}</td>
                        { renderChapters() }
                        { renderActionButton() }     
                 </tr>
        })
    }

    return (

        <div className="user-profile">
            <UserCard user={currentUser}/>
            <div className="filter-container">
                <div style={{float:"left"}}>Filter by Status:
                    <div>
                    <select onChange={handleCategoryChange} >

                        <option value="">All</option>
                        <option value="Reading">Reading</option>
                        <option value="Completed">Completed</option>
                        <option value="PlanToRead">Plan To Read</option>
                        <option value="OnHold">On Hold</option>
                    </select>
                    </div>
                </div>
                <div>Sort by Score:
                    <div>
                        <select onChange={handleCategoryChange} >
                            <option value="Low">Low</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
            </div>
                <Table striped bordered hover style={{width:"60%"}}>
                    <thead>
                        <tr>
                            <td style = {{width : "20%"}}>Cover</td>
                            <td>Title</td>
                            <td style = {{width : "40%"}}>Chapters</td>
                            <td style = {{width : "10%"}}>Status</td>
                            <td style = {{width : "10%"}}>Score</td>
                            <td style = {{width : "10%"}}>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        { renderTableBody() }
                    </tbody>
                </Table>      
        </div>
    );
}