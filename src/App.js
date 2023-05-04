import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'

import Login from './components/Login'
import Home from './components/Home'
import VideosDetails from './components/VideosDetails'
import SaveVideo from './components/SaveVideo'
import './App.css'

import ThemeContext from './Context/ThemeContext'

// Replace your code here
class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideosList: [],
  }

  onChangeThemeStatus = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  saveVideoButtonClicked = data => {
    const {savedVideosList} = this.state
    this.setState({savedVideosList: [...savedVideosList, data]})
  }

  render() {
    const {isDarkTheme, savedVideosList} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          onChangeThemeStatus: this.onChangeThemeStatus,
          saveVideoButtonClicked: this.saveVideoButtonClicked,
          savedVideosList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/videos/:id" component={VideosDetails} />
          <Route exact path="/save-video" component={SaveVideo} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
