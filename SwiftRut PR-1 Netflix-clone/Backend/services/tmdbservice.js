import axios from "axios";
import { ENV_VARS } from "../config/config.js";

export const fetchFromTmdb =async(url)=>{
    const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer' + ENV_VARS.TMDB_API_KEY
        }
      };
     const response= await axios.get(url,options);
     
     if (response.status!==200) {
         throw new Error("falid to fetch data fromTmdb" + response.statusText);
        }
        return response.data
}