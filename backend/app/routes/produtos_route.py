from flask import Blueprint, jsonify, request
from app.models.produtos_model import Produto
from app.services.extentions import db

# Nome do blueprint e prefixo de rota
produto_bp = Blueprint("produto_bp", __name__)

# ___________________________________
# LISTA DE PRODUTOS
# ___________________________________
@produto_bp.route("/", methods=["GET"])
def listar_produtos():
    produtos=Produto.query.all()
    return jsonify(
        [p.to_dict() for p in produtos]
    ), 200

# ____________________________________
# CRIAR PRODUTOS
# ____________________________________

@produto_bp.route("/", methods=["POST"])
def criar_produto():
    data = request.json or {}

    #Validação básica
    if not data.get("nome") or not data.get("preco") or not data.get("quantidade"):
        return jsonify({
            "status":"erro",
            "messagem":"Preencha os campos necessario"
        }), 400

    try:
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
    except Exception as e:
        db.session.rollback()
        return jsonify({"status":"error","messagem":str(e)}), 500

#______________________________________________
# OBTERB PRODUTOS POR ID
#______________________________________________
@produto_bp.route("/<int:id>", methods=["GET"])
def get_produto(id):
    p= Produto.query.get_or_404(id)
    return jsonify(p.to_dict()), 200

#______________________________________________
# ATUALIZAR PRODUTOS
# _____________________________________________

@produto_bp.route("/<int:id>", methods=["PUT"])
def atualizar_produto(id):
    p = Produto.query.get_or_404(id)
    data = request.json or {}

    try:
        p.nome=data.get("nome", p.nome)
        p.descricao = data.get("descricao", p.descricao)
        p.preco = float(data.get("preco", p.preco))
        p.quantidade = int(data.get("quantidade", p.quantidade))
        db.session.commit()
        return jsonify({"status":"success","Produtos":p.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"status":"error", "messagem":str(e)}), 500

#__________________________________________________
# DELETAR PRODUTO
#___________________________________________________      
@produto_bp.route("/<int:id>", methods=["DELETE"])
def delete_produto(id):
    p = Produto.query.get_or_404(id)
    try:
        db.session.delete(p)
        db.session.commit()
        return jsonify({
        "status": "success",
        "messagem":"Produto deletado"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"status":"error", "messagem":str(e)}), 500