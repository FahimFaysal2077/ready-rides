import React, { useEffect, useState } from 'react';
import vehicleData from '../../fakeData/data.json';
import backgroundImage from '../../images/Bg.png';
import Vehicle from '../Vehicle/Vehicle';
import './Home.css';

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    
    useEffect(() => {
        setVehicles(vehicleData);
        console.log(vehicleData);
    }, [])
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})` }} className="home">
            <div className="container">
                <div className="row">
                    {
                        vehicles.map(vehicle => <Vehicle vehicle={vehicle}></Vehicle>)
                    }
                </div>
            </div>    
        </div>
        
        
    );
};

export default Home;