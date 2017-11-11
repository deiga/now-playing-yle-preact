import { connect } from 'preact-redux';
import { requestChannels } from '../actions';
import { h, Component } from 'preact';
import AppToolbarContainer from '../containers/AppToolbarContainer';
import ChannelGuideContainer from '../containers/ChannelGuideContainer';

class App extends Component {

  componentDidMount() {
    // Use the dispatcher from Redux Storage
    const { dispatch } = this.props;
    dispatch(requestChannels());
  }

  render() {
    return (
      <div>
        <AppToolbarContainer/>
        <main>
          <ChannelGuideContainer/>
        </main>
      </div>
    );
  }
}

export default connect()(App);
