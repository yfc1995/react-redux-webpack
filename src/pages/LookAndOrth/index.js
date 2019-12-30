import React, { Component } from 'react';
import { connect } from 'react-redux';
import SetVisualspace from '../../components/SetVisualspace';
import SetLookAt from '../../components/SetLookAt';
import getGl from '../../drawJs/getWebGlContext';
import LookAndOrthDraw from '../../drawJs/LookAndOrth';
import './index.css';
class LookAndOrth extends Component {
  constructor(props) {
    super(props);
    this.exChange = this.exChange.bind(this);
    this.eyChange = this.eyChange.bind(this);
    this.ezChange = this.ezChange.bind(this);
    this.pxChange = this.pxChange.bind(this);
    this.pyChange = this.pyChange.bind(this);
    this.pzChange = this.pzChange.bind(this);
    this.dxChange = this.dxChange.bind(this);
    this.dyChange = this.dyChange.bind(this);
    this.dzChange = this.dzChange.bind(this);
    this.leftChange = this.leftChange.bind(this);
    this.rightChange = this.rightChange.bind(this);
    this.bottomChange = this.bottomChange.bind(this);
    this.topChange = this.topChange.bind(this);
    this.nearChange = this.nearChange.bind(this);
    this.farChange = this.farChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.state = {
      graphics: null
    }
  }
  componentDidMount() {
    const figure = new LookAndOrthDraw(getGl('webgl'));
    figure.init()
    this.setState({
      graphics: figure
    })
  }
  exChange(e, value) {
    this.setEye(0, value);
  }
  eyChange(e, value) {
    this.setEye(1, value);
  }
  ezChange(e, value) {
    this.setEye(2, value);
  }
  pxChange(e, value) {
    this.setEye(3, value);
  }
  pyChange(e, value) {
    this.setEye(4, value);
  }
  pzChange(e, value) {
    this.setEye(5, value);
  }
  dxChange(e, value) {
    this.setEye(6, value);
  }
  dyChange(e, value) {
    this.setEye(7, value);
  }
  dzChange(e, value) {
    this.setEye(8, value);
  }
  leftChange(e, value) {
    this.setOpm(0, value);
  }
  rightChange(e, value) {
    this.setOpm(1, value);
  }
  bottomChange(e, value) {
    this.setOpm(2, value);
  }
  topChange(e, value) {
    this.setOpm(3, value);
  }
  nearChange(e, value) {
    this.setOpm(4, value);
  }
  farChange(e, value) {
    this.setOpm(5, value);
  }
  buttonClick() {
    console.log(this.props);
  }
  setEye(index, value) {
    const eye = this.props.orth.eye;
    eye[index] = value;
    this.props.changeEye(eye);
    this.state.graphics.setEye(this.props.orth.eye);
  }
  setOpm(index, value) {
    const opm = this.props.orth.opm;
    opm[index] = value;
    this.props.changeEye(opm)
    this.state.graphics.setOpm(this.props.orth.opm);
  }
  render() {
    return (
      <div className="lookandorth">
        <div>
          <SetLookAt
            leftChange={this.leftChange}
            rightChange={this.rightChange}
            bottomChange={this.bottomChange}
            topChange={this.topChange}
            nearChange={this.nearChange}
            farChange={this.farChange}
          />
        </div>
        <canvas id="webgl" width="500" height="500"></canvas>
        <button onClick={this.buttonClick}>dianji</button>
        <div>
          <SetVisualspace
            name="hi"
            exChange={this.exChange}
            eyChange={this.eyChange}
            ezChange={this.ezChange}
            pxChange={this.pxChange}
            pyChange={this.pyChange}
            pzChange={this.pzChange}
            dxChange={this.dxChange}
            dyChange={this.dyChange}
            dzChange={this.dzChange}
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    orth: state.orth
  };
}
function mapDispathToProps(dispatch) {
  return {
    changeEye: payload => {
      dispatch({ type: 'lookAndOrthChangeEyeForSage', payload });
    },
    changeOpm: payload => {
      dispatch({ type: 'lookAndOrthChangeOpmForSage', payload });
    }
  };
}
export default connect(mapStateToProps, mapDispathToProps)(LookAndOrth);
