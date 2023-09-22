import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {errorMsg: '', showError: false, username: '', password: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
    const {username, password} = this.state
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg, username: '', password: ''})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  renderUsername = () => {
    const {username} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <label className="label-text" htmlFor="username">
          USERNAME
        </label>
        <input
          className="input-field"
          placeholder="Username"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
          type="text"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label className="label-text" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="input-field"
          id="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
          type="password"
        />
      </>
    )
  }

  render() {
    const {showError, errorMsg} = this.state
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dug30iszj/image/upload/v1663230696/MovieApp/Login%20Page/Group_7399_dfypcl.png"
          alt="login website logo"
          className="logo"
        />
        <div className="wrapper">
          <div className="card-container">
            <form onSubmit={this.onSubmitForm} className="form-container">
              <h1 className="login">Login</h1>

              <div className="input-container">{this.renderUsername()}</div>
              <div className="input-container">{this.renderPassword()}</div>
              {showError && <p className="error">{errorMsg}</p>}
              <button type="submit" className="login-btn">
                Login
              </button>
              <button type="submit" className="sign-btn">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
