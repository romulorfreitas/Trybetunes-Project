import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from '../Components/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isItLoading: false,
    favoriteBox: false,
  };

  handleFavoriteBox = () => {
    const { trackId } = this.props;
    this.setState({ favoriteBox: true, isItLoading: true }, async () => {
      const favSong = await getMusics(trackId);
      await addSong(favSong);
      this.setState({ favoriteBox: true, isItLoading: false });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favoriteBox, isItLoading } = this.state;
    // console.log(trackName);
    // console.log(previewUrl);
    return (

      <div>
        {
          isItLoading ? <Loading isItLoading={ isItLoading } /> : (

            <>
              <p>{trackName}</p>
              <audio
                data-testid="audio-component"
                src={ previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor="favorita">
                Favorita
                <input
                  type="checkbox"
                  id="favorita"
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ favoriteBox }
                  onChange={ this.handleFavoriteBox }
                  name="favorita"
                />
              </label>
            </>
          )
        }
      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
export default MusicCard;
