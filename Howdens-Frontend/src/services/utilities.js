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

    async uploadPortfolio(portfolioData){

        const formData = new FormData();

        formData.append("email", portfolioData.email);
        formData.append("portfolio_name", portfolioData.portfolio_name);

        //Build the files array
        portfolioData.files.forEach(file => {
            formData.append("files", file);
        });

        try{
            const response = await axios.post(`${this.base_url}/portfolio/upload_portfolio`, formData)
            return response.data
        }catch(error){
            throw console.error(error)
        }
    }
}