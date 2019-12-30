import React, { Component } from 'react';
import SetVisualspace from '../../components/SetVisualspace';
import LookAtTriangle from '../../drawJs/LookAtMatrixTriangle';
import getGl from '../../drawJs/getWebGlContext';
import './LookAtMatrix.css';
import { changeEyes } from '../../actions/LookAtMatrix';
import { connect } from 'react-redux';
class LookAtMatrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gl: null,
      triangle: null
    };
    this.eyChange = this.eyChange.bind(this);
    this.exChange = this.exChange.bind(this);
    this.ezChange = this.ezChange.bind(this);
    this.pyChange = this.pyChange.bind(this);
    this.pxChange = this.pxChange.bind(this);
    this.pzChange = this.pzChange.bind(this);
    this.dyChange = this.dyChange.bind(this);
    this.dxChange = this.dxChange.bind(this);
    this.dzChange = this.dzChange.bind(this);
  }
  componentDidMount() {
    const triangle = new LookAtTriangle(getGl('webgl'));
    const gl = triangle.getGl();
    this.setState({
      gl: gl,
      triangle: triangle
    });
  }
  exChange(e, value) {
    this.getParams(value, 0);
  }
  eyChange(e, value) {
    this.getParams(value, 1);
  }
  ezChange(e, value) {
    this.getParams(value, 2);
  }
  pxChange(e, value) {
    this.getParams(value, 3);
  }
  pyChange(e, value) {
    this.getParams(value, 4);
  }
  pzChange(e, value) {
    this.getParams(value, 5);
  }
  dxChange(e, value) {
    this.getParams(value, 6);
  }
  dyChange(e, value) {
    this.getParams(value, 7);
  }
  dzChange(e, value) {
    this.getParams(value, 8);
  }
  getParams(value, index) {
    const param = this.props.params.lookat;
    param[index] = value;
    this.props.changey({
      param
    });
    this.state.triangle.changeView(this.props.params.lookat);
  }
  render() {
    return (
      <div className="lookAtMatrix">
        <canvas id="webgl" width="500" height="500"></canvas>
        <div className="sliderBox">
          <SetVisualspace
            name="hi"
            exChange={this.exChange}
            eyChange={this.eyChange}
            ezChange={this.ezChange}
            pxChange={this.exChange}
            pyChange={this.exChange}
            pzChange={this.exChange}
            dxChange={this.exChange}
            dyChange={this.exChange}
            dzChange={this.exChange}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    params: state.look
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changey: payload => {
      dispatch(changeEyes(payload));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LookAtMatrix);
