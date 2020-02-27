import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import TextField from '../../components/atoms/TextField/TextField'
import Button from '../../components/atoms/Button/Button'
import FormErrorMessage from '../../components/atoms/FormErrorMessage/FormErrorMessage'
import { loginUser } from '../../store/auth/thunks'
import FormWrapper from '../../templates/FormWrapper/FormWrapper'
import Heading from '../../components/atoms/Heading/Heading'

class SignInFormInner extends Component {
  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    } = this.props

    return (
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Heading primary>Sign In</Heading>
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
          <Button isSubmit isBlock primary disabled={isSubmitting}>
            Sign In
          </Button>
        </form>
      </FormWrapper>
    )
  }
}

const SignInSchema = Yup.object().shape({
  userEmail: Yup.string()
    .email('Email is not valid')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password needs to be at least 8 characters long')
    .required('Password is required'),
})

const SignInFormContainer = withFormik({
  mapPropsToValues: () => ({
    userEmail: '',
    password: '',
  }),
  validationSchema: SignInSchema,

  async handleSubmit({ userEmail, password }, { props, resetForm, setFieldValue }) {
    const userData = {
      email: userEmail,
      password: password,
    }

    const onSuccess = () => {
      resetForm()
    }
    const onError = () => {
      setFieldValue('password', '')
    }

    await props.loginUser(userData, onSuccess, onError)
  },
})(SignInFormInner)

SignInFormInner.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool.isRequired,
}

const mapDispatchToProps = dispatch => bindActionCreators({ loginUser }, dispatch)

export default connect(null, mapDispatchToProps)(SignInFormContainer)
