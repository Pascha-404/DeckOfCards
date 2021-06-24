import React, { Component } from 'react'

class Card extends Component{
    
    render() {
        const { image, idx, name, rotating, posX } = this.props;
        return <img src={image} alt={name} style={{ zIndex: idx, transform: `translateX(-${posX}%) rotate(${rotating}deg)` }} />
    }
}

export default Card;