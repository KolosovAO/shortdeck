import React from 'react';

type Props = {
    card: string;
    disabled?: boolean;
    onClick: () => void;
};

export const Card: React.FC<Props> = ({ card, onClick, disabled }) => {
    let className = "card card__suite-" + card[1];
    if (disabled) {
        className += " card__disabled";
    }
    return (
        <div className={className} onClick={disabled ? undefined : onClick}>
            {card}
        </div>
    );
};
