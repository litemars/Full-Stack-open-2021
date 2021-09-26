import axios from 'axios'
//const baseUrl = 'https://nodejs-aalto.herokuapp.com/api/persons'
const baseUrl = 'http://localhost:3001/api/persons'
export const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export const delede = (id) => {
    const request = axios.delete(baseUrl+'/'+id)
    return request.then(response => response.data)
}
export const update = (id, obj) => {
    const request = axios.put(baseUrl+'/'+id,obj)
    return request.then(response => response.data)
}

