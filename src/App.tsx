import React, { useState } from 'react';
import { CardList } from './blocks/card_list';
import { Cards } from './blocks/cards';
import { Spectre } from './blocks/spectre';
import './App.css';
import { computeEquity, computeEquityVsSpectre } from './math/computeEquity';

type Board = [string | undefined, string | undefined, string | undefined, string | undefined, string | undefined];
type PlayerHand = [string | undefined, string | undefined];

type CardMode = 'spectre' | 'hand';

type PlayerSpectreMode = {
	mode: 'spectre';
	spectre: string[];
};

type PlayerHandMode = {
	mode: 'hand';
	current_card_index: number;
	hand: PlayerHand;
}

type PlayerInfo = (PlayerSpectreMode | PlayerHandMode) & { percent?: number; is_hero?: boolean; };

const INIT_PLAYERS_INFO: PlayerInfo[] = [
	{ mode: 'hand', is_hero: true, hand: [undefined, undefined], current_card_index: 0 },
	...Array(4).fill(0).map<PlayerInfo>(() => ({ mode: 'hand', hand: [undefined, undefined], current_card_index: 0 }))
];

const compact = <T extends any>(val: T | undefined): val is NonNullable<T> => !!val;

function App() {
	const [players_info, setPlayersInfo] = useState(INIT_PLAYERS_INFO);

	const [is_calculated, setIsCalculated] = useState(false);
	const [show_cardlist, setShowCardList] = useState(false);
	const [show_spectre, setShowSpectre] = useState(false);

	const [active_player, setActivePlayer] = useState(0);

	const [board, setBoard] = useState<Board>([undefined, undefined, undefined, undefined, undefined]);
	const [board_active_index, setBoardActiveIndex] = useState(-1);

	const selected_player_info = players_info[active_player];

	const getPlayerCardSelector = (player_index: number) => (card_index: number) => {
		const active_player_info = players_info[player_index];
		setActivePlayer(player_index);
		setBoardActiveIndex(-1);

		if (active_player_info.mode === 'hand') {
			setPlayersInfo(players_info.map((player_info, index) => index === player_index
				? {
					...active_player_info,
					hand: card_index === 0
						? [undefined, undefined]
						: [active_player_info.hand[0], undefined],
					current_card_index: card_index
				}
				: player_info
			));
			setShowCardList(true);
		}
	};

	const playerShowSpectre = (player_index: number) => {
		setActivePlayer(player_index);
		setShowSpectre(true);
	};

	const selectBoardCard = (index: number) => {
		setBoardActiveIndex(index);
		setShowCardList(true);
	};

	const selectPlayerSpectre = (spectre: string[]) => {
		setPlayersInfo(players_info.map((player_info, player_index) => player_index === active_player
			? { mode: 'spectre', spectre }
			: player_info
		));
		setShowSpectre(false);
	};

	const setSpectreMode = (index: number) => {
		const current_spectre_mode_index = players_info.findIndex((info) => info.mode === "spectre");

		setPlayersInfo(players_info.map((player_info, player_index) => player_index === current_spectre_mode_index
			? { mode: 'hand', hand: [undefined, undefined], current_card_index: 0 }
			: player_index === index
				? { mode: 'spectre', spectre: [] }
				: player_info
		));
	};

	const rendered_players_info = players_info.map((player_info, index) => {
		if (player_info.is_hero) {
			return (
				<>
					Hero
					{player_info.percent !== undefined && <span className="win_percent">{player_info.percent}</span>}
					<Cards className="player" cards={(player_info as PlayerHandMode).hand} selectCard={getPlayerCardSelector(index)} />
				</>
			);
		}


		return (
			<>
				Player{index + 1}
				<button onClick={() => setSpectreMode(index)}>$$$</button>
				{player_info.percent !== undefined && <span className="win_percent">{player_info.percent}</span>}
				{player_info.mode === "spectre"
					? <button className="show_spectre" onClick={() => playerShowSpectre(index)}>{player_info.spectre.join(",") || "SELECT SPECTRE"}</button>
					: <Cards className="player" cards={player_info.hand} selectCard={getPlayerCardSelector(index)} />
				}
			</>
		);
	});

	const compute = () => {
		const hands: [string, string][] = [];
		const hand_index_to_percent: Record<number, number | undefined> = {};
		let spectre: string[] | undefined = undefined;
		let spectre_index: number | undefined = undefined;

		players_info.forEach((player_info, index) => {
			if (player_info.mode === 'spectre' && player_info.spectre.length) {
				spectre_index = index;
				spectre = player_info.spectre;
			} else if (player_info.mode === 'hand' && player_info.hand[0] && player_info.hand[1]) {
				hands.push(player_info.hand as [string, string]);
				hand_index_to_percent[index] = 0;
			}
		});

		if (!spectre) {
			setIsCalculated(true);
			setTimeout(() => {
				const percent = computeEquity(hands, board.filter(compact));
				let i = 0;
				for (const key in hand_index_to_percent) {
					hand_index_to_percent[key] = percent[i];
					i++;
				}

				setPlayersInfo(players_info.map((player_info, index) => hand_index_to_percent[index]
					? { ...player_info, percent: hand_index_to_percent[index] }
					: player_info
				));

				setIsCalculated(false);
			});
		} else {
			const generator = computeEquityVsSpectre(hands, spectre, board.filter(compact))();
			const nextIteration = () => setTimeout(() => {
				const next = generator.next();
				if (next.done) {
					setIsCalculated(false);
					return;
				} else {
					let i = 0;
					for (const key in hand_index_to_percent) {
						hand_index_to_percent[key] = next.value[i];
						i++;
					}

					setPlayersInfo(players_info.map((player_info, index) => hand_index_to_percent[index] !== undefined
						? { ...player_info, percent: hand_index_to_percent[index] }
						: index === spectre_index
							? { ...player_info, percent: next.value[next.value.length - 1] }
							: player_info
					));

					nextIteration();
				}
			}, 5);
			setIsCalculated(true);
			nextIteration();
		}
	}

	const selected_cards = players_info.reduce<string[]>((result, player_info) => {
		if (player_info.mode === 'hand') {
			return result.concat(player_info.hand.filter(compact));
		}

		return result;
	}, board.filter(compact));

	const selectCard = (card: string) => {
		if (board_active_index !== -1) {
			setBoard(board.map((board_card, index) => index === board_active_index ? card : board_card) as Board);
			if (board_active_index > 1) {
				setShowCardList(false);
			} else {
				setBoardActiveIndex(board_active_index + 1);
			}

			return;
		}

		const current_card_index = (selected_player_info as PlayerHandMode).current_card_index;

		setPlayersInfo(players_info.map((player_info, index) => index === active_player
			? {
				...selected_player_info,
				hand: current_card_index === 0
					? [card, undefined]
					: [(selected_player_info as PlayerHandMode).hand[0], card],
				current_card_index: current_card_index + 1,
			}
			: player_info
		));

		if (current_card_index === 1) {
			setShowCardList(false);
		}
	};

	const copyToClipboard = () => {
		const { hands, percents } = players_info.reduce((res, player_info) => {
			if (player_info.mode === 'hand' && player_info.hand[0] && player_info.hand[1]) {
				res.hands.push(player_info.hand.join(''));
				res.percents.push(String(player_info.percent));
			} else if (player_info.mode === 'spectre' && player_info.spectre.length) {
				res.hands.push(player_info.spectre.join(','));
				res.percents.push(String(player_info.percent));
			}

			return res;
		}, { hands: [], percents: [] } as { hands: string[], percents: string[] });

		if (!hands.length) {
			return;
		}

		const el = document.createElement('textarea');
		el.value = hands.join(' vs ') + ' - ' + percents.join(' vs ');
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
			{rendered_players_info}
			BOARD
			<Cards className="board" selectCard={selectBoardCard} cards={board} />
			{is_calculated
				? <div className="loader">Loading...</div>
				: (
					<>
						<button onClick={compute}>COMPUTE</button>
						<button onClick={copyToClipboard}>COPY</button>
					</>
				)
			}
			{show_cardlist && <CardList selected={selected_cards} selectCard={selectCard} />}
			{show_cardlist && <button onClick={() => setShowCardList(false)}>HIDE CARDLIST</button>}
			{show_spectre && selected_player_info.mode === 'spectre' && <Spectre currentHands={selected_player_info.spectre} selectHands={selectPlayerSpectre} />}
		</div>
	);
}

export default App;
