cmake_minimum_required(VERSION 3.20)

project(
    QuantFlow
    VERSION 0.1.0
    DESCRIPTION "A production-quality quantitative trading engine"
    LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_executable(QuantFlow
    src/main.cpp
    src/market/Candle.cpp
    src/market/MarketData.cpp
    src/io/CSVParser.cpp
    src/engine/MarketIterator.cpp
    src/engine/BacktestEngine.cpp
    src/strategy/AlwaysHoldStrategy.cpp
    src/portfolio/Portfolio.cpp
    src/trade/Trade.cpp
)

target_include_directories(QuantFlow
    PRIVATE
        include
)

if(CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")
    add_compile_options(
        -Wall
        -Wextra
        -Wpedantic
        -Wshadow
        -Wconversion
    )
endif()

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Debug)
endif()

if(CMAKE_BUILD_TYPE STREQUAL "Debug")
    if(CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")
        add_compile_options(
            -fsanitize=address
            -fsanitize=undefined
        )

        add_link_options(
            -fsanitize=address
            -fsanitize=undefined
        )
    endif()
endif()
