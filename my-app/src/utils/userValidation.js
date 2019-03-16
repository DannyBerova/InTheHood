import validator from 'validator';
import { toast } from 'react-toastify';

function isUserDataValid(state, option) {
    const globalError = 'Check your form for errors!';
    const usernameError = "Username must be at least 4 symbols and less than 30 symbols.";
    const firstNameError = "First name must be at least 2 symbols and less than 30 symbols.";
    const lastNameError = "Last name must be at least 2 symbols and less than 30 symbols.";
    const emailError = "Please provide a correct email address!";
    const passwordError = "Password must be at least 6 characters long";
    const repeatPassError = "Password and Repeat Password must match";
    const avatarError = "Please provide a correct URL!";
    const STRING = 'string'
    
    let isValid = true;
    let errors = {};
    let payload = state.userData;
    
    if(!payload || typeof payload.username !== STRING || payload.username.length < 4 || payload.username.length > 30) {
        errors.username = usernameError;
        isValid = false;
    }
    if(!payload || typeof payload.password !== STRING || payload.password.trim().length < 6) {
        errors.password = passwordError
        isValid = false;
    }
    
    if(option === 'register') {
        if(!payload || typeof payload.repeatPass !== STRING || !validator.equals(payload.password, payload.repeatPass)) {
            errors.repeatPass = repeatPassError;
            isValid = false;
            }

        if(!payload || typeof payload.firstName !== STRING || payload.firstName.length < 2 || payload.firstName.length > 30) {
        errors.firstName = firstNameError;
        isValid = false;
        }

        if(!payload || typeof payload.lastName !== STRING || payload.lastName.length < 2 || payload.lastName.length > 30 > 30) {
            errors.lastName = lastNameError;
            isValid = false;
        }

        if(!payload || typeof payload.email !== STRING || !validator.isEmail(payload.email)) {
            errors.email = emailError;
            isValid = false;
        }

        if(payload.avatar && !validator.isURL(payload.avatar)) {
            errors.avatar = avatarError;
            isValid = false;
        }

    } 
    if(!isValid) toast.error(globalError)   

    return {isValid, errors};
}

export default isUserDataValid;