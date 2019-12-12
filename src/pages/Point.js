import React from 'react';

class Point extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0
    };
    this.add = this.add.bind(this);
  }
  add() {
    this.setState(prevState => {
      return {
        num: prevState.num += 1
      };
    });
    console.log(this.state)
  }
  render() {
    return (
      <div>
        <span>{this.state.num}</span>
        <button onClick={this.add}>+</button>
        <button>-</button>
      </div>
    );
  }
}

export default Point;
