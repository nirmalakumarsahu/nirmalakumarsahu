# Spring Boot Security using Database In Rest API

[📄 Articles](https://nirmalakumarsahu.in/spring-boot.html) | [👤 My Profile](https://nirmalakumarsahu.in)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Framework-blue?logo=spring)](https://spring.io/projects/spring-boot) [![Security](https://img.shields.io/badge/Security-Authentication%20and%20Authorization-blue?logo=security)](https://spring.io/projects/spring-security)

[![Spring Framework](https://img.shields.io/badge/Spring%20Framework-Framework-blue?logo=spring)](https://spring.io/projects/spring-framework) [![Framework](https://img.shields.io/badge/Framework-Software%20Development-blue?logo=spring)](https://spring.io/projects/spring-framework)

---

## 📑 Index

- [📋 Prerequisites](#-prerequisites)
- [🔐 What is Spring Boot Security using Database in REST API?](#-what-is-spring-boot-security-using-database-in-rest-api)
- [🚀 Implementation](#-implementation)
  - [🏗️ Technology Stack](#-technology-stack)
  - [📂 Project Structure](#-project-structure)
  - [🔗 Code Repository](#-code-repository)
  - [🚀 To Run the Spring Boot Application](#-to-run-the-spring-boot-application)
- [🎥 Video Reference](#-video-reference)

---

## 📋 Prerequisites

🔹 Understand **Spring Security** basic concepts 👉 [Read here](https://nirmalakumarsahu.in/spring-boot/security/spring-boot-security.html)

### [🔝 Back to Top](#-index)

---

## Spring Boot Security using Database in REST API

Good question 👍 Let me break it down for you in **simple terms with context**.

---

## 🔐 What is Spring Boot Security using Database in REST API?

It means you are securing your **Spring Boot REST API** by storing and validating user credentials (username, password, roles, permissions, etc.) in a **database** (like MySQL, PostgreSQL, etc.) instead of keeping them hardcoded or in memory.

So when a user tries to log in, Spring Security will:

1. Take the **username & password** from the login request (e.g., `/login` or `/authenticate`).
2. Look up the **user details from the database** (via `UserDetailsService` and JPA/Hibernate).
3. Verify the **password** (usually encrypted with **BCrypt**).
4. Assign the correct **roles/authorities** from the DB.
5. Generate a session (stateful) or token (stateless, e.g., JWT).
6. Authorize or reject the API request.

---

## 🚀 Implementation

### 🏗️ Technology Stack

**🖥️ Backend**

* ☕ **Java 21** → Core programming language
* 🌱 **Spring Boot 3.5.4** → Main application framework
* 🗄️ **Spring Data JPA** → ORM for database persistence
* 🔐 **Spring Security** → Authentication & Authorization (role-based access)
* 🌐 **Spring Web (Spring MVC)** → RESTful APIs

**📖 API Documentation**

* 📘 **Springdoc OpenAPI 2.8.9** → Generates OpenAPI/Swagger docs for REST APIs
* 🖥️ **Swagger UI** → Interactive API testing & documentation

**🛢️ Database**

* 🐬 **MySQL** → Relational database
* 🔗 **MySQL Connector/J** → JDBC driver for MySQL

**🏗️ Build & Dependency Management**

* 📦 **Maven 4.0.0** → Build automation & dependency management
* 🚀 **Spring Boot Maven Plugin** → Runs & packages the application
* 🛠️ **Maven Compiler Plugin** → Annotation processing (e.g., for Lombok)

**⚙️ Utilities**

* ✨ **Lombok** → Reduces boilerplate code (`@Getter`, `@Setter`, `@Builder`, etc.)
* 📜 **application.yml** → Centralized configuration for DB, JPA, Security, etc.

### 📂 Project Structure

```plaintext
spring-boot-security-using-database-in-rest-api
│── 📂 src/
│   └── 📂 main/
│       ├── 📂 java/
│       │   └── 📂 com/sahu/springboot/security/
│       │       ├── 📂 config/
│       │       │   ├── CustomAuthenticationEntryPoint.java
│       │       │   └── SecurityConfiguration.java
│       │       │
│       │       ├── 📂 constant/
│       │       │   └── AuthConstants.java
│       │       │
│       │       ├── 📂 controller/rest/
│       │       │   ├── AuthRestController.java
│       │       │   └── DashboardRestController.java
│       │       │
│       │       ├── 📂 dto/
│       │       │   ├── ApiResponse.java
│       │       │   ├── LoginRequest.java
│       │       │   ├── LoginResponse.java
│       │       │   ├── UserRequest.java
│       │       │   └── UserResponse.java
│       │       │
│       │       ├── 📂 model/
│       │       │   ├── Role.java
│       │       │   └── User.java
│       │       │
│       │       ├── 📂 repository/
│       │       │   ├── RoleRepository.java
│       │       │   └── UserRepository.java
│       │       │
│       │       ├── 📂 security/
│       │       │   ├── 📂 dto/
│       │       │   │   └── CustomUserDetails.java
│       │       │   └── 📂 util/
│       │       │       └── SecurityUtil.java
│       │       │
│       │       ├── 📂 service/
│       │       │   ├── 📂 impl/
│       │       │   │   ├── CustomUserDetailsService.java
│       │       │   │   └── UserServiceImpl.java
│       │       │   └── UserService.java
│       │       │
│       │       └── SpringBootSecurityUsingDatabaseInRestApiApplication.java
│       │
│       └── 📂 resources/
│           └── application.yml
│
├── 📄 docker-compose.yml
└── 📄 pom.xml
```

### 🔗 Code Repository

You can find the complete code repository for this project on GitHub:

[![GitHub - solid-principles-java](https://img.shields.io/badge/GitHub-View%20Code-black?logo=github)](https://github.com/nirmalakumarsahu/spring-boot-security-using-database-in-rest-api.git)

### 🚀 To Run the Spring Boot Application

**1️⃣ 🐳 Using Docker Compose (for MySQL container)**

```bash
docker-compose up -d
```

✅ This starts MySQL in a container (`-d` = detached mode).
🔍 Verify with:

```bash
docker ps
```

📌 DB is now available at **`localhost:3307`**.
🔑 Credentials (username, password, DB name) are in `docker-compose.yml`.

**2️⃣ 💻 Run Directly in IntelliJ IDEA**

1. 📂 Open the Spring Boot project in IntelliJ.
2. ▶️ In **Project Explorer**, right-click the main class:
   `SpringBootSecurityUsingDatabaseInRestApiApplication.java`
3. Select **Run 'SpringBootSecurityUsingDatabaseInRestApiApplication'**.
4. 🐞 For debugging, click the **Debug button** instead of Run.
5. 🌐 App will start on **[http://localhost:9897](http://localhost:9897)**.

**3️⃣ ⚡ Run with Maven Command (CLI)**

* ▶️ Run app:

  ```bash
  mvn spring-boot:run
  ```

* 🐞 Run app with debug mode:

  ```bash
  mvn spring-boot:run -Dspring-boot.run.fork=false -Dmaven.surefire.debug
  ```

* 📦 Build JAR and run:

  ```bash
  mvn clean package -DskipTests
  java -jar target/spring-boot-security-using-database-in-rest-api-0.0.1-SNAPSHOT.jar
  ```

### [🔝 Back to Top](#-index)

---

## 🎥 Video Reference

For a detailed running and demonstration of the application walkthrough,  
watch the following YouTube video:

[![Watch the video](https://img.youtube.com/vi/p1Wm5dbLuHs/0.jpg)](https://www.youtube.com/watch?v=p1Wm5dbLuHs)

### [🔝 Back to Top](#-index)

### [📖 Read More ➡️](https://nirmalakumarsahu.in/spring-boot.html)

---