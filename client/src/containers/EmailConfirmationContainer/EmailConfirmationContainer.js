import React, { Component } from 'react'
import Loader from '../../components/atoms/Loader/Loader'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { confirmEmail, resendConfirmEmail } from '../../store/auth/thunks'
import ConfirmationResendFormContainer from '../ConfirmationResendFormContainer/ConfirmationResendFormContainer'
import Button from '../../components/atoms/Button/Button'
import Heading from '../../components/atoms/Heading/Heading'
import FormWrapper from '../../templates/FormWrapper/FormWrapper'

class EmailConfirmationContainer extends Component {
  componentDidMount() {
    const token = this.props.match.params.token
    this.props.confirmEmail(token)
  }

  render() {
    const { isLoading, isVerified, tokenExpired, tokenResend, resendConfirmEmail } = this.props

    if (isLoading) return <Loader fullScreen />

    return (
      <div>
        {isVerified && (
          <FormWrapper>
            <div className="text-center">
              <Heading center>Email has been verified.</Heading>
              <p>You can sign in.</p>
              <Button primary asRouterLink goTo="/sign-in">
                Sign in
              </Button>
            </div>
          </FormWrapper>
        )}
        {!isVerified && tokenExpired && (
          <>
            <ConfirmationResendFormContainer
              resendConfirmEmail={resendConfirmEmail}
              tokenResend={tokenResend}
            />
          </>
        )}
      </div>
    )
  }
}

EmailConfirmationContainer.propTypes = {
  match: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isVerified: PropTypes.bool.isRequired,
  tokenExpired: PropTypes.bool.isRequired,
  tokenResend: PropTypes.bool.isRequired,
  resendConfirmEmail: PropTypes.func.isRequired,
  confirmEmail: PropTypes.func.isRequired,
}

const mapStateToProps = ({ auth: { isLoading, verification } }) => ({
  isLoading,
  isVerified: verification.isVerified,
  tokenExpired: verification.tokenExpired,
  tokenResend: verification.tokenResend,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ confirmEmail, resendConfirmEmail }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmationContainer)
