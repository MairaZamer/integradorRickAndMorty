import { Link } from "react-router-dom";
import { addFav, removeFav } from "../Redux/actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import '../styles/styles.css';

function Card(props) {
   const { character, onClose, addFav, removeFav, myFavorites } = props;

   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      if (isFav) {
         setIsFav(false);
         removeFav(character.id)
      } else {
         setIsFav(true);
         addFav(character)
      }
   }

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav?.id === character?.id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (
      <div className="card">
         <div className="wrap">
            <button role="button" className="button" onClick={handleFavorite}>{isFav ? "❤️" : "🤍"}</button>
            <button role="button" className="button" onClick={() => { onClose(character.id) }}>X</button>
         </div>

         <Link className="not-link" to={`/detail/${character.id}`}>
            <h3 className="title">Name: {character.name} </h3>
         </Link>

         <span><b>Species:</b> {character.species}</span>
         <span><b>Gender:</b> {character.gender}</span>
         <img style={{ borderRadius: "10%", padding: "5%" }} width={150} height={150} src={character.image} alt={character.name} />
      </div>
   );
}


const mapStateToProps = (state) => {
   return {
      myFavorites: state.myFavorites
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFav: (character) => { dispatch(addFav(character)) },
      removeFav: (id) => { dispatch(removeFav(id)) }
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Card);