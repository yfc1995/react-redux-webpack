import React from 'react';
import OPM from '../../drawJs/OrthonormalProjectionMatrix'
import getGl from '../../drawJs/getWebGlContext';
import SetLookAt from '../../components/SetLookAt';
import { connect } from 'react-redux';
import './style.css'
class OrthonormalProjectionMatrix extends React.Component {
  constructor(props) {
    super(props);
    this.leftChange = this.leftChange.bind(this);
    this.rightChange = this.rightChange.bind(this);
    this.topChange = this.topChange.bind(this);
    this.bottomChange = this.bottomChange.bind(this);
    this.nearChange = this.nearChange.bind(this);
    this.farChange = this.farChange.bind(this);
    this.state = {
      opmTarget: null
    }
  }
  componentDidMount() {
    const opm = new OPM(getGl('mygl'));
    opm.init();
    this.setState({
      opmTarget: opm
    })
  }
  leftChange(e, value) {
    this.getParams(value, 0)
  }
  rightChange(e, value) {
    this.getParams(value, 1)
  }
  topChange(e, value) {
    this.getParams(value, 2)
  }
  bottomChange(e, value) {
    this.getParams(value, 3)
  }
  nearChange(e, value) {
    this.getParams(value, 4)
  }
  farChange(e, value) {
    this.getParams(value, 5)
  }
  getParams(value, index) {
    const params = this.props.opm;
    params[index] = value;
    this.props.getP(params);
    this.state.opmTarget.setOPM(this.props.opm);
  }
  render() {
    return (
      <div className="opm">
        <canvas id="mygl" width="400" height="400"></canvas>
        <div className="sliderBox">
          <SetLookAt
            leftChange={this.leftChange}
            rightChange={this.rightChange}
            bottomChange={this.bottomChange}
            topChange={this.topChange}
            nearChange={this.nearChange}
            farChange={this.farChange}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    opm: state.opm.opm
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getP: (payload) => {dispatch({type: 'CHANGEOPMSAGA', payload})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrthonormalProjectionMatrix);
