import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg px-4" style={{fontFamily:'Libre Franklin'}}>
                <Link className="navbar-brand " style={{ color: 'white', fontWeight: 'bold' }} to="/">MetroApp</Link>
                <button className="navbar-toggler navbar-dark px-2" style={{borderColor:'white'}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active" >
                            <Link className="nav-link" style={{ color: 'white', textAlign:'left' }} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={{ color: 'white', textAlign:'left' }} to="/about">About</Link>
                        </li>
                    </ul>
                </div>
            </nav>


        </>
    )
}

