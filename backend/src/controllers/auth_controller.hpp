#pragma once
#include "crow.h"
#include "../services/auth_service.hpp"
#include <nlohmann/json.hpp>

using json = nlohmann::json;

class AuthController {
public:
    static crow::response registerUser(const crow::request& req);
    static crow::response login(const crow::request& req);
    static crow::response verifyEmail(const crow::request& req);
    static crow::response forgotPassword(const crow::request& req);
    static crow::response resetPassword(const crow::request& req);

private:
    static AuthService authService;
};