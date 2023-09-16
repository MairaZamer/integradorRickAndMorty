import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";


const Nav = ({ onSearch, onRandom, logout }) => {
    const handleLogOut = () => {
        MediaKeySystemAccess(false);
    }

    return (
        <div className="nav">
            <button className="btnNav">
                <Link className="link" to='/home'>HOME</Link>
            </button>
            <button className="btnNav">
                <Link className="link" to='/about'>ABOUT</Link>
            </button>
            <button className="btnNav">
                <Link className="link" to='/favorites'>FAVORITES</Link>
            </button>
            <button className="btnNav" onClick={onRandom}>
                RANDOM
            </button>

            
            <SearchBar onSearch={onSearch} />
            <button className="btnLogout" onClick={logout}>LOGOUT</button>
        </div>
    )
}

export default Nav;