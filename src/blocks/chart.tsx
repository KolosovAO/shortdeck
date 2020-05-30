import React from 'react';
import { Hand } from './hand';

const CARD = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6'];
const CARDS_ROW = CARD.map((c1, i1) => CARD.map((c2, i2) => {
    if (c1 === c2) {
        return c1 + c2;
    }
    if (i2 > i1) {
        return c1 + c2 + 's';
    }

    return c2 + c1 + 'o';
}));

type Props = {
    select: (hand: string) => void;
}

export const Chart: React.FC<Props> = ({ select }) => {
    return (
        <div className='chart'>
            {
                CARDS_ROW.map((row, i) => (
                    <div key={i} className='cards-row'>
                        {row.map((cards, j) => <Hand key={j} select={select} cards={cards} />)}
                    </div>
                ))
            }
        </div>
    );
};