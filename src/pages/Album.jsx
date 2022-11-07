import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  state = {
    images: '',
    albumName: '',
    artistName: '',
    musics: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const saveMusic = await getMusics(id);
    // console.log(saveMusic);
    this.setState({
      musics: saveMusic,
      artistName: `Artist: ${saveMusic[0].artistName}`,
      albumName: `Album: ${saveMusic[0].collectionName}`,
    });
  }

  render() {
    const { images, albumName, artistName, musics } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ albumName }</p>
        <p>Songs Sample:</p>
        <img src={ images } alt={ images } />
        {
          musics.map((music) => (
            music.previewUrl
              && (
                <ul>
                  <li>
                    <MusicCard
                      key={ music.collectionId }
                      trackName={ music.trackName }
                      previewUrl={ music.previewUrl }
                    />
                  </li>
                </ul>
              )
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
