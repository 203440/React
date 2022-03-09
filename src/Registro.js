import {useState} from "react";
import {Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"




const urlPost = "http://localhost:8000/api/v1/register/"
const urlPost2 = "http://localhost:8000/api/v2/register/"

const Registro = () => {
    const [datos,setDatos] = useState({})

    const pot = (dat) => {
        console.log(dat)
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
        const data = await fetch(urlPost2,peticion)
        const dato = await data.json();


        if (dato.statusText != "Bad Request"){
            console.log("Exito")
            window.location= "/login"
        }else{
            alert("Verifique bien los campos")
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
    function mostrarContrasena2(){
        var tipo = document.getElementById("password2");
        if(tipo.type == "password"){
            tipo.type = "text";
        }else{
            tipo.type = "password";
        }
    }

    const cancelar = async ()  => {
        window.location= "/login"
    }

    return(
        <div className="bodyLogin">
        <Card style={{ width: '18rem' }} className="container card_register, Register">
            <Card.Body>
                <div>
                    <h1 className="letras">
                        Registrarse
                    </h1>
                </div>

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
                <div className="form-group">
                    <label htmlFor="exampleDropdownFormPassword1">Password2</label>
                    <input type="password" className="form-control input_login" name="password2" placeholder="password2"  id="password2" onChange={handleChange}  />
                    <div className="input-group-append">
                        <button id="show_password" className="btn btn-primary" type="button"
                                onClick={mostrarContrasena2}><span className="fa fa-eye-slash icon"></span> Mostrar</button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleDropdownFormPassword1">Email</label>
                    <input type="email" className="form-control input_login" name="email" placeholder="email" onChange={handleChange}  />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleDropdownFormPassword1">First name</label>
                    <input type="text" className="form-control input_login" name="first_name" placeholder="first_name" onChange={handleChange}  />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleDropdownFormPassword1">Last name</label>
                    <input type="text" className="form-control input_login" name="last_name" placeholder="last_name" onChange={handleChange}  />
                </div>

                <button type="submit" onClick = {()=> pot(datos)} className="btn btn-primary input_sub, linea">Registrarse</button>
                <button type="submit" onClick = {()=> cancelar()} className="btn btn-primary input_sub, linea">Cancelar</button>

                <div className="dropdown-divider"></div>
            </Card.Body>
        </Card>
        </div>
    )
}

export default Registro;