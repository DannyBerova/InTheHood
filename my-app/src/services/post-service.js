import requester from '../data-fetch/requester';

class PostService {
    
    async all() {  
        try {
            return await requester.get(`/post`); 
        } catch(err) {
            return err;
        }           
    }

    async postDetails(id) {  
        try {
            return await requester.get(`/post/details/${id}`); 
        } catch(err) {
            return err;
        }           
    }

    async create(post) {  
        try {
            return await requester.post(`/post/create`, post); 
        } catch(err) {
            return err;
        }           
    }

    async edit(post) {  
        try {
            return await requester.post(`/post/edit/${post.id}`, post.postData); 
        } catch(err) {
            return err;
        }           
    }

    async remove(obj) {
        let data = {creatorId: obj.creatorId}  
        try {
            return await requester.delete(`/post/remove/${obj.id}`, data); 
        } catch(err) {
            return err;
        }           
    }
    
    async latest(id) {  
        try {
            return await requester.get(`/post/latest`); 
        } catch(err) {
            return err;
        }           
    }

    async star(id) {  
        try {
            return await requester.post(`/post/star/${id}`); 
        } catch(err) {
            return err;
        }           
    }

    async unstar(id) {  
        try {
            return await requester.post(`/post/unstar/${id}`); 
        } catch(err) {
            return err;
        }           
    }



  
}

export default PostService;