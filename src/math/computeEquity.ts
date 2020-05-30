import { enumerateAllBoards } from './enumerateAllBoards';
import { compareHands } from './combination';

export const computeEquity = (hand1: string, hand2: string) => {
    let win = 0;
    let tie = 0;
    let lose = 0;
    const dead_cards = [hand1.slice(0, 2), hand1.slice(2), hand2.slice(0, 2), hand2.slice(2)];
    enumerateAllBoards(dead_cards).forEach((board) => {
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
    return `win: ${(win / total * 100).toFixed(2)} || tie: ${(tie / total * 100).toFixed(2)}`;
}
