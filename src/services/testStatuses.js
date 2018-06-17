import axios from 'axios'
export const getTestStatuses = (successCallback, errorCallback = () => { }) => {

    axios.get('http://localhost:3000/testresults')
        .then((response) => successCallback(response.data))
        .catch((err) => errorCallback(err))

}

export const getTestStatusForDevice = (udid, successCallback, errorCallback = () => { }) => {

    axios.get(`http://localhost:3000/testresults?udid=${udid}`)
        .then((response) => successCallback(response.data))
        .catch((err) => errorCallback(err))

}