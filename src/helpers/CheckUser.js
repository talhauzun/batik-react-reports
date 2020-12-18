import React,{useState,useEffect} from 'react'

import jwt_decode from "jwt-decode";

export const CheckUser = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        try {
          let token = localStorage.getItem("token")
          let jwt = jwt_decode(token)
      
          const now = Date.now().valueOf() / 1000
          if (jwt.exp > now) {
              setIsAuthenticated(true)
              console.log("geçti")
              console.log(jwt.exp)
          }
        
          console.log(jwt)
        } catch (error) {
          console.log("geçemedi")
          setIsAuthenticated(false)
        }
      })

    return isAuthenticated
}
