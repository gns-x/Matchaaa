cmake_minimum_required(VERSION 3.15)
project(web_matcha)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find required packages
find_package(OpenSSL REQUIRED)
find_package(Threads REQUIRED)
find_package(PostgreSQL REQUIRED)

# Add Crow (header-only)
include_directories(${CMAKE_SOURCE_DIR}/include)

# Add source files
set(SOURCES
    src/main.cpp
    src/routes/auth.cpp
    src/routes/profile.cpp
    src/controllers/auth_controller.cpp
    src/controllers/profile_controller.cpp
    src/services/auth_service.cpp
    src/services/profile_service.cpp
    src/db/connection.cpp
    src/utils/jwt.cpp
    src/utils/hash.cpp
)

# Create executable
add_executable(${PROJECT_NAME} ${SOURCES})

# Link libraries
target_link_libraries(${PROJECT_NAME}
    PRIVATE
    OpenSSL::SSL
    OpenSSL::Crypto
    PostgreSQL::PostgreSQL
    Threads::Threads
    -lpqxx
    -lpq
    -lcrypto
    -lbcrypt
    -ljwt-cpp
)

# Include directories
target_include_directories(${PROJECT_NAME}
    PRIVATE
    ${CMAKE_SOURCE_DIR}/include
    ${PostgreSQL_INCLUDE_DIRS}
)