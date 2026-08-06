#pragma once

#include "httplib.h"

class Server
{
public:
    void start(int port = 8080);

private:
    void registerRoutes(httplib::Server& server);
};