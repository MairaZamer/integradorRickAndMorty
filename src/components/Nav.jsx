import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Nav = ({ onSearch, onRandom, logout }) => {
    const handleLogOut = () => {
        MediaKeySystemAccess(false);
    }

    return (
        <div>
            <button>
                <Link to='/about'> ABOUT </Link>
            </button>
            <button>
                <Link to='/home'> HOME </Link>
            </button>
            <button>
                <Link to='/favorites'> FAVORITES </Link>
            </button>
            <button onClick={onRandom}>
                RANDOM
            </button>

            <button onClick={logout}> LOG OUT </button>
            <SearchBar onSearch={onSearch} />
        </div>
    )
}

export default Nav;