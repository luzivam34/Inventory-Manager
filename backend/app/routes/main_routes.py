from flask import Blueprint, jsonify


main_bp = Blueprint("mainbp", __name__)


@main_bp.route("/")
def index():
    return jsonify({
        "menssage": "api funcionando!",
        "status": "ok"
        })