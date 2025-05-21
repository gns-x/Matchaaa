#include "auth_controller.hpp"
#include <nlohmann/json.hpp>

using json = nlohmann::json;

AuthService AuthController::authService;

crow::response AuthController::registerUser(const crow::request& req) {
    try {
        auto body = json::parse(req.body);
        
        // Validate required fields
        if (!body.contains("email") || !body.contains("password") ||
            !body.contains("username") || !body.contains("firstName") ||
            !body.contains("lastName")) {
            return crow::response(400, "Missing required fields");
        }

        // Create user via service
        auto result = authService.registerUser(
            body["email"],
            body["password"],
            body["username"],
            body["firstName"],
            body["lastName"]
        );

        return crow::response(201, result.dump());
    }
    catch (const std::exception& e) {
        return crow::response(500, e.what());
    }
}

crow::response AuthController::login(const crow::request& req) {
    try {
        auto body = json::parse(req.body);
        
        if (!body.contains("email") || !body.contains("password")) {
            return crow::response(400, "Missing email or password");
        }

        auto result = authService.login(
            body["email"],
            body["password"]
        );

        return crow::response(200, result.dump());
    }
    catch (const std::exception& e) {
        return crow::response(401, "Invalid credentials");
    }
}

crow::response AuthController::verifyEmail(const crow::request& req) {
    try {
        auto body = json::parse(req.body);
        
        if (!body.contains("token")) {
            return crow::response(400, "Missing verification token");
        }

        authService.verifyEmail(body["token"]);
        return crow::response(200, "Email verified successfully");
    }
    catch (const std::exception& e) {
        return crow::response(400, e.what());
    }
}

crow::response AuthController::forgotPassword(const crow::request& req) {
    try {
        auto body = json::parse(req.body);
        
        if (!body.contains("email")) {
            return crow::response(400, "Missing email");
        }

        authService.forgotPassword(body["email"]);
        return crow::response(200, "Password reset instructions sent");
    }
    catch (const std::exception& e) {
        return crow::response(400, e.what());
    }
}

crow::response AuthController::resetPassword(const crow::request& req) {
    try {
        auto body = json::parse(req.body);
        
        if (!body.contains("token") || !body.contains("password")) {
            return crow::response(400, "Missing token or new password");
        }

        authService.resetPassword(body["token"], body["password"]);
        return crow::response(200, "Password reset successfully");
    }
    catch (const std::exception& e) {
        return crow::response(400, e.what());
    }
} 