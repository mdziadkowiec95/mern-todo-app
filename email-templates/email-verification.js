module.exports = generateEmailVerificationTemplate = (userName, href) => `
    <h3>Hello ${userName},</h3>
    <p>Thank you for joining <strong>Productive App.</strong></p> 
    <p>Please verify your account by clicking the <a href="${href}">confirmation link</a>.</p>
`;
