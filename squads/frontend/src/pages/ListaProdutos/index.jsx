import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import './style.css';

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');

    useEffect(() => {
        toast.configure();

        async function consulta() {
            try {                
                await api('/produtos').then((res) => {                
                    if (res.data.info !== undefined) {
                        toast.info(res.data.info);
                    } else {                    
                        setProdutos(res.data);                    
                    };
                });
            } catch (e) {
                toast.error(`Error: ${e}`);
            }           
        } 
        consulta();
    }, []);

    const handleRemover = useCallback(async (id, index) => {
        try {
            await api.delete(`/produtos/${id}`).then((res) => {                    
                toast.success('Produto removido com sucesso.');                
            }).catch((error) => {
                toast.error(`Error: ${error.response.data.info}`);
            });             
            
            produtos.splice(index, 1);
            const vet = [];
            produtos.map(data => vet.push(data));            
            setProdutos(vet);
        } catch (err) {
            toast.error(`Error: ${err}`);
        }       
    }, [produtos]);

    return (
        <div className="produtos-container" style={{ justifyContent: "flex-start", paddingTop: "30px" }}>
            <div className="listar-produtos-container">
                <h1>Produtos</h1><hr></hr>
                <h3>Nome</h3>
                <div className="pesquisa">
                    <input type="text" placeholder="Pesquisar" data-cy="input-pesquisar" value={pesquisa} onChange={e => setPesquisa(e.target.value)}></input>
                    <Link to='/produtos' className="btn btn-info" data-cy="btn-pesquisar" id="pesquisar">Pesquisar</Link>
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
                            {produtos[0] ? (
                                produtos.filter(e => e.nome.includes(pesquisa)).map((data, index) => {
                                    return (
                                        <tr key={data._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{data.nome}</td>
                                            <td>{data.descricao}</td>
                                            <td>{data.valor}</td>
                                            <td style={{ textAlign: "end" }}>
                                                <Link to={`/produtos/editar?id=${data._id}`} data-cy="btn-editar" className="btn btn-warning" style={{ marginRight: "10px" }} >
                                                    <svg className="bi bi-tools" style={{
                                                        width: "1.2em", height: "1.2em",
                                                        viewBox: "0 0 20 20", fill: "currentColor", xmlns: "http:www.w3.org/2000/svg"
                                                    }}>
                                                        <path
                                                            fillRule="evenodd" d="M2 3l1-1 3.081 2.2a1 1 0 01.419.815v.07a1 1 0 00.293.708L12.5 11.5l.914-.305a1 1 0 011.023.242l3.356 3.356a1 1 0 010 1.414l-1.586 1.586a1 1 0 01-1.414 0l-3.356-3.356a1 1 0 01-.242-1.023l.305-.914-5.707-5.707a1 1 0 00-.707-.293h-.071a1 1 0 01-.814-.419L2 3zm11.354 9.646a.5.5 0 00-.708.708l3 3a.5.5 0 00.708-.708l-3-3z" clipRule="evenodd">
                                                        </path>
                                                        <path
                                                            fillRule="evenodd" d="M17.898 4.223a3.003 3.003 0 01-3.679 3.674L7.878 14.15a3 3 0 11-2.027-2.027l6.252-6.341a3 3 0 013.675-3.68l-2.142 2.142L14 6l1.757.364 2.141-2.141zm-13.37 9.019L5 13l.471.242.529.026.287.445.445.287.026.529L7 15l-.242.471-.026.529-.445.287-.287.445-.529.026L5 17l-.471-.242L4 16.732l-.287-.445L3.268 16l-.026-.529L3 15l.242-.471.026-.529.445-.287.287-.445.529-.026z" clipRule="evenodd">
                                                        </path>
                                                    </svg>
                                                </Link>
                                                <span className="btn btn-danger" data-cy="btn-remover" onClick={() => handleRemover(data._id, index)}>
                                                    <svg className="bi bi-trash-fill" style={{
                                                        width: "1.2em", height: "1.2em",
                                                        viewBox: "0 0 20 20", fill: "currentColor", xmlns: "http:www.w3.org/2000/svg"
                                                    }}>
                                                        <path
                                                            fillRule="evenodd" d="M4.5 3a1 1 0 00-1 1v1a1 1 0 001 1H5v9a2 2 0 002 2h6a2 2 0 002-2V6h.5a1 1 0 001-1V4a1 1 0 00-1-1H12a1 1 0 00-1-1H9a1 1 0 00-1 1H4.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM10 7a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 0110 7zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clipRule="evenodd">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                                ) : <tr>
                                        <td><h6>Nenhum produto encontrado.</h6></td>
                                    </tr>                                    
                            }
                                
                        </tbody>
                    </table>
                </div>
                <Link to="/produtos/cadastrar" data-cy="btn-cadastrar" className="btn btn-info" id="cadastrar">Cadastrar produto</Link>
            </div>
        </div>
    );
}

export default Produtos;