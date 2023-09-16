import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


//const URL_BASE = "https://rickandmortyapi.com/api/character"

const Detail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState({});

    useEffect(() => {
        axios(`http://localhost:3001/rickandmorty/character/${id}`)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                if (data.name) {
                    setCharacter(data);
                } else {
                    window.alert('No hay personajes con ese ID');
                }
            });
        return setCharacter({});
    }, [id]);

    return (
        <div className="card-detail">
            <div className="image-wrapper gradient-border-img">
                <img className="image-detail" width={100} height={100} src={character?.image} />
            </div>
            <div className="text-wrapper">
                <h2>Name: {character?.name}</h2>
                <p><b>Species:</b> {character?.species}</p>
                <p><b>Gender:</b> {character?.gender}</p>
                <p><b>Status:</b> {character?.status}</p>
                <p><b>Origin:</b> {character?.origin?.name} </p>
                <Link to={'/home'} className="link-return"><b className="return-btn">RETURN</b></Link>
            </div>
        </div>
    )
}

export default Detail;