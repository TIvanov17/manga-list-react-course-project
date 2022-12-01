import Card                     from 'react-bootstrap/Card';
import ListGroup                from 'react-bootstrap/ListGroup';
import { useEffect, useState }  from "react";
import { getReview }            from "../../../utils/services/review-http-utils";
import { getUsers }             from "../../../utils/services/user-http-utils"

export function ReviewList( {manga} ){

    const [reviewsCollection, setReviewsCollection] = useState([]);
    const [userCollection, setUsersCollection] = useState();

    useEffect(() => {
            const promises = [getUsers(), getReview()];
            Promise.all(promises)
                .then(result => {
                    setUsersCollection(result[0].data);
                    setReviewsCollection(result[1].data);
                });
    }, [])

    return(
        <div className="users-list" style={{ display: 'flex' }}>
        { reviewsCollection.filter( currentReview => currentReview.mangaId === manga.id)
            .map( (currentReview) => {
            
           const getUser = () => {
                const currentUser = userCollection.filter(user => user.id === currentReview.userId)[0];
                return <>
                    <img src = {currentUser.photo} style={{ width: '20%', float:"left" }}/>
                    <ListGroup.Item>{currentUser.username} </ListGroup.Item>
                </>
            }

            return <Card key = {currentReview.id}>
             <Card.Header>{getUser()}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                        {' '}
                            {currentReview.opinion}{' '}
                        </p>
                        <footer className="blockquote-footer">
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
            }         
        )}
        </div>
    )
}