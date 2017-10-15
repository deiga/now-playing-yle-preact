import { h } from 'preact';
import Card from 'preact-material-components/Card';

export default ({ programs }) => {
  console.log(`ChannelGuide.render(): programs=${JSON.stringify(programs)}`);

  return (
    <div>
    {
      programs.map(p => (
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
