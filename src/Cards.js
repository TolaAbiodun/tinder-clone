import React, { useState, useEffect } from 'react';
import TinderCard from "react-tinder-card";
import "./Cards.css";
import axios from "./axios"


function Cards() {
    const [profile, setProfile] = useState([]);

    // Grab cards from DB

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get('/tinder/cards');

            setProfile(req.data);
        }
        fetchData(); 
    }, []);


    const swiped = (direction, nameToDelete) => {
        console.log("removing " + nameToDelete);
        // setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
    };

    return (
        <div className='tinderCards'>
            <div className= 'Cards__cardContainer'>
            {profile.map((person) => (
                <TinderCard
                    className='swipe'
                    key={person.name}
                    preventSwipe={['up','down']}
                    onSwipe={(dir) => swiped(dir, person.name)}
                    onCardLeftScreen={() => outOfFrame(person.name)}
                >
                    <div
                    style={{ backgroundImage: `url(${person.imgUrl})`}}
                    className='card'
                    >
                        <h3>{person.name}</h3>
                    </div>
                </TinderCard>
            ))}
            </div>
        </div>
    );
}

export default Cards;
