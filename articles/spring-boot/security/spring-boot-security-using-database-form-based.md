# Spring Boot Security using Database Form Based

[📄 Articles](https://nirmalakumarsahu.in/spring-boot.html) | [👤 My Profile](https://nirmalakumarsahu.in)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Framework-blue?logo=spring)](https://spring.io/projects/spring-boot) [![Security](https://img.shields.io/badge/Security-Authentication%20and%20Authorization-blue?logo=security)](https://spring.io/projects/spring-security)

[![Spring Framework](https://img.shields.io/badge/Spring%20Framework-Framework-blue?logo=spring)](https://spring.io/projects/spring-framework) [![Framework](https://img.shields.io/badge/Framework-Software%20Development-blue?logo=spring)](https://spring.io/projects/spring-framework)

---

## 📑 Index

- [📋 Prerequisites](#-prerequisites)
- [📝 Spring Boot Security Internal Flow](#-spring-boot-security-internal-flow)


---

## 📋 Prerequisites

🔹 Understand **Spring Security** basic concepts 👉 [Read here](https://nirmalakumarsahu.in/spring-boot/security/spring-boot-security.html)

### [🔝 Back to Top](#-index)

---

## 📝 Spring Boot Security Internal Flow

💡 Let's understand **how Spring Boot Security works with a database** for **form-based authentication**.

![spring-security-internal.png](images/spring-security-internal.png)

**1. Request with Credentials**

* The client sends a request with a **username** and **password** (e.g., via login form, API call).
* This request enters the **Servlet Filter Chain**.

**2. DelegatingFilterProxy & FilterChainProxy**

* Spring Security uses `DelegatingFilterProxy` to intercept requests.
* It passes the request to the **SecurityFilterChain**, which contains security-related filters (authentication, authorization, CSRF, CORS, etc.).

**3. Filter Converts Credentials**

* The **UsernamePasswordAuthenticationFilter** extracts the username and password from the request.
* It creates an **Authentication request object** (with credentials but not yet authenticated).

**4. AuthenticationManager**

* The request is passed to the **AuthenticationManager**.

**5. ProviderManager**

* `AuthenticationManager` delegates to **ProviderManager**.
* `ProviderManager` chooses the correct **AuthenticationProvider** (e.g., `DaoAuthenticationProvider` for username/password authentication).

**6. Fetch User Details**

* The provider calls the **UserDetailsService** to fetch user information.

* **7. Load User by Username**

* The `CustomUserDetailsService` implements `loadUserByUsername()` to retrieve the user.
* This may involve fetching user data from a database.

**8. Database Call**

* A query is made to load the user’s record from the database.

**9. UserDetails Object**

* The database results are mapped to a **UserDetails** object, which contains:

    * Username
    * Password (hashed)
    * Authorities (roles/permissions)
    * Account status flags (expired, locked, enabled, etc.).

**10. Return Authenticated Object**

* The provider compares the password from the request with the stored hash using **PasswordEncoder** (`BCryptPasswordEncoder` here).
* If successful, a new **Authentication object** is created, now **filled with authenticated user details**.

**11. Authentication Response**

* The authenticated object is returned back up the chain to the **AuthenticationManager**.

**12. Filter Receives Authentication Response**

* The `UsernamePasswordAuthenticationFilter` gets the authenticated object from the manager.

**13. Set Authenticated User into Context**

* The authenticated object (with user details) is stored inside the **SecurityContext** using `SecurityContextHolder`.

**14. Continue Filter Chain**

* The request proceeds through the remaining filters.

**15. Success Response**

* The server returns a successful response to the client.
* Now, in any part of the application, you can retrieve the authenticated user from:

```java
Authentication auth = SecurityContextHolder.getContext().getAuthentication();
Object principal = auth.getPrincipal();
```

### [🔝 Back to Top](#-index)

---






### [🔝 Back to Top](#-index)

### [📖 Read More ➡️](https://nirmalakumarsahu.in/spring-boot.html)

---