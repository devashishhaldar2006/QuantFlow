#include "api/Server.hpp"
#include "api/controllers/HealthController.hpp"
#include "api/controllers/BacktestController.hpp"

#include <iostream>

void Server::registerRoutes(
    httplib::Server& server)
{
    HealthController::registerRoutes(server);
    BacktestController::registerRoutes(server);
}

void Server::start(int port)
{
    httplib::Server server;

    registerRoutes(server);

    std::cout
        << "QuantFlow REST API listening on http://localhost:"
        << port
        << '\n';

    server.listen("0.0.0.0", port);
}