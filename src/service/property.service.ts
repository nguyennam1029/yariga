import { API_URL } from '@/config';
import axios from 'axios';


export async function getProperties() {
    try {
        const response =await axios.get(`${API_URL}/property`)
        if(response.status===200) {

            return response.data
        }
    } catch (error) {
        console.log("🚀 ~ file: property.service.ts:13 ~ getProperties ~ error:", error)
        
    }
} 

