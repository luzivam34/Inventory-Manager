from flask import Blueprint, jsonify


main_bp = Blueprint("mainbp", __name__)


@main_bp.route("/", methods=["GET"])
def index():
    return jsonify({
        "menssage": "The API is working correctly!",
        "status": "ok"
        }), 200

@main_bp.route("/health", methods=["GET"])
def healt_check():
    return jsonify(status="ok"), 200


