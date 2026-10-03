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

    return (
        <div>
            <h2>Produtos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nome}</td>
                            <td>
                                <button onClick={() => handleDelete(p.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};