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
    const getMusic = await getMusics(id);
    const saveMusic = getMusic.filter((music) => music.trackName);
    console.log(getMusic);
    // console.log(saveMusic);
    this.setState({
      musics: saveMusic,
      artistName: `Artist: ${getMusic[0].artistName}`,
      albumName: `Album: ${getMusic[0].collectionName}`,
    });
  }

  render() {
    const { images, albumName, artistName, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ albumName }</p>
        <p>Songs Sample:</p>
        <img src={ images } alt={ images } />
        {
          musics.map((music) => ((
            <ul key={ music.trackName }>
              <li>
                <MusicCard
                  key={ music.trackName }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
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
