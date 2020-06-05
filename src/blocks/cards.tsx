import React from 'react';
import { Card } from './card';
import { EmptyCard } from './empty_card';

type Props = {
    className: string;
    cards: Array<string | undefined>;
    selectCard: (index: number) => void;
    selected: number;
};

export const Cards: React.FC<Props> = ({ cards, selectCard, className, selected }) => {
    return (
        <div className={className}>
            {
                cards.map((card, i) => card
                    ? <Card key={i} card={card} onClick={() => selectCard(i)} />
                    : <EmptyCard selected={i === selected} key={i} onClick={() => selectCard(i)} />
                )
            }
        </div>
    )
};
