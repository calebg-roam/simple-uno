/*
 * Maximise Colours AI
 * @author Caleb Garratt
 * 
 * This AI find the valid card with the most of the same colour in the hand. The idea is to leave as many colours as
 * possible in the hand.
 */
import validate from '../common/validate';
import { Action, Card, AI, Colour, AITurn } from '../common/types';
import prettyPrint from '../common/prettyPrint';
import { debug } from '../logger';

const PRELOG = "[MC] ";

const action = (hand : Card[], inPlay : Card) : AITurn => {
    const validCards = validate.validCards(hand, inPlay);
    if (validCards.length == 0) {
        return { action: Action.DRAW };
    } else {

        debug(PRELOG + "-- Maximise Colours --");
        debug(PRELOG + prettyPrint.printCards(validCards));

        const countsInHand = {};

        if (validCards.some(card => card.colour === Colour.YELLOW)) {
            countsInHand[Colour.YELLOW] = hand.filter(card => card.colour === Colour.YELLOW).length;
        }
        if (validCards.some(card => card.colour === Colour.BLUE)) {
            countsInHand[Colour.BLUE] = hand.filter(card => card.colour === Colour.BLUE).length;
        }
        if (validCards.some(card => card.colour === Colour.RED)) {
            countsInHand[Colour.RED] = hand.filter(card => card.colour === Colour.RED).length;
        }
        if (validCards.some(card => card.colour === Colour.GREEN)) {
            countsInHand[Colour.GREEN] = hand.filter(card => card.colour === Colour.GREEN).length;
        }

        debug(PRELOG + "counts in hand: ");
        debug(countsInHand);

        const colours = Object.keys(countsInHand);
        debug(PRELOG + "colours: " + colours);
        let chooseColour = colours[0];
        colours.forEach(colour => {
            if (countsInHand[colour] > countsInHand[chooseColour]) {
                chooseColour = colour;
            }
        });
        debug(PRELOG + "choose colour: " + chooseColour);

        const card = validCards.find(card => card.colour === chooseColour);
        debug(PRELOG + "Card: " + prettyPrint.printCard(card));
        return { action: Action.PLAY, card: card };
    }
}

export const maximiseColours : AI = {
    action,
    name() {
        return 'Maximise-Colours'
    }
}
