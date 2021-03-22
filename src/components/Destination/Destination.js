import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import data from '../../data/data.json';
import './Destination.css';
import { useForm } from 'react-hook-form';
import { GeoAlt } from 'react-bootstrap-icons';

const Destination = () => {
    const {id} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [ride, setRide] = useState({});

    useEffect(() => {
        setRide(data);
    }, [])
    const vehicles = data.filter(vehicle => vehicle.id === id);
    const {vehicleName, image, person} = vehicles;

    const [location, setLocation] = useState({
        locationConfirmed: false,
        From: '',
        Destination: ''
    });
    const [locationName, setLocationName] = useState({});
    const {errors, register, handleSubmit} = useForm();
    const onSubmit = data => setLocationName(data);

    const searchResult = {
        locationConfirmed: true,
        From: true,
        Destination: true
    }

    const handleBlur = (e) => {
        let locationConfirmed = true;
        if(e.target.name === 'From'){
            location.From = e.target.value;
        }
        if(e.target.name === 'Destination'){
            location.Destination = e.target.value;
        }
        if(locationConfirmed){
            const newLocation = {...location};
            newLocation[e.target.name] = e.target.value;
            setLocation(newLocation);
        }
        console.log('search button clicked');
        e.preventDefault();
    }
    

    return (
        <div className="container d-flex flex-row destination">
            <div className="container d-flex flex-column w-75">
                {location && <div className="border w-50 h-75 m-3 mr-5 p-4 rounded bg-light shadow">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h5>Pick From</h5>
                        <div className="form-group">
                            <input onBlur={handleBlur} type="search" name="From" className="form-control" placeholder="from" ref={register} required />
                            <p>From :{location.from}</p>
                            {errors.from && <span className="text-danger">Start location name is required.</span> }
                        </div>
                        <h5>Pick To</h5>
                        <div className="form-group">
                            <input onBlur={handleBlur} type="search" name="Destination" className="form-control" placeholder="destination" ref={register} required />
                            <p>To :{location.to}</p>
                            {errors.from && <span className="text-danger">Destination location name is required.</span> }
                        </div>
                        <input onClick={() => setLocation(!location)} type="submit" value="search" className="btn btn-primary" />
                    </form> 
                </div>}
                {location && <div style={{border: '1px solid black', width: '300px'}}>
                                <h4 className="my-2"><GeoAlt color="salmon" size={30} />Pick From :{locationName.from}</h4>

                                <h4 className="my-2"><GeoAlt color="salmon" size={30} />Pick To :{locationName.to}</h4>
                            </div>}
                <div>
                    {location && (<div>
                        <div className="d-flex flex-row border w-50 m-3 p-3 destination-vehicle">
                            <img className="image" src={image} alt="" />
                            <p className="name">{vehicleName}</p>
                            <img src={person} alt=""/>
                            <p className="person-count"></p>
                            <p className="money">$67</p>
                        </div>
                        <div className="d-flex flex-row border w-50 m-3 p-3 destination-vehicle">
                            <img className="image" src={image} alt="" />
                            <p className="name">{vehicleName}</p>
                            <img src={person} alt=""/>
                            <p className="person-count"></p>
                            <p className="money">$67</p>
                        </div>
                        <div className="d-flex flex-row border w-50 m-3 p-3 destination-vehicle">
                            <img className="image" src={image} alt="" />
                            <p className="name">{vehicleName}</p>
                            <img src={person} alt=""/>
                            <p className="person-count"></p>
                            <p className="money">$67</p>
                        </div>

                    </div>)
                    }
                </div>
            </div>
            <div className="ml-5">
                <img style={{ width: '100%' }} src={'https://i.ibb.co/3Smfb46/Map.png'} alt="" />
            </div>
        </div>
    );
};

export default Destination;