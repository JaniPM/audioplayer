import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Songs } from './pages';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Songs} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  </Provider>
);

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.any.isRequired
};

export default App;
