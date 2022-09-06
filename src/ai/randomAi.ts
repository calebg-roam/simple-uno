/*
 * Random AI
 * @author Caleb Garratt
 * 
 * This AI takes a random valid card and plays it.
 */
import validate from '../common/validate';
import { Action, Card, AI, AITurn } from '../common/types';

const action = (hand : Card[], inPlay : Card) : AITurn => {
    const validCards = validate.validCards(hand, inPlay);
    if (validCards.length == 0) {
        return { action: Action.DRAW };
    } else {
        return {
            action: Action.PLAY,
            card: validCards[Math.floor(Math.random() * validCards.length)]
        };
    }
}

export const randomAi : AI = {
    action,
    name() {
        return 'Random-AI'
    }
}
