import React from 'react';

type Props = {
    onClick: () => void;
    selected: boolean;
};

export const EmptyCard: React.FC<Props> = ({ onClick, selected }) => {
    let className = "card card__empty";
    if (selected) {
        className += " card__selected";
    }
    return (
        <div className={className} onClick={onClick} />
    );
};
