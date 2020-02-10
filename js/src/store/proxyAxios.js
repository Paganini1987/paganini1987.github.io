import axios from 'axios'
import store from './index'

const instance = axios.create(); 


instance.interceptors.request.use((config) => {
    config.params = config.params || {};
	config.params['SITE_ID'] = store.state.API.SITE_ID;
	
    return config;
});

export default instance; 