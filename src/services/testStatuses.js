import axios from 'axios'
import ENV from '../env'

export const getTestStatuses = (successCallback, errorCallback = () => { }) => {

    axios.get(`${ENV.URL}/testresults`)
        .then((response) => successCallback(response.data))
        .catch((err) => errorCallback(err))

}

export const getTestStatusForDevice = (udid, successCallback, errorCallback = () => { }) => {

    axios.get(`${ENV.URL}/testresults?udid=${udid}`)
        .then((response) => successCallback(response.data))
        .catch((err) => errorCallback(err))

}