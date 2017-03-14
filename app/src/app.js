import R                    from 'ramda'
import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { 
  BrowserRouter as Router } from 'react-router-dom'

import Routes from './routes.js'
import Nav    from './components/nav/nav.js'
import Header from './components/header/header.js'

import { User }                        from './actions/index.js'
import { notEmpty, notNil, notEquals } from './lib/helpers.js'

import './style/main.scss'


class App extends Component {
  constructor() {
    super()
    this.onClickLogout       = this.onClickLogout.bind(this)
    this.onClickShowMenu     = this.onClickShowMenu.bind(this)
    this.onClickHideMenu     = this.onClickHideMenu.bind(this)
    this.onClickToggleLogin  = this.onClickToggleLogin.bind(this)
    this.onClickToggleSignup = this.onClickToggleSignup.bind(this)
    this.state               = {
      show_login: false,
      show_signup: false
    }
  }

  componentDidMount() {
    this.props.onMount()
  }

  componentDidUpdate(prevProps, prevState) {
    const isNewLogin = R.both(
      notNil,
      notEquals(prevProps.user.id),
    )(this.props.user.id)

    const isSignupSuccessfully = R.both(
      notNil,
      notEquals(prevProps.user.signup_status)
    )(this.props.user.signup_status)

    if (isNewLogin || isSignupSuccessfully)
      this.setState({
        show_login: false,
        show_signup: false
      })
  }


  onClickLogout(e) {
    this.props.logout()
  }

  onClickShowMenu(e) {
    e.preventDefault()
    this.setState({is_menu_active: true})
  }


  onClickHideMenu(e) {
    if (this.state.is_menu_active)
      this.setState({
        is_menu_active: false,
        show_login: false,
        show_signup: false
      })
  }


  onClickToggleLogin(e) {
    e.preventDefault()
    this.setState({
      show_signup: false,
      show_login: !this.state.show_login 
    })
  }


  onClickToggleSignup(e) {
    e.preventDefault
    this.setState({
      show_login: false,
      show_signup: !this.state.show_signup
    })
  }
 
  render() {
    let menu_active_class
    if (this.state.is_menu_active) menu_active_class = 'active-menu'

    return (
      <Router>
        <div className={menu_active_class}>
          {
            Nav({
              user: this.props.user,
              logout: this.onClickLogout,
              show_login: this.state.show_login,
              show_signup: this.state.show_signup,
              onClickHideMenu: this.onClickHideMenu,
              onClickShowModal: this.onClickShowModal,
              onClickToggleLogin: this.onClickToggleLogin,
              onClickToggleSignup: this.onClickToggleSignup
            })
          }
          <div id='content' onTouchTap={this.onClickHideMenu}>
            {Header(this.onClickShowMenu)}
            {Routes()}
            <footer></footer>
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  user: state.User
})


const mapDispatchToProps = (dispatch, getState)=> ({
  onMount: () => User.getUser(dispatch, getState),
  logout: () => User.logoutUser(dispatch, getState)
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
