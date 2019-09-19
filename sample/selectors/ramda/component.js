import React from 'react';
import { connect } from 'react-redux';
import { simpleValue } from 'selectors';

class SimplestThingThatCouldPossiblyWork extends React.Component {

  render() {
    return (
      <div>
        <p>{this.props.simpleValue}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  simpleValue: getSimpleValue(state),
});

export default connect(mapStateToProps)(SimplestThingThatCouldPossiblyWork);
