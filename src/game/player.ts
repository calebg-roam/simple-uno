import discardPile from './discardPile';
import validate from '../common/validate';
import deck from './deck';
import prettyPrint from '../common/prettyPrint';
import { debug } from '../logger';

import { Action, Card, AI, AITurn } from '../common/types';

export interface Player {
    hand: Card[],
    ai : AI
}

let players : Player[] = [];

const init = () => {
    players = [];
}

const createPlayer = (ai : AI) => {
    players.push({
        hand: [],
        ai
    });
}

export default {
    init,
    players : () => players,
    player: (index : number) => players[index],
    createPlayer,
    giveCards(index : number, cards : Card[]) {
        players[index].hand = players[index].hand.concat(cards);
    },
    turn(index: number) {
        const turn : AITurn = players[index].ai.action(players[index].hand, discardPile.inPlay());
        if (turn.action === Action.DRAW) {
            const drawCard = deck.draw(1)[0];
            debug("Draw card: " + prettyPrint.printCard(drawCard));
            this.giveCards(index, drawCard);
        }  else {
            validate.validateAction(players[index].hand, turn.card, discardPile.inPlay());
            players[index].hand.splice(players[index].hand.indexOf(turn.card), 1);
            debug("Play: " + prettyPrint.printCard(turn.card));
            discardPile.place(turn.card);
        }
    }
}