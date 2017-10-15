import { connect } from 'preact-redux';
import { showGuide } from '../actions';
import AppToolbar from '../components/AppToolbar';

const mapDispatchToProps = dispatch => {
  return {
    onTabClick: channelId => {
      dispatch(showGuide(channelId));
    }
  }
}

const mapStateToProps = state => {
  return {
    channels: state.channels.items,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppToolbar);
