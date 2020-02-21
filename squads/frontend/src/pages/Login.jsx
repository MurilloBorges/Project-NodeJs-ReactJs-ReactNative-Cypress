import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/login.svg';
import api from '../services/api';

export default function Login({ history }) {
    const [username, setUsername] = useState('');                
    const [password, setPassword] = useState('');    

    async function handleSubmit(e) {
        e.preventDefault();           

        const response = await api.post('/login', {
            username, 
            password,
        });

        const { auth, token } = response.data;

        if (auth === true) {        
            history.push('/main');
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