import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import axios from "axios";
import xd from "./xd.jpg"
import {Card} from "react-bootstrap";

const urlGet = "http://localhost:8000/api/v1/profile/"+window.localStorage.getItem('id')
const urlPut = "http://localhost:8000/api/v1/profile/"+window.localStorage.getItem('id')

const Profile = () => {
    const [datos,setDatos] = useState({})
    const [form,setForm] = useState(null)

    useEffect(() => {
        get()
    }, []);


    const get = async ()  => {
        const dato = await fetch(urlGet, {
            method: 'GET',
            headers: {
                'Authorization': 'token '+window.localStorage.getItem('token')
            }
        })

        const data =   await dato.json()
        setDatos(data)
    }

    const pot2 = () => {
        const newF = new FormData();

        if(form == null){
            newF.append("username", datos.username);
            newF.append("first_name", datos.first_name);
            newF.append("last_name", datos.last_name);
            newF.append("email", datos.email);

            putm(newF)
        }else{
            form.append("username", datos.username);
            form.append("first_name", datos.first_name);
            form.append("last_name", datos.last_name);
            form.append("email", datos.email);
            putm(form)
        }

    }

    const putm = (dat) => {
        axios({
            url: urlPut,
            method: "PUT",
            headers: {
                'Authorization': 'token '+window.localStorage.getItem('token')
            },
            data: dat,
        }).then((res) => {alert("Actualizacion con exito", limpiar(),get())
        }).catch((err) => {  alert(err.error)});

    }

    function limpiar() {
        document.getElementById("inputF").value ='';
        setForm(null)
    }

    const handleChange = (e) =>{
        setDatos({
            ...datos,[e.target.name] : e.target.value,
        });
    }

    const handleChangeF = (e) => {
        const formData = new FormData();
        formData.append("img_profile", e.target.files[0]);
        setForm(formData)
    }

    const cerrar = async ()  => {
        window.location= "/login"
    }

    return(
        <div className="centrar">
            <div className="Perfil">
            <Card style={{ width: '60rem' , height:' 30rem', top:'40px'}} className="container card_profile, Per">
                <div>
                    <h1 className="letras">
                        Perfil
                    </h1>

                </div>
                <div className="centrar">
                    <img src={datos.img_profile != null ? datos.img_profile : xd} className="imagen"/>
                </div>

                <div className="user_last">
                    <input  type= "text"  name="username" placeholder="user" onChange={handleChange} value={datos.username} />
                    <input  type= "text"  name="last_name" placeholder="Apellido P" onChange={handleChange} value={datos.last_name} />
                </div>
                <div className="first_ema" >
                    <input  type= "text"  name="first_name" placeholder="Apellido M" onChange={handleChange} value={datos.first_name} />
                    <input  type= "text"  name="email" placeholder="Correo" onChange={handleChange} value={datos.email} />
                </div>
                <div className="fil">
                    <input  type= "file"  name="img_profile" onChange={handleChangeF}  id={"inputF"}/>
                </div>
                <div className="actuali">
                    <button onClick={()=> pot2()}>Actualizar</button>
                </div>
                <div>
                    <button type="submit" onClick = {()=> cerrar()} className="btn btn-primary input_sub">Cerrar Sesion</button>
                </div>

            </Card>
            </div>
        </div>

    )
}
export default Profile;
