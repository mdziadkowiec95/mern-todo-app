import React, { Component } from 'react';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/atoms/TextField/TextField';
import Button from '../../components/atoms/Button/Button';
import FormErrorMessage from '../../components/atoms/FormErrorMessage/FormErrorMessage';
import { AppState } from '../../store/rootReducer';
import { registerUser } from '../../store/auth/thunks';
import Loader from '../../components/atoms/Loader/Loader';
import FormWrapper from '../../templates/FormWrapper/FormWrapper';

type SignUpFormProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

type FormValues = {
  userName: string;
  userEmail: string;
  password: string;
  passwordConfirm: string;
};

type SignUpFormState = {
  userEmail: string;
  userName: string;
  password: string;
  passwordConfirm: string;
};

class SignUpFormInner extends Component<
  SignUpFormProps & FormikProps<FormValues>,
  SignUpFormState
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
          <h2>Sign Up</h2>
          {isLoading && <Loader isLarge />}
          <TextField
            isError={errors.userName && touched.userName}
            isSolid
            onChangeFn={handleChange}
            onBlurFn={handleBlur}
            inputValue={values.userName}
            name="userName"
            placeholder="Your name"
          />
          {errors.userName && touched.userName && <FormErrorMessage errors={errors.userName} />}
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
          <TextField
            isError={errors.passwordConfirm && touched.passwordConfirm}
            isSolid
            onChangeFn={handleChange}
            onBlurFn={handleBlur}
            inputValue={values.passwordConfirm}
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
          />
          {errors.passwordConfirm && touched.passwordConfirm && (
            <FormErrorMessage errors={errors.passwordConfirm} />
          )}
          <Button isSubmit isBlock primary>
            Sign Up
          </Button>
        </form>
      </FormWrapper>
    );
  }
}

const SignUpSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Name needs to be at least 2 characters long')
    .max(25, 'Name can include at most 25 characters')
    .required('Name is required'),
  userEmail: Yup.string()
    .email('Email is not valid')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password needs to be at least 8 characters long')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .min(8, 'Confirm Password needs to be at least 8 characters long')
    .required('Confirm Password is required'),
});

const SignUpFormContainer = withFormik<SignUpFormProps, FormValues>({
  mapPropsToValues: props => ({
    userName: '',
    userEmail: '',
    password: '',
    passwordConfirm: '',
  }),
  validationSchema: SignUpSchema,

  handleSubmit(
    { userName, userEmail, password, passwordConfirm }: FormValues,
    { props, setSubmitting, setErrors, resetForm, setFieldValue }
  ) {
    const userData = {
      name: userName,
      email: userEmail,
      password: password,
      passwordConfirm: passwordConfirm,
    };

    // Run Redux action with onSucces and onError callbacks
    props.registerUser(
      userData,
      () => {
        resetForm();
        setSubmitting(false);
      },
      () => {
        setFieldValue('password', '');
        setFieldValue('passwordConfirm', '');
        setSubmitting(false);
      }
    );
  },
})(SignUpFormInner);

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ registerUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpFormContainer);
