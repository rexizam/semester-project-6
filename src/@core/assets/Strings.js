/**
 * -  This file is a repository of all strings used throughout the application.
 * -  The structure is root directory and adherent components i.e. "error" or in the case of reused components
 * i.e. "Movies", the differentiator strings. Some of the strings are also prefixed with the component name,
 * i.e. "NOT_AUTHORIZED_XXXXXX" to explicitly state the component in which they are used.
 * -  The letters "B", "S", "H" etc. are used to denote either the HTML element, i.e. "H" is for header or position
 * "B" is for bottom.
 * @type {string} String labels used throughout the application.
 */

/*
    --- General ---
 */
export const EMPTY_STRING = '';

/*
    --- Navigation paths ---
 */
export const HOME = '/';
export const LOGIN = '/login';
export const LOGIN_V2 = '/pages/login-v2'

/*
    --- Movie component request types ---
 */
export const SEARCH = 'search';
export const POPULAR = 'popular';
export const FEATURED = 'featured';
export const FAVOURITES = 'favourites';

/*
      --- Error ---
 */
// Not Authorized
export const NOT_AUTHORIZED_HEADER = 'SEP6 Movies';
export const NOT_AUTHORIZED_H_MESSAGE = 'You are not authorized! 🔐';
export const NOT_AUTHORIZED_P_MESSAGE = 'The Webtrends Marketing Lab website in IIS uses the default IUSR account credentials to access the web pages it serves.';
export const NOT_AUTHORIZED_BUTTON_R_MESSAGE = 'Back to login';
export const NOT_AUTHORIZED_IMAGE_ALT_MESSAGE = 'Not authorized page.';
// Error
export const ERROR_HEADER = 'Movies App';
export const ERROR_H_MESSAGE = 'Page Not Found 🕵🏻‍♀️';
export const ERROR_P_MESSAGE = 'Oops! 😖 The requested URL was not found on this server.';
export const ERROR_BUTTON_R_MESSAGE = 'Back to home';
export const ERROR__IMAGE_ALT_MESSAGE = NOT_AUTHORIZED_IMAGE_ALT_MESSAGE;

/*
    --- Authentication ---
 */
// Reset Password
export const RESET_PASSWORD_HEADER = 'Movies App';
export const RESET_PASSWORD_CARD_TITLE = 'Reset Password 🔒';
export const RESET_PASSWORD_CARD_TEXT = 'Your new password must be different from previously used passwords';
export const RESET_PASSWORD_NEW_PASSWORD_LABEL = 'New Password';
export const RESET_PASSWORD_CONFIRM_PASSWORD_LABEL = 'Confirm Password';
export const RESET_PASSWORD_BUTTON_R_MESSAGE = 'Set New Password';
export const RESET_PASSWORD_SPAN_LABEL = 'Back to login';

// Register
// Terms
export const REGISTER_TERMS_BASE = 'I agree to';
export const REGISTER_TERMS_ANCHOR = 'privacy policy & terms';
// Toast
export const REGISTER_TOAST_GREETING = 'Welcome ,';
export const REGISTER_TOAST_BODY_MESSAGE = 'You have successfully logged in. Now you can start to explore. Enjoy!';
// Component
export const REGISTER_HEADER = 'Movies App';
export const REGISTER_CARD_TITLE = 'Adventure starts here 🚀';
export const REGISTER_CARD_TEXT = 'Register and start exploring new movies and TV shows!';
// Form
export const REGISTER_FORM_USERNAME_LABEL = 'Username';
export const REGISTER_FORM_EMAIL_LABEL = 'Email';
export const REGISTER_FORM_PASSWORD_LABEL = 'Password';
export const REGISTER_FORM_BUTTON_R_MESSAGE = 'Sign up';
// Paragraph
export const REGISTER_P_S_TOP_LABEL = 'Already have an account?';
export const REGISTER_P_S_B_LABEL = 'Sign in instead';

/*
    --- Login ---
 */