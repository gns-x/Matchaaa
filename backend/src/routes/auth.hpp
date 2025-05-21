#pragma once
#include "crow.h"
#include "../controllers/auth_controller.hpp"

void registerAuthRoutes(crow::App<crow::CORSHandler>& app);