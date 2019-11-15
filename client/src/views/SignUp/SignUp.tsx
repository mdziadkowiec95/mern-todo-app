import React from 'react';
import SignUpFormContainer from '../../containers/SignUpFormContainer/SignUpFormContainer';
import MainTemplate from '../../templates/MainTemplate/MainTemplate';

const SignUp: React.FC = () => {
  return (
    <MainTemplate>
      <SignUpFormContainer />
    </MainTemplate>
  );
};

export default SignUp;
