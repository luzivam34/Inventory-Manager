from flask import Blueprint, jsonify, request
from app.models.produtos_model import Produto
from app.services.extentions import db


produto_bp = Blueprint("produtobp", __name__, url_prefix="/api/produtos")


@produto_bp.route("/", methods=["GET"])
def listar_produtos():
    produtos=Produto.query.all()
    return jsonify(
        [p.todict() for p in produtos]
    ), 200

@produto_bp.route("/", methods=["POST"])
def criar_produto():
    data = request.json
    if not data.get("nome"):
        return jsonify({"erro": "nome é obrigatorio"}), 400
    p = Produto(
        nome=data.get("nome"),
        descricao = data.get("descricao"),
        preco=float(data.get("preco", 0)),
        quantidade=int(data.get("quantidade", 0)),
        criado_em=data.get("criado_em")
    )
    db.session.add(p)
    db.session.commit()
    return jsonify(p.to_dict()), 201

@produto_bp.route("/<int:id>", methods=["GET"])
def get_produto(id):
    p= Produto.query.get_or_404(id)
    return jsonify(p.to_dict())

@produto_bp.route("/<int:id>", methods=["PUT"])
def atualizar_produto(id):
    p = Produto.query.get_or_404(id)
    data = request.json
    p.nome=data.get("nome", p.nome)
    p.descricao = data.get("descricao", p.descricao)
    p.preco = float(data.get("preco", p.preco))
    p.quantidade = int(data.get("quantidade", p.quantidade))
    db.session.commit()
    return jsonify(p.to_dict())

@produto_bp.route("/<int:id>", methods=["DELETE"])
def delete_produto(id):
    p = Produto.query.get_or_404(id)
    db.session.delete(p)
    db.session.commit()
    return jsonify({"message":"deletado"}), 200