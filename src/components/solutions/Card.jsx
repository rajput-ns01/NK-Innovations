// Card.js

import React from 'react';
import './solutions.css';


const Card = ({ imgSrc, altText, title, subtitle, whoFor, whatFor, included, payment }) => {
    return (
        <div className="card">
            <img src={imgSrc} alt={altText} />
            <h3>{title}</h3>
            <h4>{subtitle}</h4>
            <p><strong>Who’s it for?</strong></p>
            <p>{whoFor}</p>
            <p><strong>What are you looking for?</strong></p>
            <p>{whatFor}</p>
            <p><strong>What’s included?</strong></p>
            <ul>
                {included.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <p><strong>What do you pay?</strong></p>
            <p>{payment}</p>
        </div>
    );
};

export default Card;
