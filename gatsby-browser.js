import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Theme } from 'jdb-components';
import { ThemeContextProvider } from './src/theme-context';
require('prismjs/themes/prism-coy.css');

const GlobalStyles = createGlobalStyle`
	a {
		background-clip: text;
		background: -webkit-linear-gradient(0deg, #08aeea 0%, #2af598 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
  }
`;

export const wrapRootElement = ({ element }) => (
	<ThemeProvider theme={Theme({ darkMode: false })}>
    <GlobalStyles />
		<ThemeContextProvider>{element}</ThemeContextProvider>
	</ThemeProvider>
);
