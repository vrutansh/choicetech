import axios from 'axios'


const API = axios.create({
// baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
  baseURL: 'http://localhost:5000/api'
})


export async function userRegister(payload) {
const { data } = await API.post('/auth/register', payload)
return data
}


export async function userLogin(payload) {
const { data } = await API.post('/auth/login', payload)
return data // expected to include token and role
}


export async function employerRegister(payload) {
const { data } = await API.post('/auth/employer/register', payload)
return data
}


export async function employerLogin(payload) {
const { data } = await API.post('/auth/login', payload)
return data
}