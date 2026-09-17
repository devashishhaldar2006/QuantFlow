#include "api/Server.hpp"

#include <cstdlib>
#include <iostream>
#include <string>

int main()
{
    try
    {
        int port = 8080;
        const char* portEnv = std::getenv("PORT");
        if (portEnv != nullptr && *portEnv != '\0')
        {
            try
            {
                port = std::stoi(portEnv);
            }
            catch (const std::exception& ex)
            {
                std::cerr << "Warning: Invalid PORT environment variable '" << portEnv
                          << "', falling back to default " << port << " (" << ex.what() << ")\n";
            }
        }

        Server server;
        server.start(port);
    }
    catch (const std::exception& e)
    {
        std::cerr << "Fatal: " << e.what() << '\n';
        return 1;
    }

    return 0;
}