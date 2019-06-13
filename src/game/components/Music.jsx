import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import musicFile from '../../music/music_8bit_jammer.mp3';

class Music extends React.Component {
  static propTypes = {
    isMusicPlaying: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { audio } = this.refs;
    audio.volume = 0.5;

    if (this.props.isMusicPlaying) {
      audio.play();
    }
  }

  componentDidUpdate() {
    const { audio } = this.refs;
    if (this.props.isMusicPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  render() {
    return (<audio ref='audio' src={ musicFile } loop/>);
  }
}

const mapStateToProps = ({ game: { isMusicPlaying } }) => ({ isMusicPlaying });

export default connect(mapStateToProps)(Music);