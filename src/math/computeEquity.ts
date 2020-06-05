import { enumerateAllBoards } from './enumerateAllBoards';
import { compareHands } from './combination';
import { toCombos } from './combos';

const prettifyBalance = (balance: number[]) => {
    const e = balance.reduce((res, val) => res - val, 100) / balance.length;

    return balance.map((val) => Number((val + e).toFixed(2)));
}

const computeWinsAndTotal = (hands: [string, string][], current_board: string[]) => {
    const dead_cards = hands.flat();
    const wins = Array(hands.length).fill(0);
    let total = 0;
    enumerateAllBoards(dead_cards, current_board).forEach((board) => {
        total += 1;
        const winners = compareHands(hands, board);

        winners.forEach((winner) => {
            wins[winner] += 1 / winners.length;
        });
    });

    return {
        wins,
        total
    };
}

export const computeEquity = (hands: [string, string][], current_board: string[]) => {
    const { wins, total } = computeWinsAndTotal(hands, current_board);
    const raw_winners = wins.map((count) => Number((count / total * 100).toFixed(2)));

    return prettifyBalance(raw_winners);
}

export const computeEquityVsSpectre = (hands: [string, string][], spectre: string[], current_board: string[]) => {
    const dead_cards = hands.flat().concat(current_board);
    const combos = toCombos(spectre).filter((h) => !dead_cards.includes(h[0]) && !dead_cards.includes(h[1]));

    return function* () {
        let w = Array(hands.length + 1).fill(0);
        let t = 0;

        for (const current_hand of combos) {
            const { wins, total } = computeWinsAndTotal([...hands, current_hand], current_board);
            console.log(wins, total);
            w = w.map((count, index) => count + wins[index]);
            t = t + total;

            const raw_winners = w.map((count) => Number((count / t * 100).toFixed(2)));
            yield prettifyBalance(raw_winners);
        }
    };
};
