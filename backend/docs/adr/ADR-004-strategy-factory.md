# Architecture Decision Record 004: Strategy Factory Pattern

## Status
Accepted

## Context
The initial implementation of `StrategyFactory::create` used a long `if-else` chain to match a string from the configuration to a specific strategy class and instantiate it. While simple, this approach violates the Open-Closed Principle (OCP) because the factory method must be modified every time a new strategy is added.

## Decision
We decided to refactor `StrategyFactory` to use a Registry pattern with `std::unordered_map`. 
The map maps strategy names (`std::string`) to creator functions (`std::function<std::unique_ptr<Strategy>(const Config&)>`).

## Consequences
- **Positive:** Adding a new strategy now only requires appending an entry to the registry map, making the code much cleaner and OCP-compliant.
- **Positive:** Lookup time is improved from O(N) string comparisons to O(1) hash map lookup.
- **Negative:** Slightly more complex initialization syntax due to the use of lambdas and `std::unordered_map` static initialization.
