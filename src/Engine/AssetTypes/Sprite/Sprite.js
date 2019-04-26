import React from 'react';
import styled from 'styled-components';

import { withAssets } from '../../AssetLoader'

export default withAssets(props => {
  if (Object.keys(props.assets.images).includes(props.id) === false) {
    return new Error(`Sprite id ${props.key} not valid`);
  }

  const { locator, size } = props.assets.images[props.id];
  return styled.div`
    width: ${size.x}px;
    height: ${size.y}px;
    background-image: url(${locator});
    background-repeat: no-repeat;

    ${this.props.styles}
  `;
});
