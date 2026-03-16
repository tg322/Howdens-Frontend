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
        const today = new Date()
        // Python date type accepts yyyy-mm-dd string, we need to remove the time on the end of the daate string to qualify.
        const dateAdded = today.toISOString().split("T")[0]

        formData.append("email", portfolioData.email);
        formData.append("portfolio_name", portfolioData.portfolio_name);
        formData.append("date_added", dateAdded)

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

    async get_all_portfolios(){
        try{
            const response = await axios.get(`${this.base_url}/portfolio/get_all_portfolios`)
            return response.data
        }catch(error){
            throw console.error(error)
        }
    }
}