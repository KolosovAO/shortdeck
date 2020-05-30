const ALL_CARDS = '6789TJKQA'.split('').reduce<string[]>((acc, card) => {
    ['c', 's', 'h', 'd'].forEach((suite) => {
        acc.push(card + suite);
    });
    return acc;
}, []);

export const enumerateAllBoards = (dead_cards: string[]): string[][] => {
    const available_cards = ALL_CARDS.filter((card) => !dead_cards.includes(card));

    const progress: string[][] = [[]];
    const result: string[][] = [];
    while (available_cards.length) {
        const next_card = available_cards.pop()!;
        progress.forEach((cards) => {
            if (cards.length === 4) {
                result.push(cards.concat(next_card));
            } else {
                progress.push(cards.concat(next_card));
            }
        });
        progress.push([next_card]);
    }
    return result;
};
