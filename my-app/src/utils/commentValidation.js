import { toast } from 'react-toastify';

function isCommentValid(state) {
    const globalError = 'Check your form for errors!';
    const contentError = "Content is required! Content must be between 3 and 400 symbols!";
    const STRING = 'string';
    
    let isValid = true;
    let errors = {};
    let payload = state.comment;
    
    if(!payload || typeof payload.content !== STRING || payload.content.trim().length < 3 || payload.content.trim().length > 400) {
        errors.content = contentError
        isValid = false;
    }
    if(!isValid) {toast.error(globalError)}

    return {isValid, errors};
}

export default isCommentValid;