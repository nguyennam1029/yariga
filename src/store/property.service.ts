

import { API_URL } from "@/config";
import { TFilter } from "@/types/general.types";
import { Properties, PropertyItemData } from "@/types/property.types";
import axios from "axios"
import { promises } from "dns";
const example = {
  title: "Metro Jayakarta Hotel & Spa",
  address: "North NewYork, USA",
  info: { beds: 1, baths: 1, area: "38M" },
  status: "sale",
  type: "apartment",
  price: 7500,
  image: [
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80",
  ],
  country: "USA",
  facility: ["Wifi", "Smooking Area", "Parking Area", "Balcony", "Kitchen"],
  description:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  rating: 4.5,
  state: "North Carolina",
  agent: {
    name: "Hussain Ahmed",
    phone: "+1 234 567 890",
    address: "North Carolina, USA",
    properties: 10,
  },
};

// https://rose-funny-greyhound.cyclic.app/
// : Promise <Properties | null | undefined>
export async function getProperties(params: TFilter) {
 
  try {
    
    const response = await axios.get<{properties: Properties[]}>(`${API_URL}/property`, {params})
    if(response.status === 200) {
     
      return {
        data :response.data.properties,
      headers: response.headers,}
    }
    
  } catch (error) {
    console.log("🚀 ~ file: property.service.ts:22 ~ getProperty ~ error:", error)
    
  }
}

export async function getProperty(id:number): Promise<PropertyItemData | null | undefined> {
  try {
    const response = await axios.get(`${API_URL}/property/${id}`)
    if(response.status === 200) {
      return response.data
    }
    
  } catch (error) {
    console.log("🚀 ~ file: property.service.ts:22 ~ getProperty ~ error:", error)
    
  }
}
// interface Data {
//   id: number;
//   title: string;
// }
export async function addNewProperty(data: PropertyItemData) {
  console.log("🚀 ~ file: property.service.ts:76 ~ addNewProperty ~ data:", data)
  try {
    const response = await axios.post(`${API_URL}/property/create`, data);
    return response;
  } catch (error) {
    console.log("addNewProperty ~ error:", error);
  }
}