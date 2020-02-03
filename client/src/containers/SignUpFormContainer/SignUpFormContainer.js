import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import config from '../../config'
import TextField from '../../components/atoms/TextField/TextField'
import Button from '../../components/atoms/Button/Button'
import IconSVG from '../../components/atoms/IconSVG/IconSVG'
import FormErrorMessage from '../../components/atoms/FormErrorMessage/FormErrorMessage'
import { registerUser } from '../../store/auth/thunks'
import FormWrapper from '../../templates/FormWrapper/FormWrapper'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import Heading from '../../components/atoms/Heading/Heading'

class SignUpFormInner extends Component {
  render() {
    const { status, values, errors, touched, handleChange, handleBlur, handleSubmit } = this.props

    return (
      <FormWrapper>
        {!status.confirmationSent ? (
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
          </form>) : (
          <div className="text-center">
            <IconSVG name="check" size="40px" fill={config.colors['success-bg']}/>
            <Heading primary tagSize={2}>Your account has been created!</Heading>
            <p>Please check your email and confirm your account.</p>
            <p>After that you can sign in.</p>
            <Button asRouterLink goTo="/sign-in" isBlock primary>
              Sign In
            </Button>
          </div>
        )}
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
  mapPropsToStatus: () => ({
    confirmationSent: false
  }),
  mapPropsToValues: () => ({
    userName: '',
    userEmail: '',
    password: '',
    passwordConfirm: '',
  }),
  validationSchema: SignUpSchema,

  handleSubmit(
    { userName, userEmail, password, passwordConfirm },
    { props, setSubmitting, setStatus, resetForm, setFieldValue },
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
      setStatus({
        confirmationSent: true
      })
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
  status: PropTypes.shape({
    confirmationSent: PropTypes.bool.isRequired
  }),
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
