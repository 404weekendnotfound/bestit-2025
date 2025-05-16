import { Link } from "react-router-dom"



const Nav = () => {
    return (
        <nav>
            <Link to="/" className="nav__logo" style={{textAlign: "center"}}>
                {/* <img src={logo} alt="logo" /> */}
                <h2>404 Weekend not found</h2>
            </Link>
        </nav>
    )
}

export default Nav;