import React from "react"
import { ThemeProvider } from "styled-components"
import { Theme } from "jdb-components"
import { ThemeContextProvider } from "./src/theme-context"
require("prismjs/themes/prism-coy.css")

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={Theme({ darkMode: false })}>
    <ThemeContextProvider>{element}</ThemeContextProvider>
  </ThemeProvider>
)
