import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './Vehicle.css';

const Vehicle = (props) => {
    const {image, vehicleName, id} = props.vehicle;
    const history = useHistory();

    const handleClick = (id) => {
        const url = `/vehicle/${id}`;
        history.push(url);
    }
    return (
        <div className="row col-md-3 vehicle-card p-4">
            <Card onClick={() => handleClick(id)}  className="p-4">
            <Card.Img variant="top" src={image} />
                <Card.Body>
                    <div  className="text-center">
                        <Card.Title>{vehicleName}</Card.Title>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Vehicle;