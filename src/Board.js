import React, { Component } from 'react'
import axios from "axios"
import "./Board.css"
import Card from "./Card"

class Board extends Component{
    constructor(props) {
        super(props);
        this.state = { deck_id: "", cardsRemaining: 52, cards: [] }
        this.handleClick = this.handleClick.bind(this)
    }

    async getDeck(evt) {
        const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle")
        const data = response.data;
        this.setState(st => ({
            deck_id: data.deck_id,
            cardsRemaining: data.remaining,
            cards: [],
        }))
    }
    
    componentDidMount() {
        this.getDeck()
    }

    async getCard(deckId) {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
        const data = response.data;
        const newCard = {...data.cards[0], rotation: Math.floor(Math.random() * 65 - 30), posX: 60 - Math.floor(Math.random() * 20)}
        this.setState(st => ({
            cardsRemaining: data.remaining,
            cards: [...st.cards, newCard]
        }));
    }

    handleClick(evt) {
        if (this.state.cardsRemaining > 0) {
            this.getCard(this.state.deck_id)    
        } else {
            this.getDeck()
        }
    
    }

    render() {
        const { cards, cardsRemaining } = this.state;
        const gameOver = this.state.cardsRemaining <= 0;
        let btnClasses = "Board-btn "
        if (gameOver) btnClasses += "restart";
        
        return (
            <div className="Board">
                <h1 className="Board-title">&clubs; Dealer of Cards &clubs;</h1>

                <h2 className="Board-data">React-App using the Deck of Cards API</h2>

                <button className={btnClasses} onClick={this.handleClick}>{cardsRemaining > 0 ? "Give me a card!" : "Restart Game"}</button>
                
                <div className="Board-cards">
                    {cards.map((e, idx) => {
                        return <Card image={e.images.png} idx={idx} name={e.suit} key={idx} rotating={e.rotation} posX={e.posX}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Board;