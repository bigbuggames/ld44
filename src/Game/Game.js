import React from 'react';
import ReactDOM from 'react-dom';

import Keyboard from 'Engine/Keyboard';
import AssetLoader from 'Engine/AssetLoader';

import assets from 'constants/Assets';

class Game extends React.Component {
  render() {
    return (
      <>
        <AssetLoader assets={assets}>
          {(loaded) => {
            if (loaded === false) {
              return <div>Loading...</div>
            }

            return (
              <Screen>
                <Keyboard allowedKeys={['q', 'w', 'e', ' ']}>
                  {pressedKeys => (
                   
                  )}
                </Keyboard>
              </Screen>
            )
          }}
        </AssetLoader>
      </>
    )
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Game />, rootElement);

if (process.env.NODE_ENV !== 'production') {
  // Enables hot module reloading
  if(module.hot) {
    module.hot.accept();
  }
}

