import React from 'react'
import EmailConfirmationContainer from '../../containers/EmailConfirmationContainer/EmailConfirmationContainer'
import MainTemplate from '../../templates/MainTemplate/MainTemplate'

const EmailConfirmation = ({ match }) => (
    <MainTemplate>
        <EmailConfirmationContainer match={match} />
    </MainTemplate>
)

export default EmailConfirmation