import Card                 from 'react-bootstrap/Card';
import ListGroup            from 'react-bootstrap/ListGroup';
import { ReviewForm }       from '../../review/review-form/ReviewForm';
import { ReviewList }       from '../../review/review-list/ReviewList';

import "./MangaCard.scss";

export function MangaCard({ manga }){

    return(
        <>
        <Card className = "manga-card">
            <Card.Img variant="top" src = {manga.photo} style={{ width: '100%'}}/>
            <Card.Body>
                <Card.Title>
                    {manga.title} - {manga.author}
                </Card.Title>
            </Card.Body>            
            <ListGroup className="list-group-flush">
                <ListGroup.Item> Chapters: {manga.chapters} </ListGroup.Item>
                <ListGroup.Item> Volumes:  {manga.volumes} </ListGroup.Item>
                <ListGroup.Item> Status:   {manga.status} </ListGroup.Item>
                <ListGroup.Item> Score:    {manga.score} </ListGroup.Item>
            </ListGroup>
        </Card>

        <Card>
            <Card.Header as="h5">About { manga.title } </Card.Header>
                <Card.Body>
                    <Card.Title>Summary</Card.Title>
                    <Card.Text>
                        {manga.summary}
                    </Card.Text>
                    
                    <ReviewForm manga = { manga } />

                    <Card.Header as="h5">All Reviews</Card.Header>
                    
                    <ReviewList manga = { manga }/>
                </Card.Body>
        </Card>
        </>
    )
}