import { Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import SingUp from '../pages/SignUp';
import New from '../pages/New';
import Route from './Routes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SingUp} />

      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/customers" component={Customers} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate />
      <Route exact path="/new" component={New} isPrivate />
    </Switch>
  );
}

export default Routes;
