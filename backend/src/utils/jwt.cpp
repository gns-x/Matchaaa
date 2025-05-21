#include "jwt.hpp"
#include <jwt-cpp/jwt.h>
#include <chrono>

namespace jwt {

std::string generate(const std::string& userId) {
    return jwt::create()
        .set_issuer("web-matcha")
        .set_type("JWS")
        .set_issued_at(std::chrono::system_clock::now())
        .set_expires_at(std::chrono::system_clock::now() + std::chrono::hours{1})
        .set_payload_claim("user_id", jwt::claim(userId))
        .sign(jwt::algorithm::hs256{"your-secret-key"});
}

std::string verify(const std::string& token) {
    auto verifier = jwt::verify()
        .allow_algorithm(jwt::algorithm::hs256{"your-secret-key"})
        .with_issuer("web-matcha");

    auto decoded = jwt::decode(token);
    verifier.verify(decoded);

    return decoded.get_payload_claim("user_id").as_string();
}

} // namespace jwt 