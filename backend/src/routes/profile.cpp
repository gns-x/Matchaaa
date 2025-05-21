#include "profile.hpp"
#include "../controllers/profile_controller.hpp"

void registerProfileRoutes(crow::App<crow::CORSHandler>& app) {
    // Get profile
    CROW_ROUTE(app, "/api/profile")
        .methods("GET"_method)
        ([](const crow::request& req) {
            return ProfileController::getProfile(req);
        });

    // Update profile
    CROW_ROUTE(app, "/api/profile")
        .methods("PUT"_method)
        ([](const crow::request& req) {
            return ProfileController::updateProfile(req);
        });

    // Upload profile picture
    CROW_ROUTE(app, "/api/profile/picture")
        .methods("POST"_method)
        ([](const crow::request& req) {
            return ProfileController::uploadProfilePicture(req);
        });
} 