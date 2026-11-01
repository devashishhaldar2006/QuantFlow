# Security Policy

## Supported Versions

We provide security updates and patches for the following branches and versions of QuantFlow:

| Version / Branch | Supported          |
| ---------------- | ------------------ |
| `master` (Latest)| :white_check_mark: |
| `dev`            | :white_check_mark: |
| Older releases   | :x:                |

---

## Reporting a Vulnerability

The QuantFlow team takes the security of our quantitative trading platform, execution engine, user financial models, and API integrations very seriously.

If you believe you have found a security vulnerability in QuantFlow, **please do not disclose it publicly or open a public GitHub issue**.

### Responsible Disclosure Process

1. **Email Us Privately**: Send a detailed report to **Devashish Haldar** at:
   - **Email**: [workfordevashishhaldar@gmail.com](mailto:workfordevashishhaldar@gmail.com)
   - **Subject**: `[SECURITY VULNERABILITY] QuantFlow - <Brief Description>`
2. **Include Necessary Details**:
   - Type of vulnerability (e.g., authentication bypass, injection, buffer overflow in C++ core, SSRF, secret leak)
   - Step-by-step reproduction instructions or proof-of-concept (PoC)
   - Impact of the issue (e.g., unauthorized data access, arbitrary code execution)
   - Any suggested mitigations or patches
3. **Response Timeline**:
   - We will acknowledge receipt of your vulnerability report within **48 hours**.
   - We will provide regular updates on our progress in validating and fixing the issue.
   - Once a fix is verified and deployed to `dev` and `master`, we will publicly credit you in our release notes (unless you request anonymity).

---

## Security Best Practices for Users & Deployments

When deploying or self-hosting QuantFlow:
- **Never commit production secrets**: Keep `.env.local` and `.env` files in `.gitignore`.
- **API Keys & Credentials**: Ensure Clerk keys, database connection strings (`DATABASE_URL`), and broker/exchange API secrets are kept strictly confidential.
- **Network Isolation**: When hosting the C++ engine (`backend`) in production, restrict inbound network traffic so it is only reachable by the Next.js API or VPC reverse proxies.
