import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  outline: none;
  z-index: 10;
`;

export default class Keyboard extends React.Component {
  state = {
    pressedKeys: []
  };

  // TODO: This shouldn't be here
  keyboardRef = React.createRef()
  componentDidMount() {
    if (this.keyboardRef) {
      this.keyboardRef.current.focus()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.pressedKeys.toString() === nextState.pressedKeys.toString()) {
      return false;
    }

    return true;
  }

  isAllowed = (key) => {
    return this.props.allowedKeys.includes(key)
  }

  handleKeyDown = event => {
    event.preventDefault();

    if (this.state.pressedKeys.includes(event.key) || this.isAllowed(event.key) === false) {
      return;
    }

    this.setState({
      pressedKeys: [...this.state.pressedKeys, event.key]
    });
  };

  handleKeyUp = event => {
    this.setState({
      pressedKeys: this.state.pressedKeys.filter(i => i !== event.key)
    });
  };

  render() {
    return (
      <Overlay
        tabIndex="0"
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        ref={this.keyboardRef}
      >
        {this.props.children(this.state.pressedKeys)}
      </Overlay>
    );
  }
}
