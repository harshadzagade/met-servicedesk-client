import classes from './App.module.css';
import AuthProvider from './context/AuthContext/AuthProvider';
import Routers from './utils/Routers';

const App = () => {
  return (
    <div className={classes.app}>
      <AuthProvider>
        <Routers />
      </AuthProvider>
    </div>
  );
};

export default App;