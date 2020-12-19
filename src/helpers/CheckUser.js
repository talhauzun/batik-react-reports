import React,{useState,useEffect} from 'react'

import jwt_decode from "jwt-decode";

export const CheckUser = () => {
    const [user, setUser] = useState({
      UserName:"",
      FullName:"",
      Token:"",
      role:[],
      isAuth:false
    });

    useEffect(() => {
        try {
          let token = localStorage.getItem("token")
          let jwt = jwt_decode(token)
          let a=JSON.parse(jwt.unique_name);

          const now = Date.now().valueOf() / 1000
          if (jwt.exp > now) {
              setUser({...user,
                FullName:a.FullName,
                UserName:a.UserName,
                Token:a.Token,
                role:jwt.role,
                isAuth:true
              })   
          }
        } catch (error) {
          console.log("geçemedi")
        }
      },[setUser])

    return user
}
