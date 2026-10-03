from app import db
from datetime import datetime


class Produto(db.Model):
    __tablename__ = "produtos"
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    descricao = db.Column(db.String(255), nullable=True)
    preco = db.Column(db.Float, nullable=False, default=0.0)
    quantidade = db.Column(db.Integer, nullable=False, default=0)
    criado_em = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, nome, descricao, preco, quantidade, criado_em):
        self.nome = nome
        self.descricao = descricao
        self.preco = preco
        self.quantidade = quantidade
        self.criado_em = criado_em
    


    def to_dict(self):
        return {
            "id": self.id,
            "nome":self.nome,
            "descricao": self.descricao,
            "preco": self.preco,
            "quantidade":self.preco,
            "criado_em": self.criado_em.isoformat()
        }
