import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userInfo: '',
    isItLoading: true,
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({
      userInfo: name,
      isItLoading: false,
    });
  }

  render() {
    const { userInfo, isItLoading } = this.state;
    return (
      <header data-testid="header-component">
        {
          isItLoading ? <Loading /> : (
            <>
              <p data-testid="header-user-name">{userInfo}</p>
              <Link data-testid="link-to-search" to="/search">
                Search
              </Link>
              <br />
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
              <br />
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>

            </>

          )
        }
      </header>
    );
  }
}
export default Header;
