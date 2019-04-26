import React from 'react';

import imageLoader from './loaders/imageLoader';

const AssetContext = React.createContext({});

export default class AssetLoader extends React.Component {
  state = {
    loaded: false
  };

  createAssetsObjectByKey = loadedAssets => {
    return loadedAssets.reduce((acc, item) => {
      return {
        ...acc,
        [item.id]: item
      };
    }, {});
  };

  getBundlesAsKeys = bundles => {
    return bundles.reduce((acc, bundle) => {
      return {
        ...acc,
        [bundle.type]: bundle.loadedAssets
      };
    }, {});
  };

  loadAssetType = (type, driver) => {
    return new Promise((resolve, reject) => {
      Promise.all([
        ...driver(this.props.assets.find(bundle => bundle.type === type))
      ])
        .then(loadedAssets => {
          resolve({
            type,
            loadedAssets: this.createAssetsObjectByKey(loadedAssets)
          });
        })
        .catch((error) => {
          reject(new Error(`Problem loading assets of type ${type}...`));
        });
    });
  };

  componentDidMount() {
    Promise.all([this.loadAssetType('images', imageLoader)]).then(
      loadedBundles => {
        /* Here we receive an array of bundles with the type and the loaded asset information */
        this.setState({
          loaded: true,
          /* Create a key for each bundle type */
          loadedAssets: this.getBundlesAsKeys(loadedBundles)
        });
      }
    ).catch((error) => {
      console.error(error);
    })
  }

  render() {
    return (
      <AssetContext.Provider value={this.state.loadedAssets}>
        {this.props.children(this.state.loaded)}
      </AssetContext.Provider>
    );
  }
}

export function withAssets(Component) {
  return function WrapperComponent(props) {
    return (
      <AssetContext.Consumer>
        {value => <Component {...props} assets={value} />}
      </AssetContext.Consumer>
    );
  };
}
