export enum Action {
    DRAW,
    PLAY
}

export interface Card {
    colour: Colour,
    type: Type,
    value: number
}

export enum Colour {
    YELLOW = 'yellow',
    GREEN = 'green',
    BLUE = 'blue',
    RED = 'red'
}

export enum Type {
    NUMBER
}

export interface AITurn {
    action: Action,
    card?: Card
}

export interface AI {
    action(hand : Card[], inPlay : Card) : AITurn,
    name() : string
}