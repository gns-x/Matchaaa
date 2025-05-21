#include "profile_controller.hpp"
#include <nlohmann/json.hpp>

using json = nlohmann::json;

ProfileService ProfileController::profileService;

crow::response ProfileController::getProfile(const crow::request& req) {
    try {
        // Get user ID from JWT token
        auto auth_header = req.get_header_value("Authorization");
        if (auth_header.empty()) {
            return crow::response(401, "Missing authorization token");
        }

        auto result = profileService.getProfile(auth_header);
        return crow::response(200, result.dump());
    }
    catch (const std::exception& e) {
        return crow::response(500, e.what());
    }
}

crow::response ProfileController::updateProfile(const crow::request& req) {
    try {
        auto auth_header = req.get_header_value("Authorization");
        if (auth_header.empty()) {
            return crow::response(401, "Missing authorization token");
        }

        auto body = json::parse(req.body);
        auto result = profileService.updateProfile(auth_header, body);
        return crow::response(200, result.dump());
    }
    catch (const std::exception& e) {
        return crow::response(500, e.what());
    }
}

crow::response ProfileController::uploadProfilePicture(const crow::request& req) {
    try {
        auto auth_header = req.get_header_value("Authorization");
        if (auth_header.empty()) {
            return crow::response(401, "Missing authorization token");
        }

        // Handle multipart form data
        auto result = profileService.uploadProfilePicture(auth_header, req.body);
        return crow::response(200, result.dump());
    }
    catch (const std::exception& e) {
        return crow::response(500, e.what());
    }
} 