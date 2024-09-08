import { MAPS_KEY } from '@/env'
import axios from 'axios'

const $http = axios.create({
  baseURL: 'https://catalog.api.2gis.com/3.0/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
  params: {
    key: MAPS_KEY
  }
})

export default $http
