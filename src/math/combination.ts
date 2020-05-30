type Suit = 'c' | 's' | 'd' | 'h';
type CardValue = 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
type Card = { value: CardValue; suit: Suit; };

enum Combination {
    ROYAL_FLUSH,
    STRAIGHT_FLUSH,
    FOUR_OF_A_KIND,
    FLUSH,
    FULL_HOUSE,
    STRAIGHT,
    THREE_OF_A_KIND,
    TWO_PAIRS,
    ONE_PAIR,
    HIGH_HAND,
};

type FullCombination = {
    combination: Combination;
    kicker: CardValue[];
}

const getStraightHead = (values: CardValue[]): CardValue | undefined => {
    let last = 0;
    let count = 1;
    for (const value of values) {
        if (last - 1 === value) {
            count++;
            if (count === 5) {
                return value + 4 as CardValue;
            }
        } else if (last !== value) {
            count = 1;
        }
        last = value;
    }
}

const mapping: Record<string, CardValue> = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
};

const getKickers = (kickers: CardValue[], exclude: CardValue[]): CardValue[] => {
    return kickers.filter((value) => !exclude.includes(value));
}

const createCard = (str: string): Card => ({ value: mapping[str[0]], suit: str[1] as Suit });

const computeCombination = (hand: string[], board: string[]): FullCombination => {
    const cards = [
        ...board.map(createCard),
        ...hand.map(createCard)
    ].sort((a, b) => b.value - a.value);
    const kickers = cards.map((card) => card.value);
    const suite: Record<Suit, CardValue[]> = { s: [], c: [], d: [], h: [] };
    const values: Partial<Record<CardValue, number>> = {};

    for (const { suit, value } of cards) {
        suite[suit].push(value);
        values[value] = (values[value] || 0) + 1;
    }

    let flush_cards: CardValue[] | undefined = undefined;
    for (const suite_values of Object.values(suite)) {
        if (suite_values.length > 4) {
            flush_cards = suite_values;
            break;
        }
    }

    if (flush_cards) {
        const straight_head = getStraightHead(flush_cards);
        if (straight_head) {
            if (straight_head === 14) {
                return {
                    combination: Combination.ROYAL_FLUSH,
                    kicker: [],
                };
            }
            return {
                combination: Combination.STRAIGHT_FLUSH,
                kicker: [straight_head],
            };
        }
    }

    const sets: CardValue[] = [];
    const pairs: CardValue[] = [];

    for (const key in values) {
        const value = Number(key) as CardValue;
        const count = values[value];
        if (count === 4) {
            return {
                combination: Combination.FOUR_OF_A_KIND,
                kicker: [value, getKickers(kickers, [value])[0]],
            }
        }
        if (count === 3) {
            sets.push(value);
        }
        if (count === 2) {
            pairs.push(value);
        }
    }

    if (flush_cards) {
        return {
            combination: Combination.FLUSH,
            kicker: flush_cards.slice(-5),
        };
    }

    if (sets.length === 2) {
        return {
            combination: Combination.FULL_HOUSE,
            kicker: [sets[1], sets[0]],
        };
    }

    if (sets.length && pairs.length) {
        return {
            combination: Combination.FULL_HOUSE,
            kicker: [sets[0], pairs[pairs.length - 1]],
        };
    }

    const straight_head = getStraightHead(kickers);
    if (straight_head) {
        return {
            combination: Combination.STRAIGHT,
            kicker: [straight_head],
        };
    }

    if (sets.length) {
        return {
            combination: Combination.THREE_OF_A_KIND,
            kicker: [sets[0], ...getKickers(kickers, sets).slice(0, 2)],
        };
    }

    if (pairs.length > 1) {
        const best_pairs = pairs.slice(-2);
        return {
            combination: Combination.TWO_PAIRS,
            kicker: [best_pairs[1], best_pairs[0], getKickers(kickers, best_pairs)[0]],
        };
    }

    if (pairs.length === 1) {
        return {
            combination: Combination.ONE_PAIR,
            kicker: [pairs[0], ...getKickers(kickers, pairs).slice(0, 4)],
        };
    }

    return {
        combination: Combination.HIGH_HAND,
        kicker: kickers.slice(0, 5),
    };
}

export const compareHands = (hand1: string[], hand2: string[], board: string[]): 0 | 1 | 2 => {
    const combination1 = computeCombination(hand1, board);
    const combination2 = computeCombination(hand2, board);

    if (combination1.combination === combination2.combination) {
        for (let i = 0; i < combination1.kicker.length; i++) {
            if (combination1.kicker[i] > combination2.kicker[i]) {
                return 1;
            } else if (combination1.kicker[i] < combination2.kicker[i]) {
                return 2;
            }
        }

        return 0;
    }

    return combination1.combination < combination2.combination ? 1 : 2;
}