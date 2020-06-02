import React from 'react';

type Props = {
    hand: string;
    select: (hand: string) => void;
    selected: boolean;
}

export const Hand: React.FC<Props> = ({ hand, select, selected }) => {
    const extra = hand.length === 2
        ? 'hand__pair'
        : hand[2] === 's'
            ? 'hand__suited'
            : 'hand__offsuite';
    return (
        <div onClick={() => select(hand)} className={`hand ${extra}${selected ? " hand__selected" : ""}`}>
            {hand}
        </div>
    );
};
