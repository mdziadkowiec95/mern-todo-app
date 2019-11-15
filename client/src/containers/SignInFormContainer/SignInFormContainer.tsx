import React, { Component } from 'react';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/atoms/TextField/TextField';
import Button from '../../components/atoms/Button/Button';
import FormErrorMessage from '../../components/atoms/FormErrorMessage/FormErrorMessage';
import { AppState } from '../../store/rootReducer';
import { loginUser } from '../../store/auth/thunks';
import Loader from '../../components/atoms/Loader/Loader';
import FormWrapper from '../../templates/FormWrapper/FormWrapper';

type SignInFormProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

type FormValues = {
  userEmail: string;
  password: string;
};

type SignInFormState = {
  userEmail: string;
  password: string;
};

class SignInFormInner extends Component<
  SignInFormProps & FormikProps<FormValues>,
  SignInFormState
> {
  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      // isSubmitting,
      auth: { isLoading },
    } = this.props;

    return (
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          {isLoading && <Loader isLarge fullScreen />}
          <TextField
            isError={errors.userEmail && touched.userEmail}
            isSolid
            onChangeFn={handleChange}
            onBlurFn={handleBlur}
            inputValue={values.userEmail}
            name="userEmail"
            placeholder="Your email"
          />
          {errors.userEmail && touched.userEmail && <FormErrorMessage errors={errors.userEmail} />}
          <TextField
            isError={errors.password && touched.password}
            isSolid
            onChangeFn={handleChange}
            onBlurFn={handleBlur}
            inputValue={values.password}
            name="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && touched.password && <FormErrorMessage errors={errors.password} />}
          <Button isSubmit isBlock primary>
            Sign In
          </Button>
        </form>
      </FormWrapper>
    );
  }
}

const SignInSchema = Yup.object().shape({
  userEmail: Yup.string()
    .email('Email is not valid')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password needs to be at least 8 characters long')
    .required('Password is required'),
});

const SignInFormContainer = withFormik<SignInFormProps, FormValues>({
  mapPropsToValues: props => ({
    userEmail: '',
    password: '',
  }),
  validationSchema: SignInSchema,

  handleSubmit(
    { userEmail, password }: FormValues,
    { props, setSubmitting, setErrors, resetForm, setFieldValue }
  ) {
    const userData = {
      email: userEmail,
      password: password,
    };
    // Run Redux action with onSucces and onError callbacks
    props.loginUser(
      userData,
      () => {
        resetForm();
        setSubmitting(false);
      },
      () => {
        setFieldValue('password', '');
        setSubmitting(false);
      }
    );
  },
})(SignInFormInner);

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ loginUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignInFormContainer);
