import {h, Component} from 'preact';
import Toolbar from 'preact-material-components/Toolbar';

class App extends Component {
  render() {
    return (
      <Toolbar>
        <Toolbar.Row>
          <Toolbar.Section align-start={true}>
            <Toolbar.Icon menu={true}>menu</Toolbar.Icon>
            <Toolbar.Title>
              My App
            </Toolbar.Title>
          </Toolbar.Section>
          <Toolbar.Section align-end={true}>
            <Toolbar.Icon>more_vert</Toolbar.Icon>
          </Toolbar.Section>
        </Toolbar.Row>
      </Toolbar>
    );
  }
}

export default App;
