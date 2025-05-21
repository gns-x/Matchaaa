#include "hash.hpp"
#include <bcrypt/BCrypt.hpp>

namespace hash {

std::string bcrypt(const std::string& password) {
    return BCrypt::generateHash(password);
}

bool verify(const std::string& password, const std::string& hash) {
    return BCrypt::validatePassword(password, hash);
}

} // namespace hash 