import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './components/main_page/MainPage';
import About from './components/about/About';
import TouringBooks from './components/touring_books/TouringBooks';
import Hunt from './components/hunt/Hunt';
import Authors from './components/authors/Authors';
import Places from './components/places/Places';
import Genres from './components/genres/Genres';
import AddGenre from './components/genres/AddGenre';
import EditGenre from './components/genres/EditGenre';
import AddAuthor from './components/authors/AddAuthor';
import EditAuthor from './components/authors/EditAuthor';
import Books from './components/books/Books';
import AddBook from './components/books/AddBook';
import EditBook from './components/books/EditBook';
import LogIn from './components/authentication/LogIn';
import SignUp from './components/authentication/SignUp';

function App() {
  return (
    <>
        <BrowserRouter>
        <Routes>
            <Route path='/' activeClassName='active' element={<MainPage/>}/>
            <Route path='/about' activeClassName='active' element={<About/>}/>
            <Route path='/books' activeClassName='active' element={<Books/>}/>
            <Route path='/books/add' element={<AddBook/>}/>
            <Route path='/books/edit/:id' element={<EditBook/>}/>
            
            <Route path='/touring_books' activeClassName='active' element={<TouringBooks/>}/>
            <Route path='/hunt' activeClassName='active' element={<Hunt/>}/>
            <Route path='/places' activeClassName='active' element={<Places/>}/>
            <Route path='/authors' activeClassName='active' element={<Authors/>}/>
            <Route path='/authors/add' element={<AddAuthor/>}/>
            <Route path='/authors/edit/:id' element={<EditAuthor/>}/>
            <Route path='/genres' activeClassName='active' element={<Genres/>}/>
            <Route path='/genres/add' element={<AddGenre/>}/>
            <Route path='/genres/edit/:id' element={<EditGenre/>}/>
            <Route path='/signup' activeClassName='active' element={<SignUp/>}/>
            <Route path='/login' activeClassName='active' element={<LogIn/>}/>
            
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App