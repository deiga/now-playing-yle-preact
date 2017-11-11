import { connect } from 'preact-redux';
import { playClip } from '../actions';
import ChannelGuide from '../components/ChannelGuide';

const mapDispatchToProps = dispatch => {
  return {
    onWatchClick: channelId => {
      const programId = null;
      const mediaId = null;

      dispatch(playClip(programId, mediaId));
    }
  }
}

const mapStateToProps = state => {
  return {
    programs: state.programs.channelItems,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelGuide);
