import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


export default function ProdutosForm() {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [descricao, setDescricao] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/produtos", { nome, preco: parseFloat(preco), quantidade: parseInt(quantidade), descricao });
            alert("Produto criado com sucesso!");
            navigate("/");
        } catch (err) {
            console.error(err);
            const backendMessage = err.response?.data?.message || err.response?.data?.erro;
            alert("Erro ao criar produto: " + (backendMessage || err.message));
        }
    };

    return (
        <div>
            <h1>Cadastrar Produtos</h1>
            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder="Nome">
                </input><br />

                <input
                    type="number"
                    value={preco}
                    onChange={e => setPreco(e.target.value)}
                    placeholder="Preço">
                </input><br />

                <input
                    type="number"
                    alue={quantidade}
                    onChange={e => setQuantidade(e.target.value)}
                    placeholder="Quantidade">
                </input><br />

                <input
                    type="text"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    placeholder="Descrição">
                </input><br />

                <button type="submit">Salvar</button>
            </form>
        </div>
    )
};