import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"



const Nav = () => {
    return (
        <nav>
            <div className="nav__logo">
                <img src={logo} alt="logo" />
            </div>
        </nav>
    )
}

export default Nav;