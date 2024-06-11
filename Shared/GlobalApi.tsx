const { default: axios } = require("axios");

const getGooglePlace = (category: string, radius: string, lat: string, lng: string) => axios.get('/api/google-place?' +
    'category=' + category + '&radius=' + radius + '&lat=' + lat + '&lng=' + lng)



export default {
    getGooglePlace
}