import React, { Component } from 'react';
import Props from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

const NAME_LIMIT_LENGTH = 2;

class Search extends Component {
  state = {
    search: '',
    holdSearch: '',
    isItLoading: false,
    buttonDisable: true,
    albums: [],
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

  handleAlbumSearch = async () => {
    this.setState({ isItLoading: true });
    const { search } = this.state;
    const searched = await searchAlbumsAPIs(search);
    this.setState({
      holdSearch: search,
      albums: searched,
      isItLoading: false,
      search: '',
    });
  };

  render() {
    const { search, isItLoading, buttonDisable, albums, holdSearch } = this.state;
    return (
      <div data-testid="page-search">
        Search

        <Header />
        <form>
          <label htmlFor="search-artist-input">
            <br />
            <input
              type="text"
              data-testid="search-artist-input"
              id="search-artist-input"
              value={ search }
              onChange={ this.handleChange }
              placeholder="Digite aqui a sua busca"
            />
          </label>

          {
            isItLoading ? <Loading /> : (
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ buttonDisable }
                onClick={ this.handleAlbumSearch }
              >
                Pesquisar
              </button>
            )
          }
        </form>
        { (albums.length >= 1)
                && (
                  <p>
                    Resultado de álbuns de:
                    {' '}
                    { holdSearch }
                  </p>
                )}

        { (albums.length === 0)
                && (
                  <span>
                    Nenhum álbum foi encontrado.
                  </span>
                )}
        {
          albums.map((album) => (
            <ul key={ album.collectionId }>
              <li>{ album.artistName }</li>
              <li>{ album.collectionName }</li>
              <li><img src={ album.artworkUrl100 } alt="Capa do Album" /></li>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                Play Album Sample
              </Link>

            </ul>

          ))
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
