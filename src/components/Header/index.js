import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'
import './index.css'

class Header extends Component {
  state = {showSearchBar: false, showMenu: false}

  onChangeSearchInput = event => {
    const {searchInput} = this.props
    if (event.key === 'Enter') {
      searchInput(event.target.value)
    }
  }

  onClickSearchIcon = () => this.setState({showSearchBar: true})

  onClickShowMenu = () => this.setState({showMenu: true})

  onClickHideMenu = () => this.setState({showMenu: false})

  render() {
    const {showSearchBar, showMenu} = this.state
    const {match} = this.props
    const {path} = match
    let homeClassNameStyling
    let popularClassNameStyling
    let accountClassNameStyling

    switch (path) {
      case '/popular':
        homeClassNameStyling = 'passive'
        popularClassNameStyling = 'active'
        accountClassNameStyling = 'passive'
        break
      case '/profile':
        homeClassNameStyling = 'passive'
        popularClassNameStyling = 'passive'
        accountClassNameStyling = 'active'
        break
      default:
        homeClassNameStyling = 'active'
        popularClassNameStyling = 'passive'
        accountClassNameStyling = 'passive'
        break
    }

    return (
      <nav className="nav-container">
        <div className="nav-elements-container">
          <Link className="link" to="/">
            <img
              className="app-logo"
              src="https://res.cloudinary.com/dssfuaou4/image/upload/v1695276337/moviesApp/Group_7399_vvewuc.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-list-items">
            <Link className="link" to="/">
              <li className={`nav-list-link-items ${homeClassNameStyling}`}>
                Home
              </li>
            </Link>
            <Link className="link" to="/popular">
              <li className={`nav-list-link-items ${popularClassNameStyling}`}>
                Popular
              </li>
            </Link>
          </ul>

          <div className="search-container">
            {showSearchBar && (
              <input
                type="search"
                onKeyDown={this.onChangeSearchInput}
                placeholder="search"
                className="search"
              />
            )}
            <Link to="/search">
              <button
                type="button"
                className="icon-button"
                data-testid="searchButton"
              >
                <HiOutlineSearch
                  size={20}
                  color="white"
                  data-testid="searchButton"
                  onClick={this.onClickSearchIcon}
                />
              </button>
            </Link>
          </div>
          {/* icons-container */}

          <Link to="/profile">
            <img
              src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426927/account-avatar_irmhck.png"
              className={`profile-logo ${''}`}
              alt="profile"
            />
          </Link>
          <MdMenuOpen
            size={25}
            color="white"
            className="menu-icon"
            onClick={this.onClickShowMenu}
          />
        </div>

        {/* show menu block  */}
        {showMenu && (
          <ul className="menu-links">
            <Link className="link" to="/">
              <li className={`popup-heading ${homeClassNameStyling}`}>Home</li>
            </Link>
            <Link className="link" to="/popular">
              <li className={`popup-heading ${popularClassNameStyling}`}>
                Popular
              </li>
            </Link>
            <Link className="link" to="/profile">
              <li className={`popup-heading ${accountClassNameStyling}`}>
                Account
              </li>
            </Link>
            <ImCross
              size={10}
              color="#ffffff"
              onClick={this.onClickHideMenu}
              className="icon"
            />
          </ul>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
