import { Card } from "./types";

const cardsMatch = (card1 : Card, card2 : Card) => card1.colour === card2.colour || card1.value === card2.value;

const validateAction = (hand : Card[], card
     : Card, inPlay : Card) => {
    if (!hand.includes(card)) throw 'Card does not belong to player';
    if (!cardsMatch(card, inPlay)) throw 'Card does not match card in play';
}

const validCards = (hand : Card[], inPlay : Card) => {
    const validCards = [];
    for (const card of hand) {
        if (cardsMatch(card, inPlay)) {
            validCards.push(card);
        }
    }
    return validCards;
}

export default {
    validateAction,
    validCards
}