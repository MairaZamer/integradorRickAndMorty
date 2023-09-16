import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "./action-types"

const incialState = {
    myFavorites: [],
    allCharactersFav: []
}

const reducer = (state = incialState, { type, payload }) => {
    switch( type ){

        case ADD_FAV:
            return {
                ...state,
                myFavorites: payload,
                allCharactersFav: payload
            }

        case REMOVE_FAV:
            return {
                ...state,
                myFavorites: payload
            }

        case FILTER:
            let allCharactersFiltered = [];
            if (payload === 'All') {
                allCharactersFiltered = state.allCharactersFav;
            } else {
                allCharactersFiltered = state.allCharactersFav.filter(character => character.gender === payload);
            }

            return {
                ...state,
                myFavorites: allCharactersFiltered
            }

        case ORDER:
            const allCharactersFavCopy = [...state.allCharactersFav]
            return {
                ...state,
                myFavorites:
                    payload === "A"
                        ? allCharactersFavCopy.sort((a, b) => a.id - b.id)
                        : allCharactersFavCopy.sort((a, b) => b.id - a.id)
            }

        default:
            return { ...state }
    }
}

export default reducer