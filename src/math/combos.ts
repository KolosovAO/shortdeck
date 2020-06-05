const SUITES = ['c', 's', 'd', 'h'];
const OFFSUITED = SUITES.reduce<string[][]>((res, s1) => {
    SUITES.forEach((s2) => {
        if (s1 !== s2) {
            res.push([s1, s2]);
        }
    });

    return res;
}, []);

const PAIR_SUITES = SUITES.reduce<string[][]>((res, s1, i1) => {
    SUITES.forEach((s2, i2) => {
        if (i1 < i2) {
            res.push([s1, s2]);
        }
    });

    return res;
}, []);

export const toCombos = (hands: string[]): [string, string][] => {
    return hands.reduce<[string, string][]>((res, hand) => {
        const [c1, c2, suit] = hand.split('');
        if (hand.length === 2) {
            res.push(...PAIR_SUITES.map<[string, string]>(([s1, s2]) => [c1 + s1, c2 + s2]));
        } else if (suit === 's') {
            res.push(...SUITES.map<[string, string]>((s) => [c1 + s, c2 + s]));
        } else {
            res.push(...OFFSUITED.map<[string, string]>(([s1, s2]) => [c1 + s1, c2 + s2]));
        }

        return res;
    }, []);
};
