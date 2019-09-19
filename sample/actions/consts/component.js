import React from 'react';
import { connect } from 'react-redux';

export const SIMPLE_ACTION = 'SIMPLE_ACTION';

class SimplestThingThatCouldPossiblyWork extends React.Component {

  onClick = () => {
    this.props.dispatch({ type: SIMPLE_ACTION, value: this.input.value });
  };

  render() {
    return (
      <div>
        <input ref={c => this.input = c} type="text" />
        <button onClick={this.onClick}>Submit</button>
      </div>
    );
  }
}

export default connect()(SimplestThingThatCouldPossiblyWork);
