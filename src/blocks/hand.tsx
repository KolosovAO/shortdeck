import React from 'react';

type Props = {
    cards: string;
    select: (hand: string) => void;
}

export const Hand: React.FC<Props> = ({ cards, select }) => {
    const extra = cards.length === 2
        ? 'hand-pair'
        : cards[2] === 's'
            ? 'hand-suited'
            : 'hand-offsuite';
    return (
        <div onClick={() => select(cards)} className={`hand ${extra}`}>
            {cards}
        </div>
    );
};
