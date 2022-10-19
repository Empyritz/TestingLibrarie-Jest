import axios from 'axios'
const URL = "https://jsonplaceholder.typicode.com/users/1"

export const fetchUser = () => {
  return axios.get(URL)
}
