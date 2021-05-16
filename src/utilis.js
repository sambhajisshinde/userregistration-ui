//We had declared axios in utilis so that in future we will upgrade to other also.
import axios from 'axios';

//Common logic to call axios post method
export const Post = (url, requestContent) => {
    return axios.post(url, requestContent);
};

//Common logic to call axios get method
export const Get = (url, requestContent) => {
    return axios.get(url, requestContent);    
};