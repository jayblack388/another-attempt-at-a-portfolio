import React, { useReducer, createContext } from 'react';
import { theme as primerTheme } from '@primer/components';
import { createGlobalStyle } from 'styled-components';

const bg1 = '-webkit-linear-gradient(0deg, #08aeea 0%, #2af598 100%)';
const bg2 = '-webkit-linear-gradient(0deg, #2af598 0%, #08aeea 100%)';
const GlobalStyles = createGlobalStyle`
	a {
		background-clip: text;
		background: ${({ bg }) => bg};
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
  }
`;

// extend primer theme
export const themes = {
	light: {
		...primerTheme,
		background: '#ffffff',
		iconColor: '#24292e',
	},
	dark: {
		...primerTheme,
		background: '#2f363d',
		iconColor: '#ffffff',
	},
	flexa: {
		columns: 24,
		gutter: {
			xs: 2,
			sm: 2,
			md: 4,
			lg: 4,
		},
		breakpoints: {
			xs: '576px',
			sm: '768px',
			md: '992px',
			lg: '1280px',
		},
	},
};

const windowGlobal = typeof window !== 'undefined' && window;

const localTheme =
	(windowGlobal.localStorage && windowGlobal.localStorage.getItem('theme')) ||
	'light';

const initialState = {
	style: localTheme,
	theme: themes[localTheme],
};

const reducer = (state, { value, type }) => {
	windowGlobal.localStorage &&
		windowGlobal.localStorage.setItem('theme', value);
	switch (type) {
		case 'TOGGLE_THEME':
			return state.style === 'light'
				? { theme: themes.dark, style: 'dark' }
				: { theme: themes.light, style: 'light' };
		case 'CHANGE_THEME':
			return { theme: themes[value], style: value };
		default:
			return state;
	}
};

const ThemeContext = createContext({
	state: initialState,
	dispatch: () => {},
});

function ThemeContextProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	const { style } = state;
  const linkBg = style === 'dark' ? bg2 : bg1;
	return (
		<ThemeContext.Provider value={value}>
			<GlobalStyles bg={linkBg} />
			{children}
		</ThemeContext.Provider>
	);
}

export { ThemeContext, ThemeContextProvider };
