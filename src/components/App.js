import {h, Component} from 'preact';
import AppToolbar from './AppToolbar';
import ChannelGuide from './ChannelGuide';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      programs: [],
      currentChannel: null,
      currentProgram: null,
    }
  }

  componentDidMount() {
    // TODO Fetch the values dynamically
    const channels = [
      {
        id: 'yle-tv-1',
        title: 'Yle TV1',
      }
    ];
    const programs = [
      {
        id: '4-7213774',
        contentId: '1-3794707',
        channelId: 'yle-tv1',
        imageId : '13-1-3794707',
        title: 'Inhimillinen tekijä',
        channel: 'Yle TV1',
        description: 'Lapsuuteni pakopaikka. Sari Valton vieraina toimittaja Kimmo Ohtonen, nyrkkeilijä Jussi Koivula sekä jazzpianisti Iro Haarla.',
        startTime: new Date('2017-10-15T06:05:00.000Z'),
        endTime: new Date('2017-10-15T06:55:00.000Z'),
        playbackUrl: '#play/1-3794707/6-8550023d4aaf430b957065db767252e2'
      }
    ];

    // Add some dummy data into the component
    this.setState({
      channels,
      programs: programs.concat(programs, programs, programs),
      currentChannel: channels[0] || null,
      currentProgram: programs[0] || null,
    })
  }

  render() {
    const title = this.state.currentChannel ? this.state.currentChannel.title : 'Now Playing';
    const background = this.state.currentProgram ? this.state.currentProgram.imageUrl : null;

    return (
      <div>
        <AppToolbar
          title={title}
          background={background}
          channels={this.state.channels}
        ></AppToolbar>
        <main>
          <ChannelGuide programs={this.state.programs}></ChannelGuide>
        </main>
      </div>
    );
  }
}

export default App;
