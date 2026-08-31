#include "api/Server.hpp"

#include "api/controllers/HealthController.hpp"
#include "api/controllers/BacktestController.hpp"
#include "api/controllers/StrategyController.hpp"

#include <iostream>
#include <stdexcept>

void Server::registerRoutes(
    httplib::Server& server)
{
    server.set_default_headers(
    {
        {"Access-Control-Allow-Origin", "*"},
        {"Access-Control-Allow-Methods", "GET, POST, OPTIONS"},
        {"Access-Control-Allow-Headers", "Content-Type"}
    });

    HealthController::registerRoutes(server);
    BacktestController::registerRoutes(server);
    StrategyController::registerRoutes(server);
}

void Server::start(int port)
{
    httplib::Server server;

    registerRoutes(server);

    std::cout
        << "QuantFlow REST API listening on http://localhost:"
        << port
        << '\n';

    if (!server.listen("0.0.0.0", port))
    {
        throw std::runtime_error(
            "Failed to bind to port " +
            std::to_string(port) +
            " — port may already be in use");
    }
}