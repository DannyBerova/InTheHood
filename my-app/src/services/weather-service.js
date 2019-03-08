import requester from '../data-fetch/requester';

class WeatherService {   
    async sofia() { 
        const weatherApiKey = 'ae5066bced2b4b2c8d9220032190803   ';
        const sofiaId = '727011' 
        try {
            return await requester.get(`http://api.apixu.com/v1/current.json?key=ae5066bced2b4b2c8d9220032190803&q=Sofia`)
        } catch(err) {
            return err;
        }           
    } 
}

export default WeatherService;