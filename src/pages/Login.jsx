import React, { Component } from 'react';
import Props from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

const NAME_LIMIT_LENGTH = 3;
const THREE_SECONDS = 3000;

class Login extends Component {
  state = {
    name: '',
    isItLoading: false,
    buttonDisable: true,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
    });
    if (value.length >= NAME_LIMIT_LENGTH) {
      this.setState({
        buttonDisable: false,
      });
    } else {
      this.setState({
        buttonDisable: true,
      });
    }
  };

  handleClickSubmit = (event) => {
    event.preventDefault();
    this.setState({ isItLoading: true });
    const { history } = this.props;
    const { name } = this.state;
    createUser({ name });
    setInterval(() => {
      history.push('/search');
    }, THREE_SECONDS);
  };

  render() {
    const { name, isItLoading, buttonDisable } = this.state;
    return (

      <div data-testid="page-login">

        {
          isItLoading ? <Loading /> : (

            <form>
              <label htmlFor="login-name-input">
                Name:
                <input
                  type="text"
                  data-testid="login-name-input"
                  id="login-name-input"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ buttonDisable }
                onClick={ this.handleClickSubmit }
              >
                Entrar
              </button>

            </form>
          )
        }
      </div>

    );
  }
}

Login.propTypes = {
  history: Props.shape({
    push: Props.func.isRequired,
  }).isRequired,
};

export default Login;
