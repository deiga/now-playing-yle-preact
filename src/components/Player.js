import { h } from 'preact';

export default ({ mediaUrl }) => {
  console.log('Player', mediaUrl);

  return (
    <div>
      <audio autoplay controls>
        <source src={mediaUrl} type="application/x-mpegURL" />
        Selaimesi ei tue videosoittoa.
      </audio>
    </div>
  );
};
