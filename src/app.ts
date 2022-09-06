import { infoLogging, info } from './logger';
import { playGame } from './game/game';
import { firstPossible } from './ai/firstPossible';
import { randomAi } from './ai/randomAi';
import { maximiseColours } from './ai/maximiseColours';

import { AI } from './common/types';

const roundMode = () => {
    infoLogging();

    let player1Score = 0;
    let player2Score = 0;

    const playerAis : AI[] = [randomAi, maximiseColours];

    for (let i = 0; i < 10000; i++) {
        const startPlayer = i % 2;
        const winner = playGame(startPlayer, playerAis);
        if (winner === 0) player1Score++;
        if (winner === 1) player2Score++;
    }

    const p1percent = Math.round(player1Score * 2 / 100);
    const p2percent = Math.round(player2Score * 2 / 100);

    info("-- Score --");
    info(`Player 1 (${playerAis[0].name()}) : ${p1percent}%`);
    info(`Player 2 (${playerAis[1].name()}) : ${p2percent}%`);
}

const singleMode = () => {
    const playerAis : AI[] = [firstPossible, maximiseColours];
    const winner = playGame(0, playerAis);
    info("Winner: " + winner);
}

roundMode();
// singleMode();
