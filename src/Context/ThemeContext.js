import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  changeTheme: () => {},
  savedVideosList: [],
  saveVideoButtonClicked: () => {},
})
export default ThemeContext
