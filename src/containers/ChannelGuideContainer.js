import { connect } from 'preact-redux';
import { playClip } from '../actions';
import ChannelGuide from '../components/ChannelGuide';

const mapDispatchToProps = dispatch => {
  return {
    onWatchClick: (program, event) => {
      const programId = program.id;
      const mediaId = program.publicationEvent
        .map(p => {
          if (p.temporalStatus !== 'currently' || p.type !== 'OnDemandPublication') return null;

          if (!p.media || !p.media.available) return null;

          return p.media.id;
        })
        .find(id => id !== null);

      dispatch(playClip(programId, mediaId));
    },
  };
};

const mapStateToProps = state => {
  console.log(state);
  return {
    programs: state.programs.channelItems,
    streamUrl: state.programs.streamUrl,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelGuide);
