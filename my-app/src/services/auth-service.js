import requester from '../data-fetch/requester';

class AuthService {  
    async register(user) {  
        try {
            return await requester.post(`/auth/signup`, user); 
        } catch(err) {
            return err;
        }           
    }

    async login(user) {
        try {
            return await requester.post(`/auth/login`, user);
        } catch(err) {
            return err;
        }
    }

    async logout() {
        try {
            return await requester.post(`/user/logout`);
        } catch(err) {
            return err; 
        }
    }  
}

export default AuthService;