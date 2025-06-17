import React from 'react';
import { Card as BootstrapCard, Image } from 'react-bootstrap';

const PersonCard = ({ person }) => {
    const styles = {
        personCard: {
            border: 'none',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            height: '100%',
        },
        cardBody: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: '20px'
        },
        personImage: {
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '1.25rem',
            border: '4px solid #EFF6FF'
        },
        personName: {
            fontWeight: 'bold',
            fontSize: '1.25rem',
            color: '#1F2937',
            margin: 0,
        },
        personTitle: {
            color: '#3B82F6',
            fontWeight: '600',
        },
    };

    return (
        <BootstrapCard style={styles.personCard}>
            <BootstrapCard.Body style={styles.cardBody}>
                <Image src={person.imageUrl} style={styles.personImage} />
                <BootstrapCard.Title style={styles.personName}>{person.name}</BootstrapCard.Title>
                <BootstrapCard.Text style={styles.personTitle}>
                    {person.title}
                </BootstrapCard.Text>
            </BootstrapCard.Body>
        </BootstrapCard>
    );
};

export default PersonCard;