import axios from 'axios'

export class Utilities{

    base_url = import.meta.env.VITE_API_BASE_URL

    async login(loginFormData){
        try{
            const response = await axios.post(`${this.base_url}/auth/login`, loginFormData)
            return response.data
        }catch(error){
            throw console.error(error)
        }
    }
}