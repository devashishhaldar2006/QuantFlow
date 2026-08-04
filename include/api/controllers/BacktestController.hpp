#pragma once

#include "httplib.h"

class BacktestController
{
public:
    static void registerRoutes(httplib::Server& server);

private:
    static void handleBacktest(
        const httplib::Request& req,
        httplib::Response& res);
};