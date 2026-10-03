from flask import Flask
from app.services.extentions import db, migrate, CORS
from config import Config

# function the creates the application
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)


    from .routes.main_routes import main_bp

    app.register_blueprint(main_bp)

    return app