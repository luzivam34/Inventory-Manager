import React, { useEffect, useState } from "react";
import api from "../services/api";


export default function ProdutosList() {
    const [produtos, setProdutos] = useState([]);

    const fetchProdutos = async () => {
        try {
            const res = await api.get("/produtos");
            setProdutos(res.data);

        } catch (err) {
            console.error(err);
            alert("Erro ao buscar produtos");
        }
    }

    useEffect(() => { fetchProdutos(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Deletar produto?")) return;
        try {
            await api.delete(`/produtos/${id}`);
            setProdutos(produtos.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
            alert("Erro ao deletar");
        }

    };
    const handleAtualizar = async (id) => {
        if (!window.confirm("Deseja editar o produto?")) return;

        //Pedir um novo dados via prompt
        const novoNome = prompt("digite o novo nome do produto:");
        const novoPreco = prompt("digite o novo preço:");
        try {
            const res = await api.put(`produtos/${id}`, {
                nome: novoNome,
                preco: parseFloat(novoPreco)
            });

            //atualizar a lista local com os dados retornados
            setProdutos(produtos.map(p => p.id === id ? res.data : p));
            alert("Produtos atualizado com sucesso!");

        } catch (err) {
            console.error(err);
            alert("Erro ao tentar editar o Produto: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div>
            <h2>Produtos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Descrição</th>
                        <th>Criado em</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nome}</td>
                            <td>{p.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                            <td>{p.quantidade}</td>
                            <td>{p.descricao}</td>
                            <td>{new Date(p.criado_em).toLocaleDateString("pt-BR")}</td>
                            <td>
                                <button onClick={() => handleAtualizar(p.id)}>Editar</button>
                                <button onClick={() => handleDelete(p.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};