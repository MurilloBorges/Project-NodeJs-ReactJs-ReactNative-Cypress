import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import './style.css';

function OperacaoProdutos({ match: { params }, location }) {
  const [nomeFixo, setNomeFixo] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [id, setId] = useState('');

  function limparCampos() {   
    setId('');     
    setNome('');
    setDescricao('');
    setValor('');
  }

  useEffect(() => {
    toast.configure();
    
    async function consulta() {
      if (params.tipoOperacao === 'editar') {
        const urlParams = new URLSearchParams(location.search);
        const response = await api(`/produtos/${urlParams.get('id')}`);
        const data = response.data;

        setNomeFixo(data.nome)
        setNome(data.nome)
        setDescricao(data.descricao)
        setValor(data.valor)
        setId(data._id)
      }
    }

    consulta();
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    if (!nome || !descricao || !valor) {
      return toast.error('Todos os campos devem ser prenchidos.');
    }

    if (params.tipoOperacao === 'editar') {
      try {
        await api.patch(`/produtos/${id}`, {
          nome,
          descricao,
          valor,
        }).then((res) => {
            if (res.status === 200) {
                toast.success('Produto alterado com sucesso.');
            }

            limparCampos();

            setTimeout(() => {
              window.location.href = "/produtos";
            }, 1500);
        }).catch((error) => {
            toast.error(`Error: ${error.response.data.info}`);
        });  
      } catch (err) {
        toast.error(`Error: ${err}`);
      }
    } else {
      try {
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

            setTimeout(() => {
              window.location.href = "/produtos";
            }, 1500);
        }).catch((error) => {
            toast.error(`Error: ${error.response.data.info}`);
        });                  
      } catch (err) {
        toast.error(`Error: ${err}`);
      }
    }

  }, [id, nome, descricao, valor]);

  return (
    <div className="operacoes-produto-container">
      <form onSubmit={handleSubmit}>
        <Link to='/produtos' className="btn btn-info" id="voltar">Voltar</Link>
        <h1>
          {params.tipoOperacao === 'editar' ?
            `Alterar Produto ${nomeFixo}` :
            'Adicionar produto'
          }
        </h1>
        <hr />
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
          <Link to='/produtos' className="btn btn-danger" id="cancelar">Cancelar</Link>
          <button type="submit" className="btn btn-success" id="salvar" onClick={handleSubmit}>Salvar</button>
        </div>
      </form>
    </div>
  );
}

export default OperacaoProdutos;