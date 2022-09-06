import { pack } from './cards';
import { Card } from "../common/types";
import discardPile from './discardPile';

let deck : Card[] = pack;

const init = () => {
    deck = pack;
}

const shuffle = () => {
    deck = deck
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
}

const draw = (amount : number) : Card[] => {
    // console.log("s: " + deck.length);
    if (deck.length < amount) {
        const unused = discardPile.getUnused();
        for (let i = 0; i < unused.length; i++) {
            deck.push(unused[i]);
        }
        shuffle();
        // console.log("ERROR deck too small");
    }

    const drawn = [];
    for (let iter = 0; iter < amount; iter++) {
        const card = deck.splice(0, 1);
        drawn.push(card[0]);
    }
    // console.log("s: " + deck.length);
    return drawn;
}

export default {
    init,
    deck: () => deck,
    shuffle,
    draw
}