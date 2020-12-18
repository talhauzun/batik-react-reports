import React, { useEffect } from 'react'

import { CheckUser } from "../helpers/CheckUser";
export const Home = () => {

    const test =  CheckUser()
    useEffect(() => {
        console.log(test)
      },[test]);
   
    return (
        <div>
            Home
        </div>
    )
}
