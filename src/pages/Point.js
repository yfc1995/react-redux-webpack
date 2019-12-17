import React from 'react';
import { connect } from 'react-redux';
import { addActionAsync } from '../actions/point';

class Point extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0
    };
    this.add = this.add.bind(this);
    this.handClickAdd = this.handClickAdd.bind(this);
  }
  add() {
    this.setState(prevState => {
      return {
        num: (prevState.num += 1)
      };
    });
    console.log(this.state);
  }
  handClickAdd() {
    this.props.add({
      num: 10
    })
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <span>{this.props.num}</span>
        <button onClick={this.handClickAdd}>+</button>
        <button>-</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    num: state.point.num
  }
}
function mapDispatchToProps(dispatch) {
  return {
    add: (payload) => dispatch(addActionAsync(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Point);
