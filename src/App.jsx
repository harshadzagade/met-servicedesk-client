import classes from './App.module.css';
import AdminProvider from './context/AdminContext/AdminProvider';
import AuthProvider from './context/AuthContext/AuthProvider';
import Routers from './utils/Routers';

const App = () => {
  return (
    <div className={classes.app}>
      <AuthProvider>
        <AdminProvider>
          <Routers />
        </AdminProvider>
      </AuthProvider>
    </div>
  );
};

export default App;