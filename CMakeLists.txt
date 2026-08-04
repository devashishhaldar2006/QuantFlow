cmake_minimum_required(VERSION 3.20)

project(
    QuantFlow
    VERSION 0.1.0
    DESCRIPTION "A production-quality quantitative trading engine"
    LANGUAGES CXX
)

find_package(nlohmann_json REQUIRED)

include(CTest)
enable_testing()

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

include(FetchContent)

FetchContent_Declare(
    googletest
    URL https://github.com/google/googletest/archive/refs/tags/v1.17.0.zip
)

FetchContent_MakeAvailable(googletest)

# ==========================================================
# QuantFlow Library
# ==========================================================

add_library(QuantFlowLib

    # Market
    src/market/Candle.cpp
    src/market/MarketData.cpp

    # IO
    src/io/CSVParser.cpp

    # Engine
    src/engine/MarketIterator.cpp
    src/engine/BacktestEngine.cpp

    # Execution
    src/execution/ExecutionEngine.cpp

    # Portfolio
    src/portfolio/Portfolio.cpp

    # Trade
    src/trade/Trade.cpp

    # Risk
    src/risk/PositionSizer.cpp
    src/risk/RiskManager.cpp

    # Analytics
    src/analytics/PerformanceAnalyzer.cpp
    src/analytics/Statistics.cpp

    # Indicators
    src/indicators/SMA.cpp
    src/indicators/EMA.cpp
    src/indicators/RSI.cpp
    src/indicators/MACD.cpp
    src/indicators/ATR.cpp
    src/indicators/BollingerBands.cpp

    # Strategies
    src/strategy/AlwaysHoldStrategy.cpp
    src/strategy/MovingAverageCrossStrategy.cpp
    src/strategy/EMACrossStrategy.cpp
    src/strategy/RSIStrategy.cpp
    src/strategy/MACDStrategy.cpp
    src/strategy/BollingerStrategy.cpp
    src/strategy/ATRFilterStrategy.cpp
    src/strategy/StrategyFactory.cpp

    # Reporting
    src/reporting/ConsoleReporter.cpp

    # Config
    src/config/ConfigParser.cpp
)

target_include_directories(QuantFlowLib
    PUBLIC
        include
)

target_link_libraries(QuantFlowLib
    PUBLIC
        nlohmann_json::nlohmann_json
)

# ==========================================================
# Main Executable
# ==========================================================

add_executable(QuantFlow
    src/main.cpp
)

target_link_libraries(QuantFlow
    PRIVATE
        QuantFlowLib
)

# ==========================================================
# REST API Server
# ==========================================================

add_executable(QuantFlowServer
    src/server_main.cpp
    src/api/Server.cpp
    src/api/controllers/HealthController.cpp
    src/api/controllers/BacktestController.cpp
)

target_link_libraries(QuantFlowServer
    PRIVATE
        QuantFlowLib
)

target_include_directories(QuantFlowServer
    PRIVATE
        ${PROJECT_SOURCE_DIR}/third_party/httplib
)

# ==========================================================
# Compiler Warnings
# ==========================================================

if(CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")

    target_compile_options(QuantFlowLib PRIVATE
        -Wall
        -Wextra
        -Wpedantic
        -Wshadow
        -Wconversion
    )

    target_compile_options(QuantFlow PRIVATE
        -Wall
        -Wextra
        -Wpedantic
        -Wshadow
        -Wconversion
    )

    target_compile_options(QuantFlowServer PRIVATE
        -Wall
        -Wextra
        -Wpedantic
        -Wshadow
        -Wconversion
    )

endif()

# ==========================================================
# Build Type
# ==========================================================

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Debug)
endif()

# ==========================================================
# Sanitizers (Debug Builds)
# ==========================================================

if(CMAKE_BUILD_TYPE STREQUAL "Debug")

    if(CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")

        target_compile_options(QuantFlowLib PRIVATE
            -fsanitize=address
            -fsanitize=undefined
        )

        target_link_options(QuantFlowLib PRIVATE
            -fsanitize=address
            -fsanitize=undefined
        )

        target_compile_options(QuantFlow PRIVATE
            -fsanitize=address
            -fsanitize=undefined
        )

        target_link_options(QuantFlow PRIVATE
            -fsanitize=address
            -fsanitize=undefined
        )

        target_compile_options(QuantFlowServer PRIVATE
            -fsanitize=address
            -fsanitize=undefined
        )

        target_link_options(QuantFlowServer PRIVATE
            -fsanitize=address
            -fsanitize=undefined
        )

    endif()

endif()

# ==========================================================
# Tests
# ==========================================================

add_subdirectory(tests)