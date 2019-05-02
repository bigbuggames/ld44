import React from 'react';
import ReactDOM from 'react-dom';

import GlobalStyle from './GlobalStyle';
import Home from './components/Home';
import Shop from './components/Shop';
import Fate from './components/Fate';
import Articles from './constants/articles';
import { GameProvider } from './context/game';

class App extends React.Component {
  static HOME = 1;
  static SHOP = 2;
  static FATE = 3;

  state = {
    gameState: App.HOME
  }

  handleStateChange = (gameState) => () => this.setState({ gameState });

  render() {
    return (
      <GameProvider>
        <GlobalStyle />

        {this.state.gameState === App.HOME && 
          <Home handleNext={this.handleStateChange(App.SHOP)} />
        }

        {this.state.gameState === App.SHOP &&
          <Shop handleNext={this.handleStateChange(App.FATE)} />
        }

        {this.state.gameState === App.FATE && <Fate />}
      </GameProvider>
    )
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

if (process.env.NODE_ENV !== 'production') {
  // Enables hot module reloading
  if(module.hot) {
    module.hot.accept();
  }
}

