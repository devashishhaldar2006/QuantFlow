add_executable(QuantFlowTests
    PortfolioTests.cpp
    StatisticsTests.cpp
    RSITests.cpp
)

target_link_libraries(QuantFlowTests
    PRIVATE
        QuantFlowLib
        GTest::gtest_main
)

if(CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")

    target_compile_options(QuantFlowTests PRIVATE
        -fsanitize=address
        -fsanitize=undefined
    )

    target_link_options(QuantFlowTests PRIVATE
        -fsanitize=address
        -fsanitize=undefined
    )

endif()

include(GoogleTest)

gtest_discover_tests(QuantFlowTests)