import React, { useState } from "react";
import ApiService from "../services/ApiService";
import jwt_decode from "jwt-decode";

const Login = () => {

    
    
    const initialTutorialState = {
        username: "",
        password: "",
        token: null,
    };
    const [user, setUser] = useState(initialTutorialState);
    const [loading, setLoading] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const saveTutorial = () => {
        var data = {
            UserName: user.username,
            UserPass: user.password
        };

        ApiService.login(data)
            .then(response => {
                setLoading(true);
                setUser({
                    ...user,
                });
                //setLoading(false);
                console.log(response.data);
                var decodedHeader = jwt_decode(response.data);
                console.log(decodedHeader);
                localStorage.setItem('token', response.data);
                localStorage.setItem('testObject', JSON.stringify(decodedHeader));
            })
            .catch(e => {
                console.log(e);
                //setLoading(false);
            });
    };

    return (
        <div className="submit-form">
            {loading ? (
                <div>
                    <h4>Başarılı şekilde giriş yapıldı</h4>
                    <h4>{user.token}</h4>
                </div>
            ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                required
                                value={user.username}
                                onChange={handleInputChange}
                                name="username"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                required
                                value={user.password}
                                onChange={handleInputChange}
                                name="password"
                            />
                        </div>

                        <button onClick={saveTutorial} className="btn btn-success">
                                Giriş
                        </button>
                    </div>
                )}
        </div>
    );
};

export default Login;