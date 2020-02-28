import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import logo from '../../assets/login.svg';
import api from '../../services/api';
import { login } from "../../services/auth";

export default function Login({ history }) {
    const [username, setUsername] = useState('');                
    const [password, setPassword] = useState('');            

    async function handleSubmit(e) {
        e.preventDefault();           
        //toast.configure({position: toast.POSITION.TOP_CENTER});
        toast.configure();
        if (!username || !password) {
            return toast.error('Preencha usuário e senha para continuar.'); 
        }
        try {            
            await api.post('/login', {
                username, 
                password,
            }).then((res) => {   
                login(res.data.token);                                                       
                history.push('/produtos');                
            }).catch((error) => {
                toast.error('Usuário ou Senha Inválido.');                
            });
        } catch(e) {
            toast.error(`Falha na requisição: ${e}`);
        }                         
    }    

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>                
                <img src={logo} alt="Squads"/>                
                <input type="text" autoFocus data-cy="username"
                    placeholder="Digite seu usuário"
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                />
                <input type="password" data-cy="password"
                    placeholder="Digite sua senha" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit" data-cy="entrar">Entrar</button>
            </form>
        </div>
    );
}