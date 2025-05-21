#include "auth_service.hpp"
#include "../db/connection.hpp"
#include "../utils/jwt.hpp"
#include "../utils/hash.hpp"
#include <pqxx/pqxx>
#include <random>
#include <sstream>

json AuthService::registerUser(const std::string& email, const std::string& password,
                             const std::string& username, const std::string& firstName,
                             const std::string& lastName) {
    auto& conn = db::Connection::get();
    pqxx::work txn(conn);

    // Check if email or username already exists
    auto result = txn.exec_params(
        "SELECT id FROM users WHERE email = $1 OR username = $2",
        email, username
    );

    if (!result.empty()) {
        throw std::runtime_error("Email or username already exists");
    }

    // Hash password
    std::string hashedPassword = hashPassword(password);

    // Insert new user
    result = txn.exec_params(
        "INSERT INTO users (email, password, username, first_name, last_name) "
        "VALUES ($1, $2, $3, $4, $5) RETURNING id",
        email, hashedPassword, username, firstName, lastName
    );

    txn.commit();

    // Generate JWT token
    std::string userId = result[0][0].as<std::string>();
    std::string token = generateJWT(userId);

    return json{
        {"token", token},
        {"user", {
            {"id", userId},
            {"email", email},
            {"username", username},
            {"firstName", firstName},
            {"lastName", lastName}
        }}
    };
}

json AuthService::login(const std::string& email, const std::string& password) {
    auto& conn = db::Connection::get();
    pqxx::work txn(conn);

    auto result = txn.exec_params(
        "SELECT id, password, username, first_name, last_name FROM users WHERE email = $1",
        email
    );

    if (result.empty()) {
        throw std::runtime_error("Invalid credentials");
    }

    std::string hashedPassword = result[0][1].as<std::string>();
    if (!verifyPassword(password, hashedPassword)) {
        throw std::runtime_error("Invalid credentials");
    }

    std::string userId = result[0][0].as<std::string>();
    std::string token = generateJWT(userId);

    return json{
        {"token", token},
        {"user", {
            {"id", userId},
            {"email", email},
            {"username", result[0][2].as<std::string>()},
            {"firstName", result[0][3].as<std::string>()},
            {"lastName", result[0][4].as<std::string>()}
        }}
    };
}

void AuthService::verifyEmail(const std::string& token) {
    // TODO: Implement email verification
    throw std::runtime_error("Not implemented");
}

void AuthService::forgotPassword(const std::string& email) {
    // TODO: Implement forgot password
    throw std::runtime_error("Not implemented");
}

void AuthService::resetPassword(const std::string& token, const std::string& newPassword) {
    // TODO: Implement password reset
    throw std::runtime_error("Not implemented");
}

std::string AuthService::generateJWT(const std::string& userId) {
    return jwt::generate(userId);
}

std::string AuthService::hashPassword(const std::string& password) {
    return hash::bcrypt(password);
}

bool AuthService::verifyPassword(const std::string& password, const std::string& hash) {
    return hash::verify(password, hash);
} 