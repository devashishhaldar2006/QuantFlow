#pragma once

#include "httplib.h"

class HealthController
{
public:
    static void registerRoutes(httplib::Server& server);
};