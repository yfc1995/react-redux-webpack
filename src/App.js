import React from 'react';
import './App.css';
import Point from './pages/Point';
import LookAtMatrix from './pages/LookAtMatrix/LooaAtMatrix';
import Animate from './pages/Animate/Animate'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asideList: [
        // { name: '二维图形', list: [{name:'点', path: '/point'}, {name:'线', path: '/line'}, {name:'三角形', path: '/triangle'}] },
        { name: '三维图形', list: [{name:'视图矩阵', path: '/lookAtMatrix'}, {name:'正射投影矩阵', path: '/orthonormalProjectionMatrix'}, {name:'动画', path: '/animate'}] }
      ],
      chooseIndex: ''
    };
  }
  componentDidMount() {
    const index = this.state.asideList[0].list[0].name + 0;
    this.setState({
      chooseIndex: index
    });
  }
  clickList(name, e) {
   
  }
  mouseoverList(index, name) {
    console.log(index, name);
    this.setState({
      chooseIndex: name + index
    });
  }
  render() {
    const asideListName = this.state.asideList.map(item => {
      const listName = item.list.map((lis, index) => (
        <Link to={lis.path} key={lis.name}>
          <span
            data-name={lis.name}
            onClick={e => this.mouseoverList(index,lis.name, e)}
            className={
              lis.name + index === this.state.chooseIndex ? 'listActive' : ''
            }
          >
            {lis.name}
          </span>
        </Link>
      ));
      return (
        <li key={item.name}>
          <span>{item.name}</span>
          <div>{listName}</div>
        </li>
      );
    });
    return (
      <div className="App">
        <Router>
          <aside className="aside">
            <ul>{asideListName}</ul>
          </aside>
          <div className="appChild">
            <Route path="/" exact render={()=>
              (<div>首页</div>)
            }/>
            <Route path="/point" component={Point}/>
            <Route path="/lookAtMatrix" component={LookAtMatrix}/>
            <Route path="/animate" component={Animate}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
