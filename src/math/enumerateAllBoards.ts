const ALL_CARDS = '6789TJQKA'.split('').reduce<string[]>((acc, card) => {
    ['c', 's', 'h', 'd'].forEach((suite) => {
        acc.push(card + suite);
    });
    return acc;
}, []);

export const enumerateAllBoards = (dead_cards: string[], board: string[] = []): string[][] => {
    if (board.length === 5) {
        return [board];
    }
    const available_cards = ALL_CARDS.filter((card) => !board.includes(card) && !dead_cards.includes(card));
    const progress: string[][] = [board];
    const result: string[][] = [];
    while (available_cards.length) {
        const next_card = available_cards.pop()!;
        progress.forEach((cards) => {
            if (cards.length === 4) {
                result.push(cards.concat(next_card));
            } else {
                if (cards.length + available_cards.length > 3) {
                    progress.push(cards.concat(next_card));
                }
            }
        });
    }
    return result;
};
