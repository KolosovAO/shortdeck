import { enumerateAllBoards } from './enumerateAllBoards';
import { compareHands } from './combination';
import { toCombos } from './combos';

export const computeEquity = (hand1: string[], hand2: string[], current_board: string[]) => {
    let win = 0;
    let tie = 0;
    let lose = 0;
    const dead_cards = [...hand1, ...hand2];
    enumerateAllBoards(dead_cards, current_board).forEach((board) => {
        const res = compareHands(hand1, hand2, board);
        if (res === 0) {
            tie++;
        } else if (res === 1) {
            win++;
        } else {
            lose++;
        }
    });

    const total = win + tie + lose;
    return { win, tie, lose, total };
}

export const computeEquityVsSpectre = (hand: string[], spectre: string[], current_board: string[]) => {
    let w = 0;
    let l = 0;
    let t = 0;

    const combos = toCombos(spectre)
        .filter((h) => !hand.includes(h[0]) && !hand.includes(h[1]) && !current_board.includes(h[0]) && !current_board.includes(h[1]));

    return function* () {
        for (const hand2 of combos) {
            const { win, lose, tie } = computeEquity(hand, hand2, current_board);
            w += win;
            l += lose;
            t += tie;

            const total = w + t + l;
            yield { win: w, tie: t, lose: l, total };
        }
    };
};
