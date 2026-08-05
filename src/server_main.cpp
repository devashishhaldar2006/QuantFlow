#include "api/Server.hpp"

#include <iostream>

int main()
{
    try
    {
        Server server;
        server.start();
    }
    catch (const std::exception& e)
    {
        std::cerr << "Fatal: " << e.what() << '\n';
        return 1;
    }

    return 0;
}