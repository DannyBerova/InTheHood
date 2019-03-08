import requester from '../data-fetch/requester';

class UserService {
    
    async all() {  
        try {
            return await requester.get(`/user/all`); 
        } catch(err) {
            return err;
        }           
    }

    async userDetails(id) {  
        try {
            return await requester.get(`/user/details/${id}`); 
        } catch(err) {
            return err;
        }           
    }

    async block(id) {  
        try {
            return await requester.get(`/user/block/${id}`); 
        } catch(err) {
            return err;
        }           
    }

    async unblock(id) {  
        try {
            return await requester.get(`/user/unblock/${id}`); 
        } catch(err) {
            return err;
        }           
    }

  
}

export default UserService;