import React, { Component } from 'react'
import axios from "axios"
import "./Board.css"
import Card from "./Card"

class Board extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Board">
                <h1>&clubs; Dealer of Cards &clubs;</h1>

                <h2>React-App with the Deck of Cards API</h2>

                <button>Give me a card!</button>

                <Card />
            </div>
        )
    }
}

export default Board;