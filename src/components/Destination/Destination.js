import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import rideData from '../../data/data.json';

const Destination = () => {
    const { id } = useParams();
    const [ride, setRide] = useState({});

    useEffect(() => {
        setRide(rideData);
    }, [])


    const allRide = ride.find(ride => id === ride.id)

    return (
        <div className="container d-flex flex-row">
            <div className="container d-flex flex-column w-75">
                <div className="border w-50 h-75 m-3 mr-5 p-4 rounded bg-light shadow">
                    <h5>Pick From</h5>
                    <div className="form-group">
                        <input type="text" name="email" className="form-control" required />
                    </div>
                    <h5>Pick To</h5>
                    <div className="form-group">
                        <input type="text" name="email" className="form-control" required />
                    </div>
                    <button  className="btn btn-primary">Search</button>
                </div>
                <div>
                    {(<div>
                        <div className="d-flex flex-row border w-50 m-3 p-3">
                            <img className="image" src={ride.image} alt="" />
                            <p className="name">{ride.name}</p>
                            <p className="money">$67</p>
                        </div>
                        <div className="d-flex flex-row border w-50 m-3 p-3">
                            <img className="image" src={ride.image} alt="" />
                            <p className="name">{ride.name}</p>
                            <p className="money">$67</p>
                        </div>
                        <div className="d-flex flex-row border w-50 m-3 p-3">
                            <img className="image" src={ride.image} alt="" />
                            <p className="name">{ride.name}</p>
                            <p className="money">$67</p>
                        </div>

                    </div>)
                    }
                </div>
            </div>
            <div className="ml-5">
                <img style={{width: '100%'}} src={'https://i.ibb.co/3Smfb46/Map.png'} alt=""/>
            </div>
        </div>
    );
};

export default Destination;