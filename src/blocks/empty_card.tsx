import React from 'react';

type Props = {
    onClick: () => void;
};

export const EmptyCard: React.FC<Props> = ({ onClick }) => {
    return (
        <div className="card card__empty" onClick={onClick}>
            #
        </div>
    );
};
