# Contributing to QuantFlow

Thank you for your interest in contributing to **QuantFlow**! We welcome contributions from developers, quantitative researchers, algorithm engineers, and open-source enthusiasts.

Please take a moment to review this document before submitting issues, creating pull requests, or proposing architecture changes.

---

## Code of Conduct

All contributors and maintainers are expected to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any violations to [workfordevashishhaldar@gmail.com](mailto:workfordevashishhaldar@gmail.com).

---

## Architecture Overview

QuantFlow is structured into two core components:
1. **`backend/`**: High-performance compiled C++20 quantitative execution engine, backtesting harness, risk calculation algorithms, and REST API microservice (served via Crow / Asio).
2. **`frontend/`**: Modern Next.js 16 Web Terminal (React 19, TypeScript, Tailwind CSS, Shadcn UI, TradingView Lightweight Charts, Clerk Authentication, and Supabase integration).

---

## Development Setup

### Prerequisites
- **Git**
- **C++20 Compiler**: GCC 11+, Clang 13+, or MSVC 2022+
- **CMake**: Version 3.20 or newer
- **Node.js**: v20.x or newer & npm / pnpm
- **Docker & Docker Compose** (Optional, recommended for containerized testing)

### Setting Up the C++ Engine (Backend)
```bash
# Clone the repository
git clone https://github.com/devashishhaldar2006/QuantFlow.git
cd QuantFlow

# Configure and build the backend
cmake -S backend -B backend/build -DCMAKE_BUILD_TYPE=Release
cmake --build backend/build --config Release

# Run backend test suite (197+ tests)
ctest --test-dir backend/build --output-on-failure
```

### Setting Up the Web Terminal (Frontend)
```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

The web application will be available at `http://localhost:3000`.

---

## Branching Strategy & Workflow

We use a Git branching model centered around `dev` for active integration:

1. **`dev`**: The default active development branch. All feature branches and pull requests must target `dev`.
2. **`master`**: Production release branch. Only stable, fully tested code is merged from `dev` into `master`.
3. **Feature / Fix branches**: Branch off `dev` using clear, semantic branch names:
   - `feature/<short-description>` (e.g., `feature/bollinger-strategy`)
   - `fix/<short-description>` (e.g., `fix/slippage-calculation`)
   - `refactor/<short-description>`
   - `docs/<short-description>`

### Standard Contribution Steps

1. **Fork or create a feature branch** from the latest `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes**: Write clean, modular, and thoroughly tested code.
3. **Run tests**:
   - Backend: `ctest --test-dir backend/build --output-on-failure`
   - Frontend: `npm run build` and `npm run lint`
4. **Commit using Conventional Commits** (see below).
5. **Push and open a Pull Request** targeting the `dev` branch.

---

## Commit Message Conventions

We enforce [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

### Allowed Types
- `feat`: New features or strategy algorithms
- `fix`: Bug fixes
- `docs`: Documentation updates
- `style`: Formatting, UI design adjustments, CSS
- `refactor`: Code refactoring without changing functionality
- `perf`: Performance optimizations
- `test`: Adding or updating tests
- `chore`: Tooling, build system, or dependency updates

### Examples
- `feat(engine): add exponential moving average cross strategy`
- `fix(backtest): resolve intrabar double-trigger execution edge case`
- `docs(readme): add institutional terminal architecture diagram`

---

## Pull Request Guidelines

Before submitting your PR:
- [ ] PR targets the **`dev`** branch.
- [ ] All new and existing unit tests pass without errors.
- [ ] No extraneous files, secrets, or temporary debug logs are committed.
- [ ] TypeScript types compile without errors (`npm run build`).
- [ ] PR description clearly explains the **problem solved**, **implementation details**, and **how it was tested**.

---

## Need Help?

If you have questions, ideas, or need guidance on contributing, feel free to open a [GitHub Discussion / Issue](https://github.com/devashishhaldar2006/QuantFlow/issues) or email Devashish Haldar at [workfordevashishhaldar@gmail.com](mailto:workfordevashishhaldar@gmail.com).
