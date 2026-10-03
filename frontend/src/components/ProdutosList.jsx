import React, { useEffect, useState } from "react";
import api from "../services/api";


export default function ProdutoList() {
    const [produtos, setProdutos] = useState([]);

    const fetchProdutos = async () => {
        try {
            const res = await api.get("/");
            setProdutos(res.data);

        } catch (err) {
            console.error(err);
            alert("Erro ao buscar produtos");
        }
    }
};

useEffect(() => { fetchProdutos(); }, []);

const handleDelete = async (id) => {
    if (!window.confirm("Deletar produto?")) return;
    try {
        await api.delete(`/${id}`);
        setProdutos(produtos.filter(p => p.id !== id));
    } catch (err) {
        console.error(err);
        alert("Erro ao deletar");
    }

    return (
        <div>
            <h2>Produtos</h2>
            <table>
                <thead><tr><th>ID</th></tr></thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    )
};