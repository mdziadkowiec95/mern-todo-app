import React, { Component } from 'react'
import * as Yup from 'yup'
import { withFormik } from 'formik'
import PropTypes from 'prop-types'
import FormWrapper from '../../templates/FormWrapper/FormWrapper'
import TextField from '../../components/atoms/TextField/TextField'
import Button from '../../components/atoms/Button/Button'
import FormErrorMessage from '../../components/atoms/FormErrorMessage/FormErrorMessage'
import Heading from '../../components/atoms/Heading/Heading'

class ConfirmationResendFormInner extends Component {
  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      tokenResend,
    } = this.props

    return (
      <FormWrapper>
        {!tokenResend ? (
          <form onSubmit={handleSubmit}>
            <h2>Resend confrimation email</h2>
            <p>This token has expired. Enter your email to send new token</p>
            <br />
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
            <Button isSubmit isBlock primary disabled={isSubmitting}>
              Resend
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <Heading center>Token has been resend!</Heading>
            <p>Check your email</p>
            <p>and</p>
            <Button primary asRouterLink goTo="/sign-in">
              Sign in
            </Button>
          </div>
        )}
      </FormWrapper>
    )
  }
}

ConfirmationResendFormInner.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool.isRequired,
  tokenResend: PropTypes.bool.isRequired,
}

const ConfirmationResendFormSchema = Yup.object().shape({
  userEmail: Yup.string()
    .email('Email is not valid')
    .required('Email is required'),
})

const ConfirmationResendFormContainer = withFormik({
  mapPropsToValues: () => ({
    userEmail: '',
  }),
  validationSchema: ConfirmationResendFormSchema,

  async handleSubmit({ userEmail }, { props }) {
    await props.resendConfirmEmail(userEmail)
  },
})(ConfirmationResendFormInner)

export default ConfirmationResendFormContainer
