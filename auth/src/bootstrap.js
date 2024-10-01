import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  // WHenever navigation occurs, the history is going to call any function
  // that we provide to the listen()
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      if (history.location.pathname !== nextPathname) {
        history.push(nextPathname);
      }
      console.log('Auth: container just navigated');
    },
  };
};

// If we are in development and in isolation,
// call mount immediately.
// Since we are using memory history here, the Marketing app
// will not update the browser url. We need a way to tell
// the browser to keep updating the pathname when
// navigating around using createBrowserHistory()
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// Else, we are running through container
// and we should expose / export
// the mount function
export { mount };
