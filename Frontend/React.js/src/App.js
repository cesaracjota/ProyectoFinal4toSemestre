import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const Home = React.lazy(() => import('./views/pages/home/LandingPage'))

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route path="/register" name="Register Page" render={props => <Register {...props}/>}/>
              <Route path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              
              <Route path="/dashboard" name="Admin" render={props => <TheLayout {...props}/>} />
              <Route exact path="/" name="Home" render={props => <Home {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
