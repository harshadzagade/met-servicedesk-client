import React, { useEffect } from 'react';
import '../src/css/style.css';
import Routing from './Routing/Routing';

const App = () => {
  useEffect(() => {
    const currentUrl = window.location.href;
    const handlePopState = () => {
      if (window.location.href !== currentUrl) {
        window.history.pushState(null, '', currentUrl);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  return (
    <Routing />
  );
};

export default App;