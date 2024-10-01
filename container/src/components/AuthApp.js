import React, { useRef, useEffect } from 'react';
import { mount } from 'auth/AuthApp';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        // location.pathname is being passed by history.listen()
        if (history.location.pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn: () => {
        console.log('Container: User Signed In');
        onSignIn();
      },
    });

    // Any time there is a change in pathname inside the Marketing app
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
