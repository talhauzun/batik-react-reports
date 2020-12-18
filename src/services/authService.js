
import { axiosBase } from "../helpers/defaultUrl";
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';
import jwt_decode from "jwt-decode";



const login = (username, password) => {
    return axiosBase.post("Security/Authenticate", {
        "UserName": username,
        "UserPass": password
      })
        .then(user => {
            //eğer kullanıcı bulunursa (user.data.status = true) 
                const { token } = user.data;
                localStorage.setItem("jwtToken", token);
                setAuthorizationToken(token);
            
            return user.data;
        })
        .catch(err => console.log(err));
}

const logout = () => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
}
const kontrolUser = () => {
    let token=localStorage.getItem("jwtToken");
   
    if (token!=null) {
        var isValid= jwt_decode(jwt_decode(token))
        if(isValid.exp * 1000 < new Date().getTime()){
            return isValid;
        }
        localStorage.removeItem('jwtToken');
    }
    return ""
}

export default { login, logout };