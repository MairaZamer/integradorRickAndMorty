import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


const URL_BASE = "https://rym2-production.up.railway.app/api/character"
const API_KEY = "henrym-mairazamer"

const Detail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState({});

    useEffect(() => {
        axios(`${URL_BASE}/${id}?key=${API_KEY}`)
            .then(response => response.data)
            .then((data) => {
                if (data.name) {
                    console.log(data)
                    setCharacter(data);
                } else {
                    window.alert('No hay personajes con ese ID');
                }
            });
        return setCharacter({});
    }, [id]);

    return (
        <div style={{ padding: "1%" }}>
            <img src={character?.image} />
            <h2>Name: {character?.name}</h2>
            <p><b>Species:</b> {character?.species}</p>
            <p><b>Gender:</b> {character?.gender}</p>
            <p><b>Location:</b> {character?.location?.name}</p>
            <p><b>Type:</b> {character?.type}</p>
            <p><b>Status:</b> {character?.status}</p>
            <p><b>Episodes:</b> {character?.episode?.join()}</p>
        </div>
    )
}

export default Detail;