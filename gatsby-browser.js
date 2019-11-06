import React from "react"
import { ThemeProvider } from "styled-components"
import { Theme } from "jdb-components"
import { ThemeContextProvider } from "./src/theme-context"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={Theme}>
    <ThemeContextProvider>{element}</ThemeContextProvider>
  </ThemeProvider>
)
