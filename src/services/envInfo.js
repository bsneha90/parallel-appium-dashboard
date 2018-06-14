import axios from 'axios'
export const getEnvInfo = (successCallback, errorCallback = () => { }) => {

    axios.get('http://localhost:3000/envInfo')
        .then((response) => successCallback(response.data))
        .catch((err) => errorCallback(err))

}