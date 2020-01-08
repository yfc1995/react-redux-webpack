import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Point from './pages/Point';
import LookAtMatrix from './pages/LookAtMatrix/LooaAtMatrix';
import Animate from './pages/Animate/Animate';
import OrthonormalProjectionMatrix from './pages/OrthonormalProjectionMatrix/OrthonormalProjectionMatrix';
import LookAtOrth from './pages/LookAndOrth/index';
import PerspectiveMatrix from './pages/PerspectiveMatrix4/index';
import Cube from './pages/Cube/index';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asideList: [
        {
          name: '二维世界',
          type: 'two',
          list: [
            { name: '点', path: '/point', type: 'point' },
            { name: '线', path: '/line', type: 'line' },
            { name: '三角形', path: '/triangle', type: 'triangle' },
            { name: '动画', path: '/animate', type: 'animate' }
          ]
        },
        {
          name: '三维世界',
          type: 'three',
          list: [
            { name: '视图矩阵', path: '/lookAtMatrix', type: 'lookAtMatrix' },
            {
              name: '正射投影矩阵',
              path: '/orthonormalProjectionMatrix',
              type: 'orthonormalProjectionMatrix'
            },
            { name: '视图正射结合', path: '/lookAtOrth', type: 'lookAtOrth' },
            {
              name: '透视投影矩阵',
              path: '/perspectiveMatrix',
              type: 'perspectiveMatrix'
            },
            { name: '正方体', path: '/cube', type: 'cube' }
          ]
        }
      ],
      chooseIndex: '',
      collapsed: false,
      openKeys: [],
      keyList: [],
      selectedKeys: []
    };
  }
  componentDidMount() {
    const defaultOpenKeys = this.state.asideList[0].type;
    const keyList = this.state.asideList.map( item => item.type);
    const selectedKeys = this.state.asideList[0].list[0].type;
    this.setState({
      openKeys: [defaultOpenKeys],
      keyList,
      selectedKeys
    })
    if (window.location.pathname && window.location.pathname.slice(1).length > 0) {
      const arr = this.state.asideList.find(item => item.list.find( it => it.type === window.location.pathname.slice(1)))
      this.setState({
        openKeys: [arr.type],
        selectedKeys: [window.location.pathname.slice(1)]
      })
    }
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  onOpenChange = openKeys  => {
    const latestOpenKey = openKeys.find( key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.keyList.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }
  onSelect = (item) => {
    this.setState({
      selectedKeys: item.selectedKeys
    })
  }
  render() {
    const asideListName = this.state.asideList.map(item => {
      const listName = item.list.map((lis, index) => (
        <Menu.Item key={lis.type}>
          <Link to={lis.path}>{lis.name}</Link>
        </Menu.Item>
      ));
      return (
        <SubMenu
          key={item.type}
          title={
            <span>
              <Icon type="user" />
              <span>{item.name}</span>
            </span>
          }
        >
          {listName}
        </SubMenu>
      );
    });
    return (
      <div className="App">
        <Layout>
          <Header style={{ padding: 0 }}>
            <div className="header" onClick={this.toggle}>webgl</div>
          </Header>
          <Layout>
            <Router>
              <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
              >
                <Menu
                  theme="dark"
                  mode="inline"
                  openKeys={this.state.openKeys}
                  selectedKeys={this.state.selectedKeys}
                  onOpenChange={this.onOpenChange}
                  onSelect={this.onSelect}
                >
                  {asideListName}
                </Menu>
              </Sider>
              <Content
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  background: '#fff',
                  minHeight: 480
                }}
              >
                <Route path="/" exact render={() => <div>首页</div>} />
                <Route path="/point" component={Point} />
                <Route path="/lookAtMatrix" component={LookAtMatrix} />
                <Route path="/animate" component={Animate} />
                <Route
                  path="/orthonormalProjectionMatrix"
                  component={OrthonormalProjectionMatrix}
                />
                <Route path="/lookAtOrth" component={LookAtOrth} />
                <Route
                  path="/perspectiveMatrix"
                  component={PerspectiveMatrix}
                />
                <Route path="/cube" component={Cube} />
              </Content>
            </Router>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
