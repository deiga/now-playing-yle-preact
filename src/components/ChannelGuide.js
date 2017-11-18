import { h } from 'preact';
import Card from 'preact-material-components/Card';

export default ({ programs }) => {
  console.log(`ChannelGuide.render(): programs=`, programs);

  return (
    <div>
    {
      programs.map(p => {
        let publicationEvent = p.publicationEvent.find((pe) => pe.temporalStatus === "currently")
        return (
        <Card>
          <Card.Primary>
            <Card.Subtitle>
              { `${ new Date(publicationEvent.startTime).getHours() }:${ String(new Date(publicationEvent.startTime).getMinutes()).padStart(2, '0') }` }
            </Card.Subtitle>
            <Card.Title large>
              { p.title.fi }
            </Card.Title>
          </Card.Primary>
          <Card.SupportingText>
            { p.description.fi }
          </Card.SupportingText>
          <Card.Actions>
            <Card.Action>Katso</Card.Action>
          </Card.Actions>
        </Card>
      )})
    }
    </div>
  );
}
