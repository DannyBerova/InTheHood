import requester from '../data-fetch/requester';

const sofiaWeather = "http://api.apixu.com/v1/current.json?key=ae5066bced2b4b2c8d9220032190803&q=Sofia`";

class WeatherService {   
    async sofia() { 
        try {
            return await fetch(sofiaWeather).then(res => res.json())
        } catch(err) {
            return err;
        }           
    } 
}

export default WeatherService;