#include "auth.hpp"
#include "../controllers/auth_controller.hpp"

void registerAuthRoutes(crow::App<crow::CORSHandler>& app) {
    // Register
    CROW_ROUTE(app, "/api/auth/register")
        .methods("POST"_method)
        ([](const crow::request& req) {
            return AuthController::registerUser(req);
        });

    // Login
    CROW_ROUTE(app, "/api/auth/login")
        .methods("POST"_method)
        ([](const crow::request& req) {
            return AuthController::login(req);
        });

    // Verify email
    CROW_ROUTE(app, "/api/auth/verify-email")
        .methods("POST"_method)
        ([](const crow::request& req) {
            return AuthController::verifyEmail(req);
        });

    // Forgot password
    CROW_ROUTE(app, "/api/auth/forgot-password")
        .methods("POST"_method)
        ([](const crow::request& req) {
            return AuthController::forgotPassword(req);
        });

    // Reset password
    CROW_ROUTE(app, "/api/auth/reset-password")
        .methods("POST"_method)
        ([](const crow::request& req) {
            return AuthController::resetPassword(req);
        });
} 