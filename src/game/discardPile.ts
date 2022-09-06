import { Card } from '../common/types';

let discardPile : Card[] = [];

const init = () => {
    discardPile = [];
}

const place = (card : Card) => {
    discardPile = discardPile.concat(card);
}

const inPlay = () : Card => {
    return discardPile[discardPile.length - 1];
}

const getUnused = () : Card[] => {
    return discardPile.splice(0, discardPile.length - 1);
}

export default {
    init,
    discardPile: () => discardPile,
    place,
    inPlay,
    getUnused
}