# ==============================================================================
# QuantFlow C++ Backend Dockerfile (Multi-stage Alpine Build)
# ==============================================================================

# Build stage
FROM alpine:3.20 AS builder

RUN apk add --no-cache \
    build-base \
    cmake \
    ninja \
    g++ \
    nlohmann-json \
    ca-certificates \
    git

WORKDIR /app

# Copy CMake files and sources
COPY CMakeLists.txt ./
COPY include/ ./include/
COPY src/ ./src/
COPY tests/ ./tests/
COPY config/ ./config/
COPY data/ ./data/

# Configure and compile in Release mode with Ninja
RUN cmake -B build -S . -G Ninja -DCMAKE_BUILD_TYPE=Release
RUN cmake --build build --target QuantFlowServer QuantFlow

# Runtime stage
FROM alpine:3.20 AS runner

RUN apk add --no-cache \
    libstdc++ \
    ca-certificates

WORKDIR /app

# Copy compiled binaries from builder
COPY --from=builder /app/build/QuantFlowServer ./QuantFlowServer
COPY --from=builder /app/build/QuantFlow ./QuantFlow
COPY --from=builder /app/config ./config
COPY --from=builder /app/data ./data

# Expose QuantFlow REST API Port
EXPOSE 8080

# Run QuantFlowServer by default
CMD ["./QuantFlowServer"]
