import React from 'react';

type Props = {
    card: string;
    disabled?: boolean;
    onClick: () => void;
};

const SUITE_TO_SYMBOL_MAP: Record<string, string> = {
    d: "♦",
    h: "♥",
    s: "♠",
    c: "♣",
};

export const Card: React.FC<Props> = ({ card, onClick, disabled }) => {
    let className = "card card__suite-" + card[1];
    if (disabled) {
        className += " card__disabled";
    }

    return (
        <div className={className} onClick={disabled ? undefined : onClick}>
            <div className="card__top">{card[0]}</div>
            <div className="card__bottom">{SUITE_TO_SYMBOL_MAP[card[1]]}</div>
        </div>
    );
};
