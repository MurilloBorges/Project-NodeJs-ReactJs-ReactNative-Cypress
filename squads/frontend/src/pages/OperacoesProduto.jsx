import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './OperacoesProduto.css';
import api from '../services/api';

export default function OperacoesProduto({ history }) { 
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');                
    const [descricao, setDescricao] = useState('');            
    const [valor, setValor] = useState('');
    const [tipoOperacao, setTipoOperacao] = useState('');  
    const [tipoCrud, setTipoCrud] = useState('');   
    const [filtro, setFiltro] = useState('');      

    function limparCampos() {
        setNome('');
        setDescricao('');
        setValor('');
    }

    toast.configure();

    async function handleSubmit(e) {
        e.preventDefault();             
        if (tipoOperacao === 'Cancelar') {            
            limparCampos();
        } else {               
            //toast.configure({position: toast.POSITION.TOP_CENTER});                    
            if (!nome || !descricao || !valor) {
                return toast.error('Todos os campos devem ser prenchidos.'); 
            }
            try {     
                if (tipoCrud === 'Cadastrar') {       
                    await api.post('/produtos', {
                        nome, 
                        descricao,
                        valor,
                    }).then((res) => {                        
                        if (res.status === 201) {   
                            toast.success('Produto cadastrado com sucesso.');         
                        } else {
                            toast.success('Produto já cadastrado.');         
                        }
                        limparCampos();                                
                    }).catch((error) => {
                        toast.error(`Error: ${error}`);                
                    });
                } else {
                    await api.patch('/produtos/' + id, {
                        nome,
                        descricao,
                        valor
                    }).then((res) => {
                        if (res.status === 200) {
                            toast.success('Produto alterado com sucesso.');
                        }
                    }).catch((error) => {
                        toast.error(`Error: ${error}`);                 
                    })
                }
            } catch(e) {
                toast.error(`Falha na requisição: ${e}`);
            }
        }                         
    } 

    async function handlePesquisar(e) {
        e.preventDefault();        
        const params = filtro !== '' ? '?nome=' + filtro : '';
        try {
            await api.get('/produtos' + params).then((res) => {
                console.log(res);
                if (res.data.info !== undefined) {
                    toast.info(res.data.info);
                } else {
                    //Montar tabela
                }
            }).catch((error) => {
                toast.error(`Error: ${error}`);
            });
        } catch(e) {
            toast.error(`Falha na requisição: ${e}`);
        }
    }

    if (tipoCrud === 'Cadastrar' || tipoCrud === 'Alterar') {
        return (        
            <div className="operacoes-produto-container">                                   
                <form onSubmit={handleSubmit}>  
                    <button type="button" id="voltar" onClick={e => setTipoCrud('Listar')}>Voltar</button>                
                    <h1>{tipoCrud} Produto</h1><hr/>   
                    <h3>Nome</h3>  
                    <input type="text" autoFocus placeholder="Digite o nome" 
                        value={nome} onChange={e => setNome(e.target.value)}
                    />
                    <h3>Descrição</h3>
                    <input type="text" placeholder="Digite a descrição" 
                        value={descricao} onChange={e => setDescricao(e.target.value)}
                    />
                    <h3>Valor</h3>
                    <input type="text" maxLength="9" placeholder="0,00"
                        value={valor} onChange={e => setValor(e.target.value)}
                    />
                    <div className="operacoes-produto-frames">
                        <button type="submit" id="cancelar" onClick={e => setTipoOperacao('Cancelar')}>Cancelar</button>
                        <button type="submit" id="salvar" onClick={e => setTipoOperacao('Salvar')}>Salvar</button>
                    </div>
                </form>
            </div>
        );        
    } else {        
        return (
            <div className="operacoes-produto-container" 
                style={{justifyContent: "flex-start", paddingTop: "30px"}}>                                       
                <div className="listar-produtos-container">
                    <h1>Produtos</h1><hr></hr>
                    <h3>Nome</h3>
                    <div className="pesquisa">
                        <input type="text" placeholder="Pesquisar" onChange={e => setFiltro(e.target.value)}></input>
                        <button type="button" id="pesquisar" onClick={handlePesquisar}>Pesquisar</button>
                    </div>
                    <button type="button" id="cadastrar" onClick={e => setTipoCrud('Cadastrar')}>Cadastrar produto</button>
                </div>
            </div>
        );
    }
}