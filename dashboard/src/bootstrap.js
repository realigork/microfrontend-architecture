import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

// Mount function to start up the app
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

// If we are in development and in isolation,
// call mount immediately.
// Since we are using memory history here, the Marketing app
// will not update the browser url. We need a way to tell
// the browser to keep updating the pathname when
// navigating around using createBrowserHistory()
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');
  if (devRoot) {
    mount(devRoot);
  }
}

// Else, we are running through container
// and we should expose / export
// the mount function
export { mount };
