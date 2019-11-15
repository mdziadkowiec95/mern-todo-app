import React from 'react';
import SignInFormContainer from '../../containers/SignInFormContainer/SignInFormContainer';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';

const SignIn: React.FC = () => {
  return (
    <MainTemplate>
      <SignInFormContainer />
    </MainTemplate>
  );
};

export default SignIn;
