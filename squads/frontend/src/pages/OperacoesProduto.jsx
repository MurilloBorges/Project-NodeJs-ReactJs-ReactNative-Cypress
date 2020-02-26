import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './OperacoesProduto.css';
import api from '../services/api';

export default function OperacoesProduto({ history }){
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [tipoOperacao, setTipoOperacao] = useState('');
    const [tipoCrud, setTipoCrud] = useState('');
    const [filtro, setFiltro] = useState('');
    const [tbody, setTbody] = useState();

    //window.onload(handlePesquisar());

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
                            toast.info('Produto já cadastrado.');
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
            } catch (e) {
                toast.error(`Falha na requisição: ${e}`);
            }
        }
    }

    async function handlePesquisar(e) {        
        e.preventDefault();        
        const params = filtro !== '' ? '?nome=' + filtro : '';
        try {
            await api.get('/produtos' + params).then((res) => {                
                if (res.data.info !== undefined) {
                    toast.info(res.data.info);
                } else {
                    setTbody(
                        res.data.map((data, index) => {
                            return (
                                <tr key={data._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.nome}</td>
                                    <td>{data.descricao}</td>
                                    <td>{data.valor}</td>
                                    <td style={{textAlign: "end"}}>
                                        <span className="btn btn-warning" style={{marginRight: "10px"}}>
                                            <svg className="bi bi-tools" style={{width: "1.2em", height: "1.2em",
                                                viewBox: "0 0 20 20", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg"}}>
                                                <path 
                                                    fillRule="evenodd" d="M2 3l1-1 3.081 2.2a1 1 0 01.419.815v.07a1 1 0 00.293.708L12.5 11.5l.914-.305a1 1 0 011.023.242l3.356 3.356a1 1 0 010 1.414l-1.586 1.586a1 1 0 01-1.414 0l-3.356-3.356a1 1 0 01-.242-1.023l.305-.914-5.707-5.707a1 1 0 00-.707-.293h-.071a1 1 0 01-.814-.419L2 3zm11.354 9.646a.5.5 0 00-.708.708l3 3a.5.5 0 00.708-.708l-3-3z" clipRule="evenodd">
                                                </path>
                                                <path 
                                                    fillRule="evenodd" d="M17.898 4.223a3.003 3.003 0 01-3.679 3.674L7.878 14.15a3 3 0 11-2.027-2.027l6.252-6.341a3 3 0 013.675-3.68l-2.142 2.142L14 6l1.757.364 2.141-2.141zm-13.37 9.019L5 13l.471.242.529.026.287.445.445.287.026.529L7 15l-.242.471-.026.529-.445.287-.287.445-.529.026L5 17l-.471-.242L4 16.732l-.287-.445L3.268 16l-.026-.529L3 15l.242-.471.026-.529.445-.287.287-.445.529-.026z" clipRule="evenodd">
                                                </path>
                                            </svg>                                            
                                        </span>
                                        <span className="btn btn-danger" onClick={e => handleRemover(e, data._id)}>                                            
                                            <svg className="bi bi-trash-fill" style={{width: "1.2em", height: "1.2em",
                                                viewBox: "0 0 20 20", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg"}}>
                                                <path 
                                                    fillRule="evenodd" d="M4.5 3a1 1 0 00-1 1v1a1 1 0 001 1H5v9a2 2 0 002 2h6a2 2 0 002-2V6h.5a1 1 0 001-1V4a1 1 0 00-1-1H12a1 1 0 00-1-1H9a1 1 0 00-1 1H4.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM10 7a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 0110 7zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clipRule="evenodd">
                                                </path>
                                            </svg>                                            
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    );
                }
            }).catch((error) => {
                toast.error(`Error: ${error}`);
            });
        } catch (e) {
            toast.error(`Falha na requisição: ${e}`);
        }
    }

    async function handleRemover(e, id) {
        e.preventDefault();
        console.log(e, id)
        console.log(e.target);
        try {
            await api.delete('/produtos/' + id).then((res) => {    
                console.log(id);
                toast.success('Produto removido com sucesso.');                
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
                    <h1>{tipoCrud} Produto</h1><hr />
                    <h4>Nome</h4>
                    <input type="text" autoFocus placeholder="Digite o nome"
                        value={nome} onChange={e => setNome(e.target.value)}
                    />
                    <h4>Descrição</h4>
                    <input type="text" placeholder="Digite a descrição"
                        value={descricao} onChange={e => setDescricao(e.target.value)}
                    />
                    <h4>Valor</h4>
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
            <div className="operacoes-produto-container" style={{ justifyContent: "flex-start", paddingTop: "30px" }}>
                <div className="listar-produtos-container">
                    <h1>Produtos</h1><hr></hr>
                    <h3>Nome</h3>
                    <div className="pesquisa">
                        <input type="text" placeholder="Pesquisar" onChange={e => setFiltro(e.target.value)}></input>
                        <button type="button" id="pesquisar" onClick={handlePesquisar}>Pesquisar</button>
                    </div>
                    <div id="produtosView">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Valor</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tbody}
                            </tbody>
                        </table>
                    </div>
                    <button type="button" id="cadastrar" onClick={e => setTipoCrud('Cadastrar')}>Cadastrar produto</button>
                </div>
            </div>
        );
    }
}