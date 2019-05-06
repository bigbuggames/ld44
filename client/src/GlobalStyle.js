import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  h1 {
    font-family: 'Leckerli One', cursive;
    font-size: 40px;
    text-align: center;
  }

  html, body {
    font-family: 'Laila', serif;
  }

  nav > ul {
    list-style: none;
  }
`

export const Colors = {
  white: 'white',
  black: '#2E2E2E',

  grey200: '#F2F2F2',
  grey400: 'grey',

  danger: '#952222',
  dangerHover: '#F8E0E6',
  success: '#82B82A',
  successHover: '#E0F8E0',
}

