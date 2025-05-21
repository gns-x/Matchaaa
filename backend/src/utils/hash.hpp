#pragma once

#include <string>

namespace hash {

std::string hash(const std::string& password);
bool verify(const std::string& password, const std::string& hash);

} // namespace hash