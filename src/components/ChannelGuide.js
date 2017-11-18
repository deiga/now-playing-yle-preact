import { h } from 'preact';
import Card from 'preact-material-components/Card';
import Player from './Player';

export default ({ programs, onWatchClick, streamUrl, playingProgram }) => {
  console.log(`ChannelGuide.render(): programs=`, programs, playingProgram);

  return (
    <div>
      {programs.map(p => {
        let publicationEvent = p.publicationEvent.find(pe => pe.temporalStatus === 'currently');
        let player = playingProgram == p.id && streamUrl ? <Player mediaUrl={streamUrl} /> : null;
        return (
          <Card>
            <Card.Primary>
              <Card.Subtitle>
                {`${new Date(publicationEvent.startTime).getHours()}:${String(
                  new Date(publicationEvent.startTime).getMinutes(),
                ).padStart(2, '0')}`}
              </Card.Subtitle>
              <Card.Title large>{p.title.fi}</Card.Title>
            </Card.Primary>
            <Card.SupportingText>{p.description.fi}</Card.SupportingText>
            <Card.Actions>
              <Card.Action onClick={onWatchClick.bind(null, p)}>Kuuntele</Card.Action>
            </Card.Actions>
            {player}
          </Card>
        );
      })}
    </div>
  );
};
