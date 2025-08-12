# Spring Boot Security Basic

[📄 Articles](https://nirmalakumarsahu.in/spring-boot.html) | [👤 My Profile](https://nirmalakumarsahu.in)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Framework-blue?logo=spring)](https://spring.io/projects/spring-boot) [![Security](https://img.shields.io/badge/Security-Authentication%20and%20Authorization-blue?logo=security)](https://spring.io/projects/spring-security)

[![Spring Framework](https://img.shields.io/badge/Spring%20Framework-Framework-blue?logo=spring)](https://spring.io/projects/spring-framework) [![Framework](https://img.shields.io/badge/Framework-Software%20Development-blue?logo=spring)](https://spring.io/projects/spring-framework)

---

## 📑 Index

- [🔍 What is Spring Boot Security?](#-what-is-spring-boot-security)
- [🛡️ Key Security Areas in a Spring Boot Application](#%EF%B8%8F-key-security-areas-in-a-spring-boot-application)
  - [🔑 Authentication Methods](#-authentication-methods)
  - [📜 Authorization](#-authorization)
  - [🌐 API Security](#-api-security)
  - [🔐 Data Protection](#-data-protection)
  - [📡 Transport Layer Security](#-transport-layer-security)
  - [⚙️ Configuration & Secrets Management](#%EF%B8%8F-configuration--secrets-management)
  - [🚀 Deployment & Server Security](#-deployment--server-security)
- [📚 Advanced Security Concepts](#-advanced-security-concepts)
- [🛡️ Common Attack Protections in Spring Security](#%EF%B8%8F-common-attack-protections-in-spring-security)

---

## 🔍 What is Spring Boot Security?

* **Spring Boot Security** is **Spring Security** preconfigured with sensible defaults.
* It offers:

    * **Authentication** → Verifying *WHO* the user is (username/password, OAuth2, JWT, IAM, etc.)
    * **Authorization** → Deciding *WHAT* the user can do (roles, permissions, IAM policies)
    * **Threat Protection** → Defense against CSRF, XSS, SQL injection, clickjacking, session fixation
    * **Integration with Authentication Providers** → LDAP, OAuth2, OpenID Connect, SAML, IAM systems

💡 If you add `spring-boot-starter-security` to a Spring Boot app:

* All endpoints require authentication by default.
* A default username/password is generated and printed in logs.
* Uses **HTTP Basic Auth** for login unless overridden.

### [🔝 Back to Top](#-index)

---

## 🛡️ Key Security Areas in a Spring Boot Application

| Area                       | Description                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Authentication**         | Verifying **who** the user is — can be local login or via IAM/IdP (Keycloak, Okta, Auth0, Azure AD). |
| **Authorization**          | Deciding **what** the user can do — includes roles, permissions, IAM policies.                       |
| **Data Security**          | Protecting sensitive data at rest and in transit.                                                    |
| **API Security**           | Securing API endpoints from unauthorized access (CSRF, CORS, rate limiting, API keys).               |
| **Configuration Security** | Protecting secrets, credentials, and environment settings.                                           |
| **Transport Security**     | Encrypting communication (HTTPS/TLS).                                                                |
| **Deployment Security**    | Hardening servers, containers, and networks.                                                         |

### 🔑 Authentication Methods

1. **Basic Authentication**

    * Sends username/password with every request (Base64 encoded).
    * Works for internal APIs over HTTPS.
    * Not recommended for production due to security risks.

2. **Form-based Login**

    * Provides a **customizable login UI** with **session** and **cookie**-based authentication.
    * Can use **Spring Security’s built-in login page** or a **custom HTML form**.
    * Supports user authentication via **InMemory**, **Properties file** and **Database**.
    * Using **Database** is preferred in production for persistence and scalability.

3. **Token-based Authentication (JWT)**

    * Stateless authentication for REST APIs.
    * Token carries user details & expiry.

4. **OAuth2 / OpenID Connect (OIDC)**

    * Social logins (Google, GitHub, Facebook)
    * Single Sign-On (SSO) for enterprise systems.

5. **LDAP Authentication**

    * Uses corporate directory servers.

6. **SAML Authentication**

    * Enterprise-level SSO with XML-based security.

7. **IAM Integration**

    * Centralized authentication & authorization (Keycloak, Okta, AWS IAM, Azure AD).

### 📜 Authorization

```java
@PreAuthorize("hasRole('ADMIN')")
public String adminOnly() { ... }
```

```java
http
  .authorizeHttpRequests(auth -> auth
    .requestMatchers("/admin/**").hasRole("ADMIN")
    .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
    .anyRequest().authenticated()
  );
```

### 🌐 API Security

* **CSRF Protection** — On by default for stateful apps. Disable for stateless APIs.
* **CORS** — Define allowed domains for API calls.
* **Rate Limiting** — Prevent brute force attacks.
* **API Keys** — Provide client-specific access tokens.

### 🔐 Data Protection

* **Password Hashing** — Use `BCrypt`, `Argon2`, or `PBKDF2`.
* **Field Encryption** — Encrypt sensitive PII.
* **Database Security** — Use least-privilege accounts & SSL connections.

### 📡 Transport Layer Security

* Use **HTTPS/TLS** — Enforce SSL certificates.
* Enable **HSTS** — Force browsers to use HTTPS.

### ⚙️ Configuration & Secrets Management

* Never hardcode secrets.
* Use Spring Cloud Config, Vault, AWS Secrets Manager, or environment variables.

### 🚀 Deployment & Server Security

* Keep dependencies updated.
* Limit exposed ports.
* Run as **non-root** in containers.
* Scan images (Trivy, Clair).

### [🔝 Back to Top](#-index)

---

## 📚 Advanced Security Concepts

| Term                                   | Meaning                                                                  | Why It Matters                            |
| -------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------- |
| **MFA** (Multi-Factor Authentication)  | Multiple verification methods (e.g., password + OTP + biometric)         | Reduces risk from stolen passwords        |
| **2FA** (Two-Factor Authentication)    | One extra verification step (usually OTP)                                | Easier to implement than full MFA         |
| **IdP** (Identity Provider)            | Service that manages user identity (Okta, Auth0, Azure AD)               | Centralizes authentication                |
| **IAM** (Identity & Access Management) | Framework for managing identities and permissions in large organizations | Ensures consistent, secure access control |

### [🔝 Back to Top](#-index)

---

## 🛡️ Common Attack Protections in Spring Security

| Threat               | Protection in Spring Security   |
| -------------------- | ------------------------------- |
| **CSRF**             | Enabled by default for web apps |
| **XSS**              | Encode output, validate inputs  |
| **SQL Injection**    | Use JPA / Prepared Statements   |
| **Session Fixation** | Automatically mitigated         |
| **Clickjacking**     | Uses `X-Frame-Options` header   |

### [🔝 Back to Top](#-index)

---




### [📖 Read More ➡️](https://nirmalakumarsahu.in/spring-boot.html)

---