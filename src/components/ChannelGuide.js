import {h, Component} from 'preact';
import Card from 'preact-material-components/Card';

class ChannelGuide extends Component {

  render() {
    return (
      <div>
      {
        this.props.programs.map(p => (
          <Card>
            <Card.Primary>
              <Card.Subtitle>
                { `${ p.startTime.getHours() }:${ String(p.startTime.getMinutes()).padStart(2, '0') }` }
              </Card.Subtitle>
              <Card.Title large>
                { p.title }
              </Card.Title>
            </Card.Primary>
            <Card.SupportingText>
              { p.description }
            </Card.SupportingText>
            <Card.Actions>
              <Card.Action>Katso</Card.Action>
            </Card.Actions>
          </Card>
        ))
      }
      </div>
    );
  }
}

export default ChannelGuide;
