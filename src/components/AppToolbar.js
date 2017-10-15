import {h, Component} from 'preact';
import Tabs from 'preact-material-components/Tabs';
import Toolbar from 'preact-material-components/Toolbar';

class AppToolbar extends Component {

  /**
   * Helper function to handle the cases when we don't have any channels to show
   */
  renderTabs() {
    if (this.props.channels.length <= 0) {
      return null;
    }

    return (
      <Tabs indicator-accent={true}>
      {
        this.props.channels.map(c => (
          <Tabs.Tab>{ c.title }</Tabs.Tab>
        ))
      }
      </Tabs>
    );
  }

  render() {
    return (
      <Toolbar>
        <Toolbar.Row>
          <Toolbar.Section align-start={true}>
            <Toolbar.Icon menu={true}>menu</Toolbar.Icon>
            <Toolbar.Title>
              { this.props.title }
            </Toolbar.Title>
          </Toolbar.Section>
        </Toolbar.Row>
        <Toolbar.Row>
          <Toolbar.Section align-end={true}>
            { this.renderTabs() }
          </Toolbar.Section>
        </Toolbar.Row>
      </Toolbar>
    );
  }
}

export default AppToolbar;
