import React from 'react';

export default class Counter extends React.Component {
  static STOP = 0;
  static RUN = 1;
  static PAUSE = 2;

  static defaultProps = {
    interval: 1000,
    stage: Counter.STOP
  };

  state = {
    count: 0
  };

  tick = () => {
    if (this.props.stage === Counter.RUN) {
      if (this.props.onTick) {
        this.props.onTick();
      }
      
      this.counterId = setTimeout(() => {
        this.setState(
          {
            count: this.state.count + 1
          },
          this.tick
        );
      }, this.props.interval);
    }

    if (this.props.stage === Counter.PAUSE) {
      clearTimeout(this.counterId);
    }

    if (this.props.stage === Counter.STOP) {
      clearTimeout(this.counterId);
      this.setState({ count: 0 });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.stage !== this.props.stage) {
      this.tick();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.counterId);
  }

  render() {
    return <div>{this.props.children(this.state.count)}</div>;
  }
}
