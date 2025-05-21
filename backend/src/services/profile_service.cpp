#include "profile_service.hpp"
#include "../db/connection.hpp"
#include "../utils/jwt.hpp"
#include <pqxx/pqxx>

json ProfileService::getProfile(const std::string& authToken) {
    std::string userId = getUserIdFromToken(authToken);
    auto& conn = db::Connection::get();
    pqxx::work txn(conn);

    auto result = txn.exec_params(
        "SELECT email, username, first_name, last_name, profile_picture "
        "FROM users WHERE id = $1",
        userId
    );

    if (result.empty()) {
        throw std::runtime_error("User not found");
    }

    return json{
        {"id", userId},
        {"email", result[0][0].as<std::string>()},
        {"username", result[0][1].as<std::string>()},
        {"firstName", result[0][2].as<std::string>()},
        {"lastName", result[0][3].as<std::string>()},
        {"profilePicture", result[0][4].is_null() ? nullptr : result[0][4].as<std::string>()}
    };
}

json ProfileService::updateProfile(const std::string& authToken, const json& profileData) {
    std::string userId = getUserIdFromToken(authToken);
    auto& conn = db::Connection::get();
    pqxx::work txn(conn);

    // Update only provided fields
    std::string query = "UPDATE users SET ";
    std::vector<std::string> updates;
    std::vector<std::string> params;
    int paramCount = 1;

    if (profileData.contains("username")) {
        updates.push_back("username = $" + std::to_string(paramCount++));
        params.push_back(profileData["username"]);
    }
    if (profileData.contains("firstName")) {
        updates.push_back("first_name = $" + std::to_string(paramCount++));
        params.push_back(profileData["firstName"]);
    }
    if (profileData.contains("lastName")) {
        updates.push_back("last_name = $" + std::to_string(paramCount++));
        params.push_back(profileData["lastName"]);
    }

    if (updates.empty()) {
        throw std::runtime_error("No fields to update");
    }

    query += boost::algorithm::join(updates, ", ");
    query += " WHERE id = $" + std::to_string(paramCount);
    params.push_back(userId);

    txn.exec_params(query, params);
    txn.commit();

    return getProfile(authToken);
}

json ProfileService::uploadProfilePicture(const std::string& authToken, const std::string& imageData) {
    // TODO: Implement image upload and storage
    throw std::runtime_error("Not implemented");
}

std::string ProfileService::getUserIdFromToken(const std::string& authToken) {
    // Remove "Bearer " prefix if present
    std::string token = authToken;
    if (token.substr(0, 7) == "Bearer ") {
        token = token.substr(7);
    }

    try {
        return jwt::verify(token);
    }
    catch (const std::exception& e) {
        throw std::runtime_error("Invalid token");
    }
} 