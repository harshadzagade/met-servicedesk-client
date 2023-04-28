import classes from './App.module.css';
import Routing from './Utils/Routing';

const App = () => {
  return (
    <div className={`${classes.App} ${classes.noSelect}`}>
      <Routing />
    </div>
  );
};

export default App;