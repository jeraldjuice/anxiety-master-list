import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import { Header, PageContainer } from 'components/layout';
import { ModalHandler } from 'components/modals';
import reducer from 'reducers';

const store = createStore(reducer, applyMiddleware(thunk, logger));

function App() {
  return (
      <Provider store={store}>
        <Router>
          <ModalHandler />
          <Header />
          <PageContainer />
        </Router>
      </Provider>
  );
}

export default App;