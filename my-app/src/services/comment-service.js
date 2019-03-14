import requester from '../data-fetch/requester';

class CommentService {
    
    async allByPost(id) {  
        try {
            return await requester.get(`/comment/allByPost/${id}`); 
        } catch(err) {
            return err;
        }           
    }

    async create(comment) {  
        try {
            return await requester.post(`/comment/create`, comment); 
        } catch(err) {
            return err;
        }           
    }

    // async edit(comment) {  
    //     try {
    //         return await requester.post(`/comment/edit/${comment.id}`, comment.commentData); 
    //     } catch(err) {
    //         return err;
    //     }           
    // }

    async remove(obj) {
        let data = {creator: obj.creator}  
        try {
            return await requester.delete(`/comment/remove/${obj.id}`, data); 
        } catch(err) {
            return err;
        }           
    }
}

export default CommentService;