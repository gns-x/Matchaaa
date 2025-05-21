#pragma once
#include <pqxx/pqxx>
#include <string>
#include <memory>

namespace db {
    class Connection {
    public:
        static void initialize(const std::string& connection_string);
        static pqxx::connection& get();

    private:
        static std::unique_ptr<pqxx::connection> connection_;
    };
}