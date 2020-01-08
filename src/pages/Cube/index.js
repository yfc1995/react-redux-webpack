import React, { Component } from 'react';
import getGl from '../../drawJs/getWebGlContext';
import CubeDraw from '../../drawJs/CubeDraw';
import { connect } from 'react-redux';
import SetLookAtCommon from '../../components/SetLookAtCommon';
import './index.css'
class Cube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cube: null,
      type: true
    };
  }
  componentDidMount() {
    const cube = new CubeDraw(getGl('cube'));
    this.setState({
      cube
    });
  }
  btn = () => {
    this.setState((e) => ({
      type: !e.type
    }))
    if (this.state.type) {
      this.state.cube.tick();
      return
    }
    this.state.cube.cancel();
  };
  setLookAt = value => {
    this.props.dispatch({
      type: 'WATCHCHANGEEYEFORCUBE',
      payload: value
    });
    this.state.cube.setLook(this.props.cube.look);
  };
  render() {
    return (
      <div className="cube">
        <div className="canvas-box">
          <canvas width="500" height="500" id="cube"></canvas>
          <button onClick={this.btn}>{this.state.type ? '旋转' : '停止'}</button>
        </div>
        <div className="slide-box">
          <SetLookAtCommon
            data={this.props.cube.look}
            setLookAtFunction={this.setLookAt}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cube: state.cube
  };
}

export default connect(mapStateToProps)(Cube);
