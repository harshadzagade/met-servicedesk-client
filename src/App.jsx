import classes from './App.module.css';
import Routers from './utils/Routers';

const App = () => {
  return (
    <div className={classes.app}>
      <Routers />
    </div>
  );
};

export default App;