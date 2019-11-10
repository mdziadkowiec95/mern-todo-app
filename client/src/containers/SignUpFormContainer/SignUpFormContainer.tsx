import React, { Component } from 'react';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/atoms/TextField/TextField';
import Button from '../../components/atoms/Button/Button';
import FormErrorMessage from '../../components/atoms/FormErrorMessage/FormErrorMessage';
import styles from './SignUpFormContainer.module.scss';

type SignUpFormProps = {};

type FormValues = {
  userName: string;
  userEmail: string;
  password: string;
  passwordConfirm: string;
};

type FormProps = {};

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
      isSubmitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <h2>Sign Up</h2>
        <TextField
          isError={errors.userName && touched.userName}
          isSolid
          onChangeFn={handleChange}
          onBlurFn={handleBlur}
          inputValue={values.userName}
          name="userName"
          placeholder="Your name"
        />
        {errors.userName && touched.userName && (
          <FormErrorMessage errors={errors.userName} />
        )}
        <TextField
          isError={errors.userEmail && touched.userEmail}
          isSolid
          onChangeFn={handleChange}
          onBlurFn={handleBlur}
          inputValue={values.userEmail}
          name="userEmail"
          placeholder="Your email"
        />
        {errors.userEmail && touched.userEmail && (
          <FormErrorMessage errors={errors.userEmail} />
        )}
        <TextField
          isError={errors.password && touched.password}
          isSolid
          onChangeFn={handleChange}
          onBlurFn={handleBlur}
          inputValue={values.password}
          name="password"
          placeholder="Password"
        />
        {errors.password && touched.password && (
          <FormErrorMessage errors={errors.password} />
        )}
        <TextField
          isError={errors.passwordConfirm && touched.passwordConfirm}
          isSolid
          onChangeFn={handleChange}
          onBlurFn={handleBlur}
          inputValue={values.passwordConfirm}
          name="passwordConfirm"
          placeholder="Confirm Password"
        />
        {errors.passwordConfirm && touched.passwordConfirm && (
          <FormErrorMessage errors={errors.passwordConfirm} />
        )}
        <Button isSubmit isBlock primary>
          Sign Up
        </Button>
      </form>
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
    .min(2, 'Password needs to be at least 8 characters long')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .min(2, 'Confirm Password needs to be at least 8 characters long')
    .required('Confirm Password is required')
});

const SignUpFormContainer = withFormik<FormProps, FormValues>({
  mapPropsToValues: props => ({
    userName: '',
    userEmail: '',
    password: '',
    passwordConfirm: ''
  }),
  validationSchema: SignUpSchema,

  handleSubmit(
    { userName, userEmail, password, passwordConfirm }: FormValues,
    { props, setSubmitting, setErrors }
  ) {
    setTimeout(() => {
      alert(
        JSON.stringify(
          { userName, userEmail, password, passwordConfirm },
          null,
          2
        )
      );
      setSubmitting(false);
    }, 1000);
  }
})(SignUpFormInner);

export default SignUpFormContainer;
