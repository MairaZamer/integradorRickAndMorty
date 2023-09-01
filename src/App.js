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

const URL_BASE = "https://rym2-production.up.railway.app/api/character"
const API_KEY = "henrym-mairazamer"

const email = "mairazamer@gmail.com";
const password = "abc123";

function App() {
   const location = useLocation();
   const navigate = useNavigate();
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const login = (userData) => {
      if (userData.email === email && userData.password === password) {
         setAccess(true);
         navigate("/home");
      }
   }

   const logout = () => {
      setAccess(false);
      navigate("/");
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   const onSearch = (id) => {
      const repeated = characters.find(character => {
         return character.id == id
      });
      if (!repeated) {
         axios(`${URL_BASE}/${id}?key=${API_KEY}`)
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

   const onRandom = () => {
      const idRandom = Math.floor(Math.random() * (826 - 1)) + 1;

      const repeated = characters.find(character => {
         return character.id == idRandom
      });

      if (!repeated) {
         axios(`${URL_BASE}/${idRandom}?key=${API_KEY}`)
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

      // const finded = characters.find(character => {
      //    return character.id == Number(id)
      // })
      // if (finded) {
      //    removeFav(finded)
      // }

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
