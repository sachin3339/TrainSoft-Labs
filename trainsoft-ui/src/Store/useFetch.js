import axios from "axios";
import { useState, useEffect,useContext } from "react";
import AppContext from "./AppContext";


export default function useFetch({  method, url, data = null, config = null, errorMsg="" }) {
   const {spinner} = useContext(AppContext) 
   const [response, setResponse] = useState(null);
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            spinner.show()
            axios[method](url, JSON.parse(config), JSON.parse(data))
               .then((res) => {
                  setResponse(res.data);
                  spinner.hide()
               })
               .finally(() => {
                  setIsLoading(false);
                  spinner.hide()
               });
         } catch (err) {
            setError(err);
            console.error(errorMsg,err)
            spinner.hide()
         }
      };
      fetchData();
   }, [ method, url, data, config]);

   return { response, error, isLoading };
}