import validator from 'validator';
import { toast } from 'react-toastify';

function isPostValid(state) {
    const globalError = 'Check your form for errors!';
    const titleError = "Title is required! Title must be between 3 and 50 symbols!";
    const contentError = "Content is required! Content must be between 10 and 1024 symbols!";
    const imageUrlError = "Image URL must be valid URL!";
    const STRING = 'string';
    
    let isValid = true;
    let errors = {};
    let payload = state.post;
    
    if(!payload || typeof payload.title !== STRING || payload.title.trim().length < 3 || payload.title.trim().length > 50) {
        errors.title = titleError;
        isValid = false;
    }
    if(!payload || typeof payload.content !== STRING || payload.content.trim().length < 10 || payload.content.trim().length > 1024) {
        errors.content = contentError
        isValid = false;
    }

    if(payload.imageUrl && !validator.isURL(payload.imageUrl) ){
        errors.imageUrl = imageUrlError
        isValid = false;
    }
    if(!isValid) {toast.error(globalError)}

    return {isValid, errors};
}

export default isPostValid;