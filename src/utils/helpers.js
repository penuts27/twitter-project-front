import axios from 'axios'
import Swal from 'sweetalert2'

//本機串接api
// const baseURL = 'http://localhost:3000/api'

// github pages
const baseURL = 'https://sheltered-ravine-31386.herokuapp.com/api'

export const apiHelper = axios.create({
    baseURL
})

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
})




