import { useNavigate } from 'react-router-dom';
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleExploreClick = () => {
        const isLoggedIn = localStorage.getItem('authToken');

        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate('/home');
        }
    };

    return (
        <div className='HomePage'>

            <NavbarComponent />
            <div className='background'>
                <div className='quote'>
                    Smart Farming Simplified <br />
                    with Tools, Insights and Support at Your Fingertips
                </div>
                <button className='explore-button' onClick={handleExploreClick}>
                    Explore Now
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
