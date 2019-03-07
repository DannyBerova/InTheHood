const BASE_URL = 'http://localhost:5000';
// const APP_KEY = 'kid_BJ1CjVkIV';
// const APP_SECRET = 'cd8ef209577f48a1b42ebc84cf06f2fc';
// const ADMIN_ROLE_ID = '31978b08-5f3c-4edc-b479-a601c0913deb';

const requester = (method) => {    
    return (url, data = {}, headers = {}) => {      
        const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

        const authtoken = window.localStorage.getItem('ujwt');    
        const predefinedHeaders = {
            'Authorization': authtoken          
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