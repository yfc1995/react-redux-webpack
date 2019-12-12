import React from 'react';
import './App.css';
import Point from './pages/Point';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asideList: [
        { name: '二维图形', list: [{name:'点', path: '/point'}, {name:'线', path: '/line'}, {name:'三角形', path: '/triangle'}] },
        { name: '三维图形', list: [{name:'平移', path: '/move'}, {name:'旋转', path: '/rotate'}, {name:'缩放', path: '/zoom'}] }
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
            onMouseOver={e => this.mouseoverList(index, lis.name, e)}
            onClick={e => this.clickList(lis.name, e)}
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
          <div>
            <Route path="/" exact render={()=>
              (<div>首页</div>)
            }/>
            <Route path="/point" component={Point}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
