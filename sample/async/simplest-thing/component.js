import React from 'react';
import { connect } from 'react-redux';
import { simpleAction } from 'actions';

class SimplestThingThatCouldPossiblyWork extends React.Component {

  onClick = () => {
    this.props.delayedSimpleAction(this.input.value);
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

const mapDispatchToProps = dispatch => ({
  delayedSimpleAction(value) {
    return simpleAction(dispatch)(value);
  }
});

export default connect(null, mapDispatchToProps)(SimplestThingThatCouldPossiblyWork);
