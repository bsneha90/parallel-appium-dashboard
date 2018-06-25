import axios from 'axios'
import ENV from '../env'

export const getEnvInfo = (successCallback, errorCallback = () => { }) => {

    axios.get(`${ENV.URL}/envInfo`)
        .then((response) => successCallback(response.data))
        .catch((err) => errorCallback(err))

}