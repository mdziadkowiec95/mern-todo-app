import React from 'react';
import SignUpFormContainer from '../../containers/SignUpFormContainer/SignUpFormContainer';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';

const SignUp: React.FC = () => {
  return (
    <ContentTemplate>
      <SignUpFormContainer />
    </ContentTemplate>
  );
};

export default SignUp;
