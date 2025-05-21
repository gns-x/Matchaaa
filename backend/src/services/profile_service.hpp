#pragma once

#include <string>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

class ProfileService {
public:
    json getProfile(const std::string& authToken);
    json updateProfile(const std::string& authToken, const json& profileData);
    json uploadProfilePicture(const std::string& authToken, const std::string& imageData);

private:
    std::string getUserIdFromToken(const std::string& authToken);
}; 