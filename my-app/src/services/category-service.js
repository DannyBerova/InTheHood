import requester from '../data-fetch/requester';

class CategoryService {   
    async all() {  
        try {
            return await requester.get(`/category`); 
        } catch(err) {
            return err;
        }           
    } 
}

export default CategoryService;