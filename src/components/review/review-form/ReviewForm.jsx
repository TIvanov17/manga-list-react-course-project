import Form                       from 'react-bootstrap/Form';
import { Button }                 from 'react-bootstrap';
import { useState }               from 'react';
import { useNavigate, useParams } from 'react-router';
import { onFormControl }          from '../../../utils/services/utils';
import { saveReview }             from '../../../utils/services/review-http-utils';

export function ReviewForm( { manga } ){
  
    const emptyReview = {
      userId          : "",
      mangaId         : "",
      opinion         : ""
    }    

    const [currentReview, setCurrentReview]   = useState(emptyReview);
    const [error, setCurrentError]            = useState('');
    const navigate                            = useNavigate();
    const params                              = useParams();
    

    const onFormControlChange = ( event ) => {
      onFormControl(event, setCurrentReview);
    }

    const onSubmit = ( event ) => {
        currentReview.mangaId = manga.id;
        event.preventDefault();
        saveReview( currentReview ).then(() => {
            navigate(`/mangapage/${manga.id}`);
        }).catch(error => {
          setCurrentError(error.message);
      });;
    }

    return (
      <div className="user-form-wrapper">
            <Form className="user-form" onSubmit={ onSubmit }>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Write a Review</Form.Label>
                    <Form.Control type="text" name="opinion" placeholder="Enter Your Opinion" 
                                  onChange={onFormControlChange} value={currentReview.opinion}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
      );
}
