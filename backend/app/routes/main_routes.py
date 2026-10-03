from flask import Blueprint, jsonify


main_bp = Blueprint("mainbp", __name__, url_prefix="/api")


@main_bp.route("/")
def index():
    return jsonify({
        "menssage": "The API is working correctly!",
        "status": "ok"
        })
