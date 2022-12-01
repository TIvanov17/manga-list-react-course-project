import Form                                             from 'react-bootstrap/Form';
import Button                                           from 'react-bootstrap/Button';
import { useState, useEffect }                          from 'react';
import { useNavigate, useParams }                       from 'react-router';
import { saveManga, getMangaById }                      from '../../../utils/services/manga-http-utils';
import { onFormControl, navigateController, effect }    from '../../../utils/services/utils';

import "./MangaForm.scss";

export function MangaForm(){

    const emptyManga = {
        title       : '',
        author      : '',
        chapters    : 0,
        volumes     : 0,
        readers     : 0,
        genres      : '',
        summary     : '',
        status      : '',
        published   : '',
        score       : 0,
        photo       : ''
    };

    const [currentManga, setCurrentManga]   = useState(emptyManga);
    const navigate                          = useNavigate();
    const params                            = useParams();

    useEffect( () => {
        effect(params.id, getMangaById, setCurrentManga, emptyManga);
    }, [params.id]);

    const onFormControlChange = ( event ) => {
        onFormControl(event, setCurrentManga);
    }

    const onSubmit = ( event ) => {
        event.preventDefault();
        saveManga(currentManga).then(() => {
            navigate(`/manga`);
        });
    }

    return (
        <div className="user-form-wrapper">
           
           { navigateController() }

            <Form className="manga-form" onSubmit={ onSubmit } >
                
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Enter Title" 
                                  onChange={onFormControlChange} value={currentManga.title}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" name="author" placeholder="Enter Author" 
                                  onChange={onFormControlChange} value = {currentManga.author} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Chapters</Form.Label>
                    <Form.Control type="number" name="chapters" placeholder="Chapters"
                                  onChange={onFormControlChange} value={currentManga.chapters}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Volumes</Form.Label>
                    <Form.Control type="number" name="volumes" placeholder="Volumes"
                                  onChange={onFormControlChange} value={currentManga.volumes}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Genres</Form.Label>
                    <Form.Control type="text" name="genres" placeholder="Enter Genres" 
                                  onChange={onFormControlChange} value={currentManga.genres} required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                                  type="text" name="summary" placeholder="Enter Summary"  
                                  onChange={onFormControlChange} value={currentManga.summary} required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control type="text" name="status" placeholder="Status" 
                                  onChange={onFormControlChange} value={currentManga.status} required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Published At</Form.Label>
                    <Form.Control type="text" name="published" placeholder="Published At" 
                                  onChange={onFormControlChange} value={currentManga.published}/>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Score</Form.Label>
                    <Form.Control type="number" name="score" placeholder="Score" 
                                  onChange={onFormControlChange} value={currentManga.score}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type="text" name="photo" placeholder="Enter photo" 
                                  onChange={onFormControlChange} value={currentManga.photo}/>
                </Form.Group>

                <Button variant="primary" type="submit"> Add a Manga </Button>
            </Form>
        </div>
    );
}