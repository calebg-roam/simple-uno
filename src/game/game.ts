import players from './player';
import deck from './deck';
import discardPile from './discardPile';
import prettyPrint from '../common/prettyPrint';
import { debug } from '../logger';
import { AI } from '../common/types';

export const playGame = (startPlayer : number, playerAis : AI[]) : number => {
    debug("Shuffle pack");
    deck.init();
    deck.shuffle();
    debug(deck.deck);

    debug("Create players");
    players.init();
    players.createPlayer(playerAis[0]);
    players.createPlayer(playerAis[1]);

    debug("Draw seven cards");
    players.giveCards(0, deck.draw(7));
    players.giveCards(1, deck.draw(7));
    debug("player1 " + prettyPrint.printCards(players.player(0).hand));
    debug("player2 " + prettyPrint.printCards(players.player(1).hand));

    debug("Set up discard pile"); 
    discardPile.init();
    discardPile.place(deck.draw(1)[0]);

    debug("Resulting deck");

    const playerTurn = (index) => {
        debug(`---- Player ${index + 1}'s turn`);
        debug(`Discard pile: ${prettyPrint.printCard(discardPile.inPlay())}`);
        debug(`player${index + 1}'s hand: ${prettyPrint.printCards(players.player(index).hand)}`);
        players.turn(index);
    }

    let playerWon = false;

    let playerTurnIndex = startPlayer;

    while (!playerWon) {

        playerTurn(playerTurnIndex);
        if (players.player(playerTurnIndex).hand.length == 0) {
            playerWon = true;
            debug(`player ${playerTurnIndex + 1} won`);
            return playerTurnIndex;
        }
        playerTurnIndex++;
        if (playerTurnIndex > 1) playerTurnIndex = 0;    
    }
}