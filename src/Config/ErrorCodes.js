//TODO: Move this into localization
const ErrorCodes = {
    'default': 'An unknown error has occured.',
    'not_found': 'Sorry, the email or password you entered is incorrect. Please try logging in again or contact your HR administrator.',
    'verification_needed': '',
    'token_not_valid': 'Your reset password link is not valid. Please request a new reset link.',
    'validation_error': 'The information you provided is not valid, please make sure it is correct. If the issue persists contact your HR Administrator.',
    'card_declined': 'Card Declined',
    'routing_number_invalid': "We couldn't find a bank associated with that routing number. Please verify you have entered it correctly.",
    'invalid_address': "Your address information is invalid"
}

const DefaultErrorCode = 'default'

export {
    ErrorCodes,
    DefaultErrorCode,
}
