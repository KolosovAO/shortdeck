import React from 'react';
import { Card } from './card';

type Props = {
    selected: string[];
    selectCard: (card: string) => void;
};

const ALL_CARDS = ['c', 's', 'h', 'd'].reduce<string[]>((acc, suite) => {
    '6789TJQKA'.split('').reverse().forEach((card) => {
        acc.push(card + suite);
    });
    return acc;
}, []);

export const CardList: React.FC<Props> = ({ selectCard, selected }) => {
    return (
        <div className="card-list">
            {
                ALL_CARDS.map((card, i) =>
                    <Card key={i} card={card} onClick={() => selectCard(card)} disabled={selected.includes(card)} />
                )
            }
        </div>
    );
};
