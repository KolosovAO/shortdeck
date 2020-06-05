import React from 'react';
import { Hand } from './hand';

const CARD = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6'];
const CARDS_ROW = CARD.map((c1, i1) => CARD.map((c2, i2) => {
    if (c1 === c2) {
        return c1 + c2;
    }
    if (i1 > i2) {
        return c2 + c1 + 's';
    }

    return c1 + c2 + 'o';
}));


type Props = {
    selectHands: (hands: string[]) => void;
    current_hands: string[];
}

export const Spectre: React.FC<Props> = ({ selectHands, current_hands }) => {
    const select = (hand: string) => {
        if (current_hands.includes(hand)) {
            selectHands(current_hands.filter((card) => card !== hand));
        } else {
            selectHands(current_hands.concat(hand));
        }
    };

    return (
        <div className="spectre">
            {
                CARDS_ROW.map((row, i) => (
                    <div key={i} className="spectre__row">
                        {row.map((hand, j) => <Hand key={j} selected={current_hands.includes(hand)} select={select} hand={hand} />)}
                    </div>
                ))
            }
        </div>
    );
};