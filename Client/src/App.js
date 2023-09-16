import './App.css';
import Cards from './components/Cards.jsx';
import Nav from './components/Nav';
import About from './components/About';
import Detail from './components/Detail';
import Form from './components/Form';
import Favorites from './components/Favorites';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { addFav, removeFav } from './Redux/actions';
import Error from './components/Error';


const URL_BASE = "https://rickandmortyapi.com/api/character"

const email = "mairazamer@gmail.com";
const password = "abc123";

function App() {
   
   const location = useLocation();
   const navigate = useNavigate();
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const URL = 'http://localhost:3001/rickandmorty/login/';

   const login = async (userData) => {
      try {
         const { email, password } = userData;
         const { data } = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = data;

         setAccess(access);
         access && navigate('/home');

      } catch (error) {
         console.log(error.message)
      }
   }

   const logout = () => {
      setAccess(false);
      navigate("/");
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   const onSearch = async (id) => {
      try {
         const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`);

         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         };

      } catch (error) {
         alert('¡No hay personajes con este ID!');
      }
   }

   const onClose = (id) => {
      const charactersFiltered = characters.filter(character => character.id !== id)
      setCharacters(charactersFiltered)
   }
   const onRandom = () => {
      const idRandom = Math.floor(Math.random() * (826 - 1)) + 1;

      const repeated = characters.find(character => {
         return character.id == idRandom
      });

      if (!repeated) {
         axios(`${URL_BASE}/${idRandom}`)
            .then(response => response.data)
            .then((data) => {
               if (data.name) {
                  setCharacters((oldChars) => [...oldChars, data]);
               } else {
                  window.alert('¡No hay personajes con este ID!');
               }
            });
      } else {
         window.alert('¡El personaje ya está en el listado!');
      }
   }

   const closeHandler = (id) => {
      const charactersFiltered = characters.filter(character => character.id !== Number(id))
      setCharacters(charactersFiltered);
   }

   return (
      <div className='App'>
         {
            location.pathname !== "/"
               ? <Nav onSearch={onSearch} onRandom={onRandom} logout={logout} />
               : null
         }

         <Routes>
            <Route path="/" element={<Form login={login} />} />
            <Route path='/home' element={<Cards characters={characters} onClose={closeHandler} addFav={addFav} removeFav={removeFav} />} />
            <Route path='/about' element={<About />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<Error />} />
         </Routes>

      </div>
   );
}

export default App;
