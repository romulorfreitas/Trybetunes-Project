import React, { Component } from 'react';
import Props from 'prop-types';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
// import { createUser } from '../services/userAPI';

const NAME_LIMIT_LENGTH = 2;
// const THREE_SECONDS = 3000;

class Search extends Component {
  state = {
    search: '',
    isItLoading: false,
    buttonDisable: true,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
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
    // const { history } = this.props;
    // const { search } = this.state;
    // createUser({ search });
    // setInterval(() => {
    //   history.push('/search');
    // }, THREE_SECONDS);
  };

  render() {
    const { search, isItLoading, buttonDisable } = this.state;
    return (
      <div data-testid="page-search">
        Search

        {
          isItLoading ? <Loading /> : (
            <>
              <Header />
              <form>
                <label htmlFor="search-artist-input">
                  <br />
                  {/* Search: */}
                  <input
                    type="text"
                    data-testid="search-artist-input"
                    id="search-artist-input"
                    value={ search }
                    onChange={ this.handleChange }
                    placeholder="Digite aqui a sua busca"
                  />
                </label>
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ buttonDisable }
                  onClick={ this.handleClickSubmit }
                >
                  Pesquisar
                </button>

              </form>
            </>
          )
        }

      </div>
    );
  }
}

Search.propTypes = {
  history: Props.shape({
    push: Props.func.isRequired,
  }).isRequired,
};
export default Search;
