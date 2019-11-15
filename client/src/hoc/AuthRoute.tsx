import React, { useEffect, useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../store/rootReducer';
import { IAuthState } from '../store/auth/reducers';
import Loader from '../components/atoms/Loader/Loader';

interface IAuthRouteProps extends RouteProps {
  component: any;
  auth: IAuthState;
}

const AuthRoute: React.FC<IAuthRouteProps> = ({
  component: Component,
  auth: { isAuth, isLoading },
  ...rest
}) => {
  const [loadView, setLoadView] = useState<boolean>(false);

  useEffect(() => {
    if (loadView === false && !isLoading) {
      setLoadView(true);
    }
  }, [isLoading, loadView]);

  return (
    <Route
      {...rest}
      render={props => {
        if (!loadView) {
          return <Loader fullScreen />;
        }
        return !isAuth && !isLoading ? <Redirect to="/" /> : <Component {...props} />;
      }}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AuthRoute);
