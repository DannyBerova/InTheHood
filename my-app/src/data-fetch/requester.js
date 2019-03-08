const BASE_URL = 'http://localhost:5000';

//TODO: refactor app with requester
const requester = (method) => {    
    return (url, data = {}, headers = {}) => {      
        const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

        const authtoken = window.localStorage.getItem('ujwt'); 
        const predefinedHeaders = {
            'Authorization': 'Bearer ' + authtoken          
        }
        
        const requestData = {
            method,
            headers: {
                ...predefinedHeaders,
                ...headers,
            }
        };
        
        if(Object.keys(data).length) {
            requestData.body = JSON.stringify(data);
            requestData.headers['Content-Type'] = "application/json";
        } else if(requestData.headers['Authorization'].startsWith('Client-ID')) {
            requestData.body = data
        }
                
        return new Promise((resolve, reject) => {
            fetch(fullUrl, requestData)
                .then((response) => {
                    resolve(response.json());
                })
                .catch((err) => reject(err));
        }) 
    }
}

export default {
    get: requester('GET'),
    post: requester('POST'),
    put: requester('PUT'),
    delete: requester('DELETE'),
};