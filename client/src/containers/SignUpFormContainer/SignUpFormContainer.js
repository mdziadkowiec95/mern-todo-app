import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import TextField from '../../components/atoms/TextField/TextField'
import Button from '../../components/atoms/Button/Button'
import FormErrorMessage from '../../components/atoms/FormErrorMessage/FormErrorMessage'
import { registerUser } from '../../store/auth/thunks'
import FormWrapper from '../../templates/FormWrapper/FormWrapper'
import { withRouter } from 'react-router'
import { compose } from 'redux'

class SignUpFormInner extends Component {
  render() {
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = this.props

    return (
      <FormWrapper>
        <form onSubmit={handleSubmit}>
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
    )
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
})

const SignUpFormContainer = withFormik({
  mapPropsToValues: () => ({
    userName: '',
    userEmail: '',
    password: '',
    passwordConfirm: '',
  }),
  validationSchema: SignUpSchema,

  handleSubmit(
    { userName, userEmail, password, passwordConfirm },
    { props, setSubmitting, resetForm, setFieldValue },
  ) {
    const userData = {
      name: userName,
      email: userEmail,
      password: password,
      passwordConfirm: passwordConfirm,
    }

    // Run Redux action with onSucces and onError callbacks
    const onSuccess = () => {
      resetForm()
      setSubmitting(false)
      props.history.push('/sign-in')
    }

    const onError = () => {
      setFieldValue('password', '')
      setFieldValue('passwordConfirm', '')
      setSubmitting(false)
    };

    props.registerUser(
      userData,
      onSuccess,
      onError
    )
  },
})(SignUpFormInner)

SignUpFormInner.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => bindActionCreators({ registerUser }, dispatch)

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SignUpFormContainer)
