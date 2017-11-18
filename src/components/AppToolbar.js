import { h } from 'preact';
import Tabs from 'preact-material-components/Tabs';
import Toolbar from 'preact-material-components/Toolbar';

/**
 * Helper function to handle the cases when we don't have any channels to show
 */
function renderTabs(channels, onTabClick) {
  if (channels.length <= 0) {
    return null;
  }
  return (
    <Tabs.TabBarScroller>
      <Tabs scroller={true} indicator-accent={true}>
        {channels.map(c => <Tabs.Tab onClick={onTabClick} data-channel-id={c.id}>{c.title.fi}</Tabs.Tab>)}
      </Tabs>;
    </Tabs.TabBarScroller>
  )
}

export default ({ currentProgram, channels, onTabClick }) => {
  console.log(`AppToolbar.render(): channels`, channels);
  const title = currentProgram ? currentProgram.title : 'Now Playing';

  return (
    <Toolbar>
      <Toolbar.Row>
        <Toolbar.Section align-start={true}>
          <Toolbar.Icon menu={true}>menu</Toolbar.Icon>
          <Toolbar.Title>{title}</Toolbar.Title>
        </Toolbar.Section>
      </Toolbar.Row>
      <Toolbar.Row>
        <Toolbar.Section align-end={true}>{renderTabs(channels, onTabClick)}</Toolbar.Section>
      </Toolbar.Row>
    </Toolbar>
  );
};
