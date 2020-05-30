import { enumerateAllBoards } from './enumerateAllBoards';
import { compareHands } from './combination';

export const computeEquity = (hand1: string[], hand2: string[], current_board: string[] = []) => {
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
