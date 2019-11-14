import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import Loader from '../components/atoms/Loader/Loader';
import { IAuthState } from '../store/auth/reducers';
import { AppState } from '../store/rootReducer';

interface IRedirectAuthToAppProps extends RouteProps {
  component: any;
  auth: IAuthState;
}

const RedirectAuthToApp: React.FC<IRedirectAuthToAppProps> = ({
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

        return isAuth ? <Redirect to="/app" /> : <Component {...props} />;
      }}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RedirectAuthToApp);
