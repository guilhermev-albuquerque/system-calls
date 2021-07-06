import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../contexts/auth';

function RouteWrapper({ component: Component, isPrivate, ...rest }) {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div></div>;
  }

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.func,
};

export default RouteWrapper;
