import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#660000" }}>
            <Link className="navbar-brand" to='/'>Flaming Lizard</Link>

            <button
                className="navbar-toggler"
                data-bs-toggle='collapse'
                data-bs-target='#navbarCollapse'
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id='navbarCollapse'>
                <div className="navbar-nav">
                    <Link className="nav-link" to='/'>Home</Link>
                    <Link className="nav-link" to='/addproduct'>Add Dish</Link>
                </div>

                {user ? (
                    <div className="navbar-nav ms-auto">
                        <span className="nav-link">{user.username}</span>
                        <button className="btn btn-dark ms-2" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                ) : (
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link" to='/login'>Login</Link>
                        <Link className="nav-link" to='/signup'>Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;