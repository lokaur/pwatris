import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import musicFile from '../../music/music_8bit_jammer.mp3';

class Music extends React.Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { audio } = this.refs;

    audio.volume = 0.5;
    // audio.play();
  }

  render() {
    return (<audio ref='audio' src={musicFile} autoPlay loop/>);
  }
}

const mapStateToProps = ({ game: { isMusicPlaying: isPlaying } }) => ({ isPlaying });

export default connect(mapStateToProps)(Music);