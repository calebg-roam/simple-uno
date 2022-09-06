# Simple UNO
Hi, welcome to simple UNO. This is an AI battle game where you can write an AI to battle other AI.

## Rules of the game
The game the AI are battling over is a simplified version of UNO. At the moment the rules are as follows:

- There are four colours: Red, Green, Yellow, Blue
- There are 13 numbers: 1 - 13
- There are 52 cards, one for each colour-number combination
- Each player gets dealt seven cards at the beginning of the game
- One card is drawn and placed face up on the discard pile
- On a player's turn they must either choose a card to play or pick up a card
- A player can play a card if it has the same colour or same number as the card currently on the top of the discard pile
- If a player doesn't have a valid card they must pick up a card
- The first player to get rid of all cards in their hand wins

As you can see the game doesn't allow playing more than one card at a time, playing 'pick up 2', 'pick up 4', 'change colour', 'reverse' or any
exciting rules like that yet. Maybe in a later version.

Also the game currently only pits one player against one player.

## How to write an AI
To write an AI is simple. Please create a branch first. Then add your AI code to the `./src/ai` directory. If you need more than one file perhaps you could create a
sub-directory within that.

Look at the examples already there (currently three). All of them are of type `AI`, which you can find in `./src/common/types.ts`. You bascially need a name and a function which returns an `AITurn`. Hopefully the code is pretty self-explanatory here.

Finally, in `app.ts`, import your AI and change this line:

```ts
const playerAis : AI[] = [randomAi, maximiseColours];
```

to use your AI instead.

### Rules around writing an AI
1. You may reference anything in `./src/common/` as well as `./src/logger.ts`. You may *not* reference anything in `./src/game/`.
2. You must not use reflection (is this a thing in js?) to inspect the game state.
3. If you want to log import `debug` from `./src/logger.ts` and use that.

### Testing your AI
If you look in `app.ts` there are two game modes, `roundMode()` and `singleMode()`:
- singleMode has debug logging turned on and is good for you to debug your AI. It will print out what's happening at each step in the game. It only plays one game.
- roundMode has debug logging turned off and plays 10,000 games, and then tallies the score at the end

At the bottom of `app.ts` you will find roundMode enabled and singleMode commented out. Just switch them around to enable one or the other.

