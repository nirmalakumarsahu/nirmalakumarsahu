# Spring Boot Security Basic

[📄 Articles](https://nirmalakumarsahu.in/spring-boot.html) | [👤 My Profile](https://nirmalakumarsahu.in)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Framework-blue?logo=spring)](https://spring.io/projects/spring-boot) [![Security](https://img.shields.io/badge/Security-Authentication%20and%20Authorization-blue?logo=security)](https://spring.io/projects/spring-security)

[![Spring Framework](https://img.shields.io/badge/Spring%20Framework-Framework-blue?logo=spring)](https://spring.io/projects/spring-framework) [![Framework](https://img.shields.io/badge/Framework-Software%20Development-blue?logo=spring)](https://spring.io/projects/spring-framework)

---

## 📑 Index

- [🔍 What is Security?](#-what-is-security)
- [🛡️ Key Security Areas in an Application](#%EF%B8%8F-key-security-areas-in-an-application)
  - [🔑 Authentication](#authentication-overview)
  - [📜 Authorization](#authorization-overview)
  - [🌐 API Security](#-api-security)
  - [🔐 Data Protection](#-data-protection)
  - [📡 Transport Layer Security](#-transport-layer-security)
  - [⚙️ Configuration & Secrets Management](#%EF%B8%8F-configuration--secrets-management)
  - [🚀 Deployment & Server Security](#-deployment--server-security)
- [📚 Advanced Security Concepts](#-advanced-security-concepts)
- [🛡️ Common Attack Protections in Spring Security](#%EF%B8%8F-common-attack-protections-in-spring-security)
- [🛡️ Spring Security Core Concepts](#-spring-security-core-concepts)
  - [🔑 Authentication](#-authentication)
  - [🛂 Authorization](#-authorization)
  - [🧑‍💼 Principal](#-principal)
  - [🪪 Granted Authority](#-granted-authority)
  - [📂 Security Context & SecurityContextHolder](#-security-context--securitycontextholder)
  - [👤 UserDetails](#-userdetails)
  - [🗂️ UserDetailsService](#-userdetailsservice)
  - [🎯 AuthenticationManager](#-authenticationmanager)
  - [🔒 PasswordEncoder](#-passwordencoder)
  - [🚪 AuthenticationEntryPoint](#-authenticationentrypoint)

---

## 🔍 What is Security?

* **Security** is the practice of protecting applications, systems, and data from unauthorized access, misuse, and threats.
* It offers:

    * **Authentication** → Verifying *WHO* the user is (username/password, OAuth2, JWT, IAM, etc.)
    * **Authorization** → Deciding *WHAT* the user can do (roles, permissions, IAM policies)
    * **Threat Protection** → Defense against CSRF, XSS, SQL injection, clickjacking, session fixation
    * **Integration with Authentication Providers** → LDAP, OAuth2, OpenID Connect, SAML, IAM systems
 
### [🔝 Back to Top](#-index)

---

## 🛡️ Key Security Areas in an Application

| Area                       | Description                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Authentication**         | Verifying **who** the user is — can be local login or via IAM/IdP (Keycloak, Okta, Auth0, Azure AD). |
| **Authorization**          | Deciding **what** the user can do — includes roles, permissions, IAM policies.                       |
| **Data Security**          | Protecting sensitive data at rest and in transit.                                                    |
| **API Security**           | Securing API endpoints from unauthorized access (CSRF, CORS, rate limiting, API keys).               |
| **Configuration Security** | Protecting secrets, credentials, and environment settings.                                           |
| **Transport Security**     | Encrypting communication (HTTPS/TLS).                                                                |
| **Deployment Security**    | Hardening servers, containers, and networks.                                                         |

### 🔑 Authentication  <a id="authentication-overview"></a>

* **Authentication** is the process of verifying the identity of a user or system.
* It answers the question, *“Who are you?”*

### 📜 Authorization  <a id="authorization-overview"></a>

* **Authorization** determines what an authenticated user can do.
* It answers the question, *“What are you allowed to do?”*

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

## 🛡️ Spring Security Core Concepts

* **Spring Security’s** architecture is built around a set of core components that work in harmony to protect your applications. In this section, we’ll break down these components and illustrate them with examples following modern best practices.

### 🔑 Authentication

* **Authentication** is the process of confirming the identity of a user or system, essentially answering the question, *“Who are you?”* Spring Security offers multiple modern authentication mechanisms — such as form-based login, OAuth2, and others — while avoiding the use of deprecated classes.

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests((authorize) -> authorize
				.anyRequest().authenticated()
			)
			.httpBasic(Customizer.withDefaults())
			.formLogin(Customizer.withDefaults());

		return http.build();
	}

	@Bean
	public UserDetailsService userDetailsService() {
		UserDetails userDetails = User.withDefaultPasswordEncoder()
			.username("user")
			.password("password")
			.roles("USER")
			.build();

		return new InMemoryUserDetailsManager(userDetails);
	}

}
```

#### Types of authentication methods in Spring Security:

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


### 🛂 Authorization

Once authentication is complete, authorization takes over to determine whether the verified user has the necessary permissions to perform a specific action or access a particular resource. In other words, it answers the question, *“Are you allowed to do this?”* ✅

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .authorizeRequests(authorize -> authorize
            .antMatchers("/admin/**").hasRole("ADMIN")
            .antMatchers("/user/**").hasAnyRole("USER", "ADMIN")
            .antMatchers("/public/**").permitAll()
            .anyRequest().authenticated())
        .formLogin().and()
        .httpBasic();
    return http.build();
}
```

#### 📌 Method-Level Security

We can enforce authorization rules directly within service methods by applying annotations like `@PreAuthorize` or `@Secured`.

**Step 1: Enable Method Security**

To apply Spring Security to specific methods in the REST Controller class of your Spring Boot application, you must enable **method-level security**. This is done using the `@EnableMethodSecurity` annotation.

```java
@Configuration
@EnableMethodSecurity
public class SpringSecurityConfig {
    
}
```

`@EnableMethodSecurity` is a Spring annotation that turns on **method-level security** in a Spring application. When used, Spring creates proxies for the classes containing secured methods and intercepts method calls to check whether the current user has the required permissions.

It works with other security annotations such as:

* `@PreAuthorize` → Check permissions **before** method execution.
* `@PostAuthorize` → Check permissions **after** method execution.
* `@Secured` → Restrict method access based on roles.
* `@RolesAllowed` → Similar to `@Secured`, role-based method access control.

For example:
* `@PreAuthorize("hasRole('ADMIN')")` → Allows access only to ADMIN role.
* `@PostAuthorize` → Can be used to return only the data a user is allowed to see.

**Step 2: Apply Role-Based Access Control**

```java
@RestController
@RequestMapping("/api/")
public class AdminController {

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<String> helloAdmin() {
        return ResponseEntity.ok("Hello Admin");
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user")
    public ResponseEntity<String> helloUser() {
        return ResponseEntity.ok("Hello User");
    }
}
```

### 🧑‍💼 Principal

A principal represents the details of the **currently authenticated user** and is accessible across the application to perform user-specific operations.

```java
Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
String username = authentication.getName();
```

### 🪪 Granted Authority

Granted authorities specify the **permissions** assigned to an authenticated user, defining the actions they are allowed to perform and the resources they can access.

```java
.antMatchers("/api/private/**").hasAuthority("ROLE_USER")
```


### 📂 Security Context & SecurityContextHolder

At the core of Spring Security lies the **SecurityContext**, which stores information about the currently authenticated user, known as the **principal**. This context can be accessed anywhere in the application through the **SecurityContextHolder**, enabling you to make decisions and perform operations based on the user’s authentication status and granted authorities.

```java
Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
if (authentication != null && authentication.isAuthenticated()) {

}
```

### 👤 UserDetails

The **UserDetails** interface is a core component in Spring Security, representing the user data that the framework relies on for authentication and authorization. It provides essential information to Spring Security, including:

* **Username** – A unique identifier for the user.
* **Password** – The user’s password, typically stored in a securely hashed format.
* **Enabled** – Indicates whether the user account is active; disabled accounts cannot be authenticated.
* **AccountNonExpired**, **CredentialsNonExpired**, **AccountNonLocked** – Boolean flags supporting advanced security policies, such as account expiration, credential validity, and account locking.
* **Authorities** – A collection of `GrantedAuthority` objects that define the user’s roles and permissions, essential for authorization checks.

By implementing `UserDetails`, you can seamlessly connect your application’s user model with Spring Security, enabling customized authentication and authorization logic.

### 🗂️ UserDetailsService

**UserDetailsService** is a core Spring Security interface responsible for fetching user-specific data during the authentication process.
It contains a single method:

```java
UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
```

This method locates a user by their username and returns a `UserDetails` object, which Spring Security then uses for authentication and authorization.

When you implement a custom `UserDetailsService`, you typically:

1. Query your user database (or another storage system) to find the user by username.
2. Map the retrieved user data into a `UserDetails` object.
3. Return the `UserDetails` object so Spring Security can perform authentication checks and determine authorities for authorization.

A custom `UserDetailsService` acts as the **bridge** between your application’s user repository and Spring Security’s authentication framework.

### 🎯 AuthenticationManager

In Spring Security, the **`AuthenticationManager`** serves as the central entry point for processing authentication requests.
Think of it as the **orchestrator** that delegates the verification of user credentials to one or more configured **`AuthenticationProvider`** instances.

**Key Responsibilities**
1. Handle login requests – Takes the user’s credentials and starts the authentication process.
2. Delegate verification – Passes the credentials to one or more AuthenticationProviders for actual checking.
3. Return the result – If successful, returns an Authentication object with user details and roles.

```java
@Bean
public AuthenticationManager authenticationManager(
    AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
}
``` 

**How it works**:

* `SecurityFilterChain` defines request authorization rules and enables form login.
* `AuthenticationManager` is obtained from `AuthenticationConfiguration`, which auto-registers configured providers.
* `configureGlobal()` binds the `UserDetailsService` and `PasswordEncoder` to the authentication process.

### 🔒 PasswordEncoder

The `PasswordEncoder` interface in Spring Security is used to encode raw passwords and verify encoded ones. It supports multiple hashing algorithms, ensuring that passwords are stored securely rather than in plain text.

Spring Security provides several `PasswordEncoder` implementations based on popular hashing algorithms:

* **`BCryptPasswordEncoder`** → bcrypt
* **`Pbkdf2PasswordEncoder`** → PBKDF2
* **`SCryptPasswordEncoder`** → scrypt
* **`Argon2PasswordEncoder`** → Argon2

#### 🧩 **BCryptPasswordEncoder**

* The **`BCryptPasswordEncoder`** is the most commonly used implementation for hashing passwords with the bcrypt algorithm.
* **Strength parameter** → Controls the computational complexity of the hashing process (default is `10` in Spring Security). Higher values increase security but also processing time.
* **SecureRandom salt generator** → Recommended for generating cryptographically strong random salts, making hashes more resistant to rainbow table and brute-force attacks.

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

This ensures that passwords are hashed securely before being stored and can be safely verified during authentication.

### 🚪 AuthenticationEntryPoint

* `AuthenticationEntryPoint` in Spring Security decides what to do when someone tries to access a secured resource **without being logged in**.

* Think of it as a **doorkeeper** 🚷 — if you’re not invited (authenticated), it either:
  * Redirects you to a login page, or
  * Sends an error response like **401 Unauthorized**.

* `AuthenticationEntryPoint` is important to
    * Protects private parts of your app (like user dashboards or API endpoints).
    * Gives a clear response telling the user they must log in first.

**How it works:**
When Spring Security detects an **unauthenticated request** to a protected resource, it calls the `AuthenticationEntryPoint` to handle it — either by redirecting, sending an error, or running custom logic.

```java
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("{\"message\": \"Please log in to access this resource.\"}");
    }
}
```

**Configuration:**

```java
@Configuration
public class SpringSecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .exceptionHandling()
            .authenticationEntryPoint(new RestAuthenticationEntryPoint())
            .and()
            .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
            .httpBasic();
        return http.build();
    }
}
```

### [🔝 Back to Top](#-index)

### [📖 Read More ➡️](https://nirmalakumarsahu.in/spring-boot.html)

---