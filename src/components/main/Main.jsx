import './Main.scss';
import { Outlet } from 'react-router';
import { MangaList } from '../manga/manga-list/MangaList';
import { UserList } from '../users/user-list/UserList';
import { ReviewList } from '../review/review-list/ReviewList';

export function Main(){
    return(
        <div className="main-content">
            <Outlet />
        </div>
    )
}