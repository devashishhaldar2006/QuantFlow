#include "api/dto/StrategyInfo.hpp"

nlohmann::json StrategyInfo::toJson() const
{
    return {
        {"name", name},
        {"category", category},
        {"description", description},
        {"parameters", parameters}
    };
}