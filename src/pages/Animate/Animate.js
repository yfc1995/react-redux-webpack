import React from 'react';
import './Animate.css';
import AnimatePentagram from '../../drawJs/Animate';
import getGl from '../../drawJs/getWebGlContext';
import { connect } from 'react-redux';
import { speedP, speedL, direction } from '../../actions/Animate';
class Animate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starts: {}
    };
    this.sppedpClick = this.sppedpClick.bind(this);
    this.speedlClick = this.speedlClick.bind(this);
    this.directionClick = this.directionClick.bind(this);
  }
  componentDidMount() {
    const starsOne = new AnimatePentagram(getGl('starsOne'), 45.0, 5);
    this.setState({
      starts: starsOne
    });
  }
  sppedpClick() {
    this.props.speedP();
    this.state.starts.changeSpeed(this.props.animatePentagram.speed);
  }
  speedlClick() {
    this.props.speedL();
    this.state.starts.changeSpeed(this.props.animatePentagram.speed);
  }
  directionClick() {
    this.props.direction();
    this.state.starts.direction(this.props.animatePentagram.direction)
  }
  render() {
    return (
      <div className="animate">
        <div>
          <canvas id="starsOne" width="400" height="400"></canvas>
        </div>
        <div className="button">
    <button onClick={this.sppedpClick}>加速{this.props.animatePentagram.speed}</button>
          <button onClick={this.speedlClick}>减速</button>
          <button onClick={this.directionClick}>翻转</button>
        </div>
      </div>
    );
  }
}

function mapStateToprops(state) {
  return {
    animatePentagram: state.animatePentagram
  }
}

function mapDispatchToProps(dispatch) {
  return {
    speedP: () => {dispatch(speedP())},
    speedL: () => {dispatch(speedL())},
    direction: () => {dispatch(direction())}
  }
}
export default connect(mapStateToprops, mapDispatchToProps)(Animate);
