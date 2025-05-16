import { Link } from "react-router-dom"
import "./Nav.scss"



const Nav = () => {
    return (
        <nav className="nav">
            <Link to="/" className="nav__logo" style={{textAlign: "center"}}>
                {/* <img src={logo} alt="logo" /> */}
                <span>404 Weekend not found</span>
            </Link>
        </nav>
    )
}

export default Nav;