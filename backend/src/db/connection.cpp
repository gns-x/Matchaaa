#include "connection.hpp"

namespace db {

std::unique_ptr<pqxx::connection> Connection::connection_;

void Connection::initialize(const std::string& connection_string) {
    connection_ = std::make_unique<pqxx::connection>(connection_string);
}

pqxx::connection& Connection::get() {
    if (!connection_) {
        throw std::runtime_error("Database connection not initialized");
    }
    return *connection_;
}

} // namespace db 