import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

const urlPost = "http://localhost:8000/api/v1/login/"

const Login = () => {
    const [datos,setDatos] = useState({})

    const pot = (dat) => {
        const peticion = {
            method: 'POST',
            body: JSON.stringify(dat),
            headers: {
                "Content-type": "application/json"
            }
        }
        post(peticion)
    }

    const post = async (peticion)  => {

        const data = await fetch(urlPost,peticion)
        const dato = await data.json();


        if (data.ok){
            window.localStorage.setItem('id', dato.user_id);
            window.localStorage.setItem('token', dato.token);
            window.location = "/profile"
        }else{
            alert("Error de inicio de sesion")
        }

    }

    const handleChange = (e) =>{
        setDatos({
            ...datos,[e.target.name] : e.target.value,
        });
    }

    function mostrarContrasena(){
        var tipo = document.getElementById("password");
        if(tipo.type == "password"){
            tipo.type = "text";
        }else{
            tipo.type = "password";
        }
    }


    return(


        <Card style={{ width: '18rem' }} className="container lol">
            <Card.Body>

                <div className="form-group ">
                    <label htmlFor="exampleDropdownFormPassword1">Username</label>
                    <input type="text" className="form-control input_login" name="username" placeholder="username" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleDropdownFormPassword1">Password</label>
                    <input type="password" className="form-control input_login" name="password" placeholder="password" id="password" onChange={handleChange}  />
                    <div className="input-group-append">
                        <button id="show_password" className="btn btn-primary" type="button"
                                onClick={mostrarContrasena}><span className="fa fa-eye-slash icon"></span> Mostrar</button>
                    </div>
                </div>
                <button type="submit" onClick = {()=> pot(datos)} className="btn btn-primary input_sub">Iniciar sesion</button>

                <div className="dropdown-divider"></div>
                <Link  className="input_new"  to="/register">Registrarse</Link>
            </Card.Body>
        </Card>

    )
}

export default Login;
