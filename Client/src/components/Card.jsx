import { Link } from "react-router-dom";
import { addFav, removeFav } from "../Redux/actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import '../styles/styles.css';

function Card(props) {
   const { character, onClose, addFav, removeFav, myFavorites, isMyFavorites } = props;

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
      <div className="card" style={{ background: `url(${character.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
         <div className="wrap">
            <button role="button" className="buttonHeart" onClick={handleFavorite}>{isFav ? "❤️" : "🤍"}</button>
            {!isMyFavorites && <button role="button" className="buttonClose" onClick={() => { onClose(character.id) }}>X</button>}
         </div>

         {/* <img style={{ borderRadius: "50%", padding: "5%" }} width={200} height={200} src={character.image} alt={character.name} /> */}

         <div className="name">
            <Link className="link-card" to={`/detail/${character.id}`}>
               <h2 className="title">{character.name} </h2>
            </Link>
         </div>

         <div className="box-info">
            <span><b>Species:</b> {character.species}</span>
            <span><b>Gender:</b> {character.gender}</span>
         </div>
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
      addFav: function (character) { dispatch(addFav(character)) },
      removeFav: function (id) { dispatch(removeFav(id)) }
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Card);