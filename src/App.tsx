import React, { useState, useRef } from 'react';
import { CardList } from './blocks/card_list';
import { Cards } from './blocks/cards';
import { Spectre } from './blocks/spectre';
import './App.css';
import { computeEquity, computeEquityVsSpectre } from './math/computeEquity';

type Cards = Array<string | undefined>;

const compact = <T extends any>(val: T | undefined): val is NonNullable<T> => !!val;

function App() {
	const [is_calculated, setIsCalculated] = useState(false);
	const [show_cardlist, setShowCardList] = useState(false);
	const [show_p2_spectre, setShowP2Spectre] = useState(false);
	const [is_p2_spectre, setIsP2Spectre] = useState(false);
	const [p2_spectre, setP2Spectre] = useState<string[]>([]);
	const [board, setBoard] = useState<Cards>([undefined, undefined, undefined, undefined, undefined]);
	const [p1, setP1] = useState<Cards>([undefined, undefined]);
	const [p2, setP2] = useState<Cards>([undefined, undefined]);
	const [p1_info, setP1Info] = useState('');
	const [p2_info, setP2Info] = useState('');
	const current_setter = useRef(setBoard);
	const current_cards = useRef(board);
	const current_index = useRef(0);
	const cards_lost = useRef(0);

	const selectP1Cards = (index: number) => {
		setShowCardList(true);
		const new_p1 = p1.map((c, i) => i >= index ? undefined : c);
		setP1(new_p1);
		current_setter.current = setP1;
		current_cards.current = new_p1;
		cards_lost.current = 2 - index;
		current_index.current = index;
	};

	const selectP2Cards = (index: number) => {
		setShowCardList(true);
		const new_p2 = p2.map((c, i) => i >= index ? undefined : c);
		setP2(new_p2);
		current_setter.current = setP2;
		current_cards.current = new_p2;
		cards_lost.current = 2 - index;
		current_index.current = index;
	};

	const selectBoard = (index: number) => {
		setShowCardList(true);
		const new_board = board.map((c, i) => i >= index ? undefined : c);
		setBoard(new_board);
		current_setter.current = setBoard;
		current_cards.current = new_board;
		cards_lost.current = index < 3
			? 3 - index
			: 1;
		current_index.current = index;
	}

	const selectCard = (card: string) => {
		current_cards.current = current_cards.current.map((c, i) => i === current_index.current ? card : c);
		current_index.current++;
		current_setter.current(current_cards.current);
		cards_lost.current--;
		if (cards_lost.current === 0) {
			setShowCardList(false);
		}
	};

	const selectP2Spectre = (hands: string[]) => {
		setP2Spectre(hands);
		setShowP2Spectre(false);
	}

	const p1_full = p1.filter(compact);
	const p2_full = p2.filter(compact);

	const compute = () => {
		if (is_p2_spectre && p2_spectre.length && p1_full.length === 2) {
			const generator = computeEquityVsSpectre(p1_full, p2_spectre, board.filter(compact))();
			const nextIteration = () => setTimeout(() => {
				const next = generator.next();
				if (next.done) {
					setIsCalculated(false);
					return;
				} else {
					const { win, tie, lose, total } = next.value;
					setP1Info(String(((win / total + tie / 2 / total) * 100).toFixed(2)));
					setP2Info(String(((lose / total + tie / 2 / total) * 100).toFixed(2)));
					nextIteration();
				}
			}, 5);
			setIsCalculated(true);
			nextIteration();
		} else {
			if (p1_full.length !== 2 || p2_full.length !== 2) {
				return;
			}
			setIsCalculated(true);
			setTimeout(() => {
				const { win, tie, lose, total } = computeEquity(p1_full, p2_full, board.filter(compact));
				setP1Info(String(((win / total + tie / 2 / total) * 100).toFixed(2)));
				setP2Info(String(((lose / total + tie / 2 / total) * 100).toFixed(2)));
				setIsCalculated(false);
			});
		}
	}

	const selected = [...p1, ...p2, ...board].filter(Boolean) as string[];

	const copyToClipboard = () => {
		const str = is_p2_spectre && p2_spectre.length && p1_full.length === 2
			? `${p1_full.join("")} vs ${p2_spectre.join(", ")} - ${p1_info}`
			: p1_full.length === 2 || p2_full.length === 2
				? `${p1_full.join("")} vs ${p2_full.join("")} - ${p1_info}`
				: null;

		if (!str) {
			return;
		}
		const el = document.createElement('textarea');
		el.value = str;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	};

	return (
		<div className="calculator">
			Player1 <span className="win_percent">{p1_info}</span>
			<Cards className="player" cards={p1} selectCard={selectP1Cards} />
			Player2 <button onClick={() => setIsP2Spectre(!is_p2_spectre)}>$$$</button> <span className="win_percent">{p2_info}</span>
			{is_p2_spectre
				? <button className="show_spectre" onClick={() => setShowP2Spectre(true)}>{p2_spectre.join(",") || "SELECT SPECTRE"}</button>
				: <Cards className="player" cards={p2} selectCard={selectP2Cards} />
			}
			BOARD
			<Cards className="board" selectCard={selectBoard} cards={board} />
			{is_calculated
				? <div className="loader">Loading...</div>
				: (
					<>
						<button onClick={compute}>COMPUTE</button>
						<button onClick={copyToClipboard}>COPY</button>
					</>
				)
			}
			{show_cardlist && <CardList selected={selected} selectCard={selectCard} />}
			{show_cardlist && <button onClick={() => setShowCardList(false)}>HIDE CARDLIST</button>}
			{show_p2_spectre && <Spectre currentHands={p2_spectre} selectHands={selectP2Spectre} />}
		</div>
	);
}

export default App;
