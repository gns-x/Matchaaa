#pragma once

#include <string>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

class AuthService {
public:
    json registerUser(const std::string& email, const std::string& password,
                     const std::string& username, const std::string& firstName,
                     const std::string& lastName);
    json login(const std::string& email, const std::string& password);
    void verifyEmail(const std::string& token);
    void forgotPassword(const std::string& email);
    void resetPassword(const std::string& token, const std::string& newPassword);

private:
    std::string generateJWT(const std::string& userId);
    std::string hashPassword(const std::string& password);
    bool verifyPassword(const std::string& password, const std::string& hash);
}; 