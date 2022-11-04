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
        {isItLoading ? <Loading /> : (
          <p data-testid="header-user-name">{userInfo}</p>
        )}
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <br />
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <br />
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}
export default Header;
