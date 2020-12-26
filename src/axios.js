import axios from 'axios';

const instance = axios.create({
    //Local API Endpoint
    // baseURL: 'http://localhost:5001/clone-9f029/us-central1/api'

    //Live API Endpoint
    baseURL: 'https://us-central1-clone-9f029.cloudfunctions.net/api'
})

export default instance;