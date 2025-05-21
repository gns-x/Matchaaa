#pragma once

#include "crow.h"
#include "../services/profile_service.hpp"

class ProfileController {
public:
    static crow::response getProfile(const crow::request& req);
    static crow::response updateProfile(const crow::request& req);
    static crow::response uploadProfilePicture(const crow::request& req);

private:
    static ProfileService profileService;
}; 