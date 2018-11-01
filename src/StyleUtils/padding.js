
// Don't use this naming
const sizes = {
	['']: 16,
	Sm: 12,
	Xs: 8,
	Xxs: 4,
	Lg: 16,
	Xl: 24,
	Xxl: 32,
	Xxxl: 64
}


// Keep the proportion if new values are needed
const newSizes = {
	0: 0,
	1: 4,
	2: 8,
	3: 12,
	4: 16,
	['']: 16, // default spacing unit
	5: 20,
	6: 24,
	7: 28,
	8: 32,
	10: 40,
	12: 48,
	16: 64,
}

const directions = {
	['']: '',
	t: 'Top',
	r: 'Right',
	b: 'Bottom',
	l: 'Left',
	v: 'Vertical',
	h: 'Horizontal'
}

const styles = Object.keys(sizes).reduce((accum, sizeKey)=> {
	const size = sizes[sizeKey];
	return Object.keys(directions).reduce((accum, directionKey) => {
		const direction = directions[directionKey];
		return {
			...accum,
			[`p${directionKey}${sizeKey}`]: {
				[`padding${direction}`]: size
			}
		};
	}, accum)
}, {})

const newStyles = Object.keys(newSizes).reduce((accum, sizeKey)=> {
	const size = newSizes[sizeKey];
	return Object.keys(directions).reduce((accum, directionKey) => {
		const direction = directions[directionKey];
		return {
			...accum,
			[`p${directionKey}${sizeKey}`]: {
				[`padding${direction}`]: size
			}
		};
	}, accum)
}, {})

export default {
	...styles,
	...newStyles
};
