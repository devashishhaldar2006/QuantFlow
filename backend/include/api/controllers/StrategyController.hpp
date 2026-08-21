#pragma once

#include "httplib.h"

class StrategyController
{
public:
    static void registerRoutes(httplib::Server& server);

private:
    static void handleStrategies(
        const httplib::Request& req,
        httplib::Response& res);
};