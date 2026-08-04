#include "api/controllers/HealthController.hpp"

void HealthController::registerRoutes(
    httplib::Server& server)
{
    server.Get(
        "/health",
        [](const httplib::Request&,
           httplib::Response& res)
        {
            res.set_content(
                R"({"status":"ok"})",
                "application/json");
        });
}