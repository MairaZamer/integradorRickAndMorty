import Card from "./Card";
import { connect, useDispatch } from "react-redux";
import '../styles/styles.css';
import { filterCards, orderCards } from "../Redux/actions";
import { useState } from "react";


const Favorites = ({ myFavorites }) => {
    const [aux, setAux] = useState(false);

    const dispatch = useDispatch();

    const handleOrder = (event) => {
        setAux(!aux);
        dispatch(orderCards(event.target.value))
    }

    const handleFilter = (event) => {
        dispatch(filterCards(event.target.value))
    }

    return (
        <>
            <div style={{background: "black"}}>
                <select style={{margin: "1%"}} onChange={handleOrder}>
                    <option value={"A"}>Ascendente</option>
                    <option value={"B"}>Descendente</option>
                </select>
                <select style={{margin: "1%"}} onChange={handleFilter}>
                    <option value={"All"}>Todos</option>
                    <option value={"Male"}>Masculino</option>
                    <option value={"Female"}>Femenino</option>
                    <option value={"Genderless"}>Sin genero</option>
                    <option value={"unknown"}>Desconocido</option>
                </select>
            </div>
            <div className='wrapper'>
                {
                    myFavorites?.map(fav => {
                        return (

                            <div key={fav.id} className='box'>
                                <Card
                                    character={fav}
                                    isMyFavorites={true}
                                />
                            </div>

                        )
                    })
                }
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        myFavorites: state.myFavorites
    }
}

export default connect(
    mapStateToProps,
    null
)(Favorites);