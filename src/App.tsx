import React, { useState, useRef } from 'react';
import { Chart } from './blocks/chart';
import './App.css';
import { computeEquity } from './math/computeEquity';

function App() {
	const [hand1, setHand1] = useState("");
	const [hand2, setHand2] = useState("");
	const [result, setResult] = useState("");
	const active = useRef(true);

	const select = (hand: string) => {
		if (active.current) {
			if (hand.length === 2) {
				hand = hand[0] + 'c' + hand[1] + 'd';
			} else {
				if (hand[2] === 's') {
					hand = hand[0] + 'c' + hand[1] + 'c';
				} else {
					hand = hand[0] + 'c' + hand[1] + 'd';
				}
			}
			setHand1(hand);
		} else {
			if (hand.length === 2) {
				hand = hand[0] + 's' + hand[1] + 'h';
			} else {
				if (hand[2] === 's') {
					hand = hand[0] + 's' + hand[1] + 's';
				} else {
					hand = hand[0] + 's' + hand[1] + 'h';
				}
			}
			setHand2(hand);
		}

		active.current = !active.current;
	};

	const compute = () => {
		setResult(computeEquity(hand1, hand2))
	};

	return (
		<div>
			<Chart select={select} />
			<div>{`${hand1} vs ${hand2}`}</div>
			<div>{result}</div>
			<button disabled={!hand1 || !hand2} onClick={compute}>COMPUTE</button>
		</div>
	);
}

export default App;
