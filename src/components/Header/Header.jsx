

import { Link } from 'react-router-dom';


const Header = () => (
    <header>

        <nav className='d-flex '>
            <div className="logo col-2">logo</div>
            <div className="col-8 ">
                <ul className='d-flex  col nav-underline justify-content'>

                    <Link to='/' className="nav-link">Home</Link>

                    <Link to='/create' className="nav-link">Create</Link>

                </ul>
            </div>
            <div className="button col-2 align-item justify-content" type="button">Sign up</div>
        </nav>


        {/* <Link to='/edit'>Edit</Link> */}

    </header>
);

export default Header;