import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {GrClose} from 'react-icons/gr'
import {BiSearchAlt2} from 'react-icons/bi'

import Header from '../Header'
import SideLeft from '../SideLeft'
import VideoItem from '../VideoItem'
import ThemeContext from '../../Context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Home extends Component {
  state = {
    searchInputValue: '',
    moviesList: [],
    apiStatus: apiStatusConstants.initial,
    bannerVisible: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {searchInputValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInputValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedMoviesList = data.videos.map(eachMovieDetails => ({
        id: eachMovieDetails.id,
        title: eachMovieDetails.title,
        publishedAt: eachMovieDetails.published_at,
        thumbnailUrl: eachMovieDetails.thumbnail_url,
        viewCount: eachMovieDetails.view_count,
        channelName: eachMovieDetails.channel.name,
        profileImageUrl: eachMovieDetails.channel.profile_image_url,
      }))
      this.setState({
        moviesList: updatedMoviesList,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="main-spinner" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderNoSearchResults = () => (
    <div className="video-no-result">
      <img
        alt="no videos"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" className="button">
        Retry
      </button>
    </div>
  )

  renderJobsSuccessView = () => {
    const {moviesList} = this.state

    return (
      <>
        {moviesList.length === 0
          ? this.renderNoSearchResults()
          : moviesList.map(eachMovieDetails => (
              <VideoItem
                key={eachMovieDetails.id}
                eachMovieDetails={eachMovieDetails}
              />
            ))}
      </>
    )
  }

  closeBannerClicked = () => {
    this.setState({bannerVisible: false})
  }

  onChangeSearchInput = event => {
    this.setState({searchInputValue: event.target.value})
  }

  onSearchButtonClicked = () => {
    this.getVideos()
  }

  renderBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()

      default:
        return null
    }
  }

  render() {
    const {bannerVisible, searchInputValue} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const homeSideRight = isDarkTheme
            ? 'home-side-right black-background'
            : 'home-side-right'

          return (
            <>
              <Header />
              <div className="home-app-container">
                <div className="home-side-left">
                  <SideLeft />
                </div>
                <div className={homeSideRight}>
                  {bannerVisible && (
                    <div className="side-right-banner-container">
                      <div className="banner-container">
                        <img
                          className="banner-logo"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                        />
                        <p className="banner-heading">
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </p>
                        <button className="banner-button" type="button">
                          GET IT NOW
                        </button>
                      </div>
                      <button
                        className="close-button"
                        type="button"
                        onClick={this.closeBannerClicked}
                      >
                        <GrClose />
                      </button>
                    </div>
                  )}

                  <div className="search-container">
                    <input
                      className="user-search"
                      type="search"
                      placeholder="Search"
                      value={searchInputValue}
                      onChange={this.onChangeSearchInput}
                    />
                    <button
                      className="search-button"
                      type="button"
                      data-testid="searchButton"
                      onClick={this.onSearchButtonClicked}
                    >
                      <BiSearchAlt2 />
                    </button>
                  </div>
                  <div className="home-video-container">
                    {this.renderBasedOnApiStatus()}
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
