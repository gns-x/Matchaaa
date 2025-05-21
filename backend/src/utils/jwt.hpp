#pragma once

#include <string>

namespace jwt {

std::string generate(const std::string& userId);
std::string verify(const std::string& token);

} // namespace jwt