from flask import Flask
from app.services.extentions import db, migrate
from flask_cors import CORS
from config import Config

# function the creates the application
def create_app():
    app = Flask(__name__)

    # Configurações
    app.config.from_object(Config)

    #Extensões
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app, resources={r"/api/*":{"origins":"http://localhost:5173"}})

    # Blueprint
    # Importações Routes
    from .routes.main_routes import main_bp
    from .routes.produtos_route import produto_bp

    # Registro de Routes
    app.register_blueprint(main_bp, url_prefix="/api")
    app.register_blueprint(produto_bp, url_prefix="/api/produtos")

    @app.errorhandler(404)
    def not_found(error):
        return {"error": "Rota não encontrada"}, 404

    @app.errorhandler(500)
    def internal_error(error):
        return {"error": "Erro interno no servidor"}, 500

    return app