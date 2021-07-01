import { Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SingUp from '../pages/SignUp';
import Route from './Routes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SingUp} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
}

export default Routes;
