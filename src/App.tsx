import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Feed from './screens/Feed';
import Login from './screens/Login';
import Profile from './screens/Profile';
import News from './screens/News';
import protection from './redux/decorator';
import constants from './constants';
import { setUser } from './redux/actions';
import { User } from './redux/reducer';

const ProtectedProfile = protection(Profile);

export interface AppProps extends RouteComponentProps {
  setUser: Function,
}
export interface AppState {
  activeTab: string,
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const { history, setUser } = props;
    const user = localStorage.getItem(constants.USER);
    if (user) {
      setUser(JSON.parse(user));
    }
    this.state = {
      activeTab: `${history.location.pathname}`,
    }
  }

  handleChange = (event: object, newValue: any) => this.setState({ activeTab: newValue });

  render() {
    const { activeTab } = this.state;

    return (
      <div style={{ maxWidth: 2000 }}>
        <Router>
          <AppBar position="static">
            <Tabs value={activeTab} onChange={this.handleChange}>
              <Tab label="Главная" value="/" component={Link} to="/" />
              <Tab label="Профиль" value="/profile" component={Link} to="/profile" />
              <Tab label="Новости" value="/news"  component={Link} to="/news" />
            </Tabs>
          </AppBar>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route path="/news" component={News} />
            <Route path="/profile" component={ProtectedProfile} />
            <Route path="/login" component={Login} />
            <Route component={() => <div>Page not Found</div>}/>
          </Switch>
        </div>
        </Router>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    setUser: (user: User) => dispatch(setUser(user)),
  }),
)(withRouter(App));
