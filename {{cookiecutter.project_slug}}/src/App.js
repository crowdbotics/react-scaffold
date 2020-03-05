import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import {setupHttpConfig} from './utils/http';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

//@InertModuleDeclaration


class App extends Component {
  async componentWillMount() {
    setupHttpConfig();
  }

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
              {/*InsertModuleRouting*/}
             
              
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
