#include "crow.h"
#include "db/connection.hpp"
#include "routes/auth.hpp"
#include "routes/profile.hpp"
#include <iostream>

int main() {
    try {
        // Initialize database connection
        db::Connection::initialize(
            "host=localhost "
            "port=5432 "
            "dbname=web_matcha "
            "user=postgres "
            "password=postgres"
        );

        // Create Crow application
        crow::App<crow::CORSHandler> app;

        // Configure CORS
        auto& cors = app.get_middleware<crow::CORSHandler>();
        cors
            .global()
            .headers("Content-Type", "Authorization")
            .methods("POST"_method, "GET"_method, "PUT"_method, "DELETE"_method);

        // Setup routes
        CROW_ROUTE(app, "/api/health").methods("GET"_method)
        ([](const crow::request& req) {
            return crow::response(200, "{ \"status\": \"healthy\" }");
        });

        // Register auth routes
        registerAuthRoutes(app);
        
        // Register profile routes
        registerProfileRoutes(app);

        // Start the server
        app.port(8080).multithreaded().run();
    }
    catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}