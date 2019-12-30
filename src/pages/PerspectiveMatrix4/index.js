import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import getGl from '../../drawJs/getWebGlContext';
import SerPerspective from '../../components/setPerspective';
import SetVisualspace from '../../components/SetVisualspace';
import PerspectiveMatrixDraw from '../../drawJs/PerspectiveMatrixDraw';
class PerspectiveMatrix extends Component {
  constructor(props) {
    super(props);
    this.changeFar = this.changeFar.bind(this);
    this.changeFov = this.changeFov.bind(this);
    this.changeAspect = this.changeAspect.bind(this);
    this.changeNear = this.changeNear.bind(this);
    this.exChange = this.exChange.bind(this);
    this.eyChange = this.eyChange.bind(this);
    this.ezChange = this.ezChange.bind(this);
    this.pxChange = this.pxChange.bind(this);
    this.pyChange = this.pyChange.bind(this);
    this.pzChange = this.pzChange.bind(this);
    this.dxChange = this.dxChange.bind(this);
    this.dyChange = this.dyChange.bind(this);
    this.dzChange = this.dzChange.bind(this);
    this.state = {
      graphics: null
    }
  }
  componentDidMount() {
    const figure = new PerspectiveMatrixDraw(getGl('webgl'));
    this.setState({
      graphics: figure
    })
    figure.init();
  }
  changeFov(e, value) {
    this.setPerspective(0, value);
  }
  changeAspect(e, value) {
    this.setPerspective(1, value);
  }
  changeNear(e, value) {
    this.setPerspective(2, value);
  }
  changeFar(e, value) {
    this.setPerspective(3, value);
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
  setEye(index, value) {
    const look = this.props.per.look;
    look[index] = value;
    this.props.changeEye(look);
    this.state.graphics.setLook(this.props.per.look);
  }
  setPerspective(index, value) {
    const perspective = this.props.per.perspective;
    perspective[index] = value;
    this.props.changeEye(perspective);
    this.state.graphics.setPer(this.props.per.perspective);
  }
  render() {
    return (
      <div className="perspective">
        <div>
          <SerPerspective
            changeFov={this.changeFov}
            changeAspect={this.changeAspect}
            changeNear={this.changeNear}
            changeFar={this.changeFar}
          />
        </div>
        <canvas id="webgl" width="500" height="500"></canvas>
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
    per: state.perspective
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeEye: payload => {
      dispatch({ type: 'WATCHEYEFORPERSPECTIVE', payload });
    },
    changePerspective: payload => {
      dispatch({ type: 'WATCHPERSPECTIVE', payload });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PerspectiveMatrix);
