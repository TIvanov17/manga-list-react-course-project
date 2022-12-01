import './App.css';
import { Layout } from './components/layout/Layout';
import { Routes, Route } from 'react-router';
import { UserForm } from './components/users/user-form/UserForm';
import { UserList } from './components/users/user-list/UserList';
import { MangaForm } from './components/manga/manga-form/MagnaForm';
import { MangaList } from './components/manga/manga-list/MangaList';
import { Login } from './components/auth/login/Login';
import { Register } from './components/auth/register/Register';
import { NonAuthenticatedRoute } from './utils/guards/NonAuthenticatedRoute';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { UserProfile } from './components/users/user-profile/UserProfile';
import { MangaPage } from './components/manga/manga-page/MangaPage';
import { ReviewForm } from './components/review/review-form/ReviewForm';


function App() {
  
  return (
    <div className="App">
        <Routes>
          
          <Route path = "/login" element = {<NonAuthenticatedRoute><Login/></NonAuthenticatedRoute>} />
          <Route path = "/register" element = {<NonAuthenticatedRoute><Register/></NonAuthenticatedRoute>} />

          <Route path = "/" element = {<AuthenticatedRoute><Layout /></AuthenticatedRoute>}>
            <Route path = "users" element = { <UserList/> } />
            <Route path = "users/create" element = { <UserForm/> } />
            <Route path = "users/edit/:id" element = { <UserForm/> } />
            <Route path = "/profile/:id" element = { <UserProfile/> } />

            <Route path = "manga" element = { <MangaList/> } />
            <Route path = "manga/add" element = { <MangaForm/> } />
            <Route path = "manga/edit/:id" element = { <MangaForm/> } />
            <Route path = "/mangapage/:id" element = { <MangaPage/> } />
            
            <Route path = "/review/write/:id" element = { <ReviewForm/> } />
          </Route>
          
        </Routes>
    </div>
  );
}

export default App;
