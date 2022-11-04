import React, { Component } from 'react';
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
      </header>
    );
  }
}
export default Header;
