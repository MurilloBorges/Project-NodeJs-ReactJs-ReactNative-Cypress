import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import logo from '../assets/login.svg';
import api from '../services/api';

export default function Login({ history }) {
    const [username, setUsername] = useState('');                
    const [password, setPassword] = useState('');            

    async function handleSubmit(e) {
        e.preventDefault();           
        toast.configure({position: toast.POSITION.TOP_CENTER});
        if (!username || !password) {
            return toast.error('Preencha usuário e senha para continuar.'); 
        }
        try {            
            await api.post('/login', {
                username, 
                password,
            }).then((res) => {                                                          
                history.push('/main');                
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
                <input type="text" autoFocus
                    placeholder="Digite seu usuário"
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                />
                <input type="password"
                    placeholder="Digite sua senha" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}