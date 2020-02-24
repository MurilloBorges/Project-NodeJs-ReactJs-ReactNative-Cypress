import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Main.css';
import api from '../services/api';

export default function Main({ history }) { 
    const [nome, setNome] = useState('');                
    const [descricao, setDescricao] = useState('');            
    const [valor, setValor] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();           
        toast.configure({position: toast.POSITION.TOP_CENTER});
        if (!nome || !descricao || !valor) {
            return toast.error('Todos os campos devem ser prenchidos.'); 
        }
        try {            
            await api.post('/produto', {
                nome, 
                descricao,
                valor,
            }).then((res) => {    
                console.log(res);   
                toast.success('Produto inserido com sucesso.');         
                history.push('/main');                
            }).catch((error) => {
                toast.error('Usuário ou Senha Inválido.');                
            });
        } catch(e) {
            toast.error(`Falha na requisição: ${e}`);
        }                         
    } 

    return (        
        <div className="main-container">
            <form onSubmit={handleSubmit}>                                
                <input type="text" autoFocus placeholder="Digite o nome"
                    value={nome} onChange={e => setNome(e.target.value)}
                />
                <input type="text" placeholder="Digite a descrição" 
                    value={descricao} onChange={e => setDescricao(e.target.value)}
                />
                <input type="text" maxLength="9" placeholder="0,00"
                    value={valor} onChange={e => setValor(e.target.value)}
                />
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}