import React from 'react';
import { connect } from 'react-redux';
import { addAction } from '../actions/point';

class Point extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0
    };
    this.add = this.add.bind(this);
    this.handClickAdd = this.handClickAdd.bind(this);
    this.handClickAddAsync = this.handClickAddAsync.bind(this);
  }
  add() {
    this.setState(prevState => {
      return {
        num: (prevState.num += 1)
      };
    });
  }
  handClickAdd() {
    this.props.add({
      num: 10
    })
  }
  handClickAddAsync() {
    this.props.addAsync()
  }
  render() {
    return (
      <div>
        <span>{this.props.num}</span>
        <button onClick={this.handClickAdd}>+</button>
        <button onClick={this.handClickAddAsync}>async</button>
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
    add: (payload) => dispatch(addAction(payload)),
    addAsync: () => dispatch({type: 'ADDASYNC_SAGA'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Point);
