import { Link } from "react-router-dom";

const Nav = () => {
    return ( 
        <nav>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Log in</Link>
        </nav>
     );
}
 
export default Nav;