import React from 'react';
import { Card as BootstrapCard, Image } from 'react-bootstrap';
import './PersonCard.css';

const PersonCard = ({ person }) => {
    if (!person) {
        return null; 
    }

    return (
        <BootstrapCard className="person-card">
            <BootstrapCard.Body>
                <Image src={person.imageUrl} className="person-image" />
                <BootstrapCard.Title as="h5" className="person-name">{person.name}</BootstrapCard.Title>
                <BootstrapCard.Text className="person-title">
                    {person.title}
                </BootstrapCard.Text>
            </BootstrapCard.Body>
        </BootstrapCard>
    );
};

export default PersonCard;