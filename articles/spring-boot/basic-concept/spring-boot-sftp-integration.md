# Spring Boot with SFTP Integration

[📄 Articles](https://nirmalakumarsahu.in/spring-boot.html) | [👤 My Profile](https://nirmalakumarsahu.in)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Framework-blue?logo=spring)](https://spring.io/projects/spring-boot) [![SFTP](https://img.shields.io/badge/SFTP-File%20Transfer-blue?logo=filezilla)](https://filezilla-project.org/)

[![Spring Framework](https://img.shields.io/badge/Spring%20Framework-Framework-blue?logo=spring)](https://spring.io/projects/spring-framework) [![Framework](https://img.shields.io/badge/Framework-Software%20Development-blue?logo=spring)](https://spring.io/projects/spring-framework)

---

## 📑 Index
- [🔑 What is SFTP](#-what-is-sftp)
  - [🔑 Key Features of SFTP](#-key-features-of-sftp)
  - [🔄 SFTP vs FTP vs FTPS](#-sftp-vs-ftp-vs-ftps)
  - [🛠️ Example Use Cases](#-example-use-cases)
  - [⚙️ How SFTP Works](#-how-sftp-works) 
- [🛠️ Why Use SFTP in Spring Boot?](#-why-use-sftp-in-spring-boot)
  - [🔑 Key Benefits of Using SFTP in Spring Boot](#-key-benefits-of-using-sftp-in-spring-boot)
- [🚀 Implementation](#-implementation)
    - [🏗️ Technology Stack](#-technology-stack)
    - [📂 Project Structure](#-project-structure)
    - [🔗 Code Repository](#-code-repository)
    - [🚀 To Run the Spring Boot Application](#-to-run-the-spring-boot-application)
- [🎥 Video Reference](#-video-reference)

---

## 🔑 What is SFTP

SFTP stands for **Secure File Transfer Protocol** (also known as **SSH File Transfer Protocol**).

✨ It is a **network protocol** used to **transfer files securely** over a protected channel.

🔓 Unlike **FTP (File Transfer Protocol)**, which sends data (including usernames and passwords) in **plain text**,

🔐 **SFTP encrypts both commands and data** using **SSH (Secure Shell)**, making it much more secure.

📂➡️🔒 File moves safely from one system to another with full encryption.

### 🔑 Key Features of SFTP

* ✅ **Secure**: Uses SSH encryption (typically port **22**) to protect data in transit.
* ✅ **Authentication**: Supports password-based login or key-based authentication (using PEM/PPK files).
* ✅ **Reliability**: Ensures files are transferred completely (with integrity checks).
* ✅ **Firewall-friendly**: Uses a **single port (22)**, unlike FTP which requires multiple ports.
* ✅ **Cross-platform**: Works on Linux, Windows, macOS, and many enterprise systems.

### 🔄 SFTP vs FTP vs FTPS

| Feature      | FTP (File Transfer Protocol) | FTPS (FTP Secure)           | SFTP (SSH File Transfer Protocol) |
| ------------ | ---------------------------- | --------------------------- | --------------------------------- |
| **Security** | No encryption (plain text)   | SSL/TLS encryption          | SSH encryption (very secure)      |
| **Port**     | 21 (plus random data ports)  | 21 (plus TLS/SSL)           | 22 (single port)                  |
| **Auth**     | Username + Password          | Username + Password + Certs | Username + Password / SSH keys    |
| **Protocol** | FTP only                     | FTP + TLS                   | Built on SSH                      |

### 🛠️ Example Use Cases <a id="-example-use-cases"></a>

* Uploading reports from an application to a bank’s secure server.
* Automating data exchange between organizations (insurance, healthcare, finance).
* Securely backing up files to a remote server.

### ⚙️ How SFTP Works <a id="-how-sftp-works"></a>

1. **Connection Initialization**

    * The client (you) tries to connect to the SFTP server on **port 22** (default for SSH/SFTP).
    * Example:

      ```bash
      sftp user@server.com
      ```

2. **Authentication**

    * The server authenticates the client using either:

        * **Password authentication** (username + password), or
        * **Public/Private key authentication** (using `.pem` or `.ppk` files).
    * Keys are more secure because the private key never leaves your machine.

3. **Secure Channel Setup**

    * Once authenticated, an **SSH encrypted tunnel** is established between client and server.
    * This ensures **all commands and file data** are encrypted.

4. **File Operations**

    * Over the secure tunnel, the client can issue commands like:

        * `ls` → list files
        * `cd` → change directory
        * `get file.txt` → download file
        * `put report.csv` → upload file
    * Unlike FTP, these commands **and the file contents** are encrypted.

5. **Integrity & Acknowledgement**

    * SFTP ensures that files are **transferred completely**.
    * If a transfer is interrupted, it can resume from where it left off.

6. **Disconnection**

    * After the work is done, the client closes the session.
    * Example:

      ```bash
      bye
      ```
**🖥️ Example in Action (Linux/Windows Command Line)**

```bash
# Connect to SFTP server
sftp -i ~/.ssh/id_rsa user@host.com

# Inside SFTP prompt
sftp> ls
sftp> cd /remote/path
sftp> put localfile.txt
sftp> get remotefile.csv
sftp> bye
```

🔐 **In short:** SFTP works by combining **SSH security + file transfer commands** in one protocol, so every action and data packet is encrypted and safe.

### [🔝 Back to Top](#-index)

---

## 🛠️ Why Use SFTP in Spring Boot? <a id="-why-use-sftp-in-spring-boot"></a>

In enterprise systems, you often need to:

* Upload **reports, invoices, or batch files** to another system securely.
* Download files from **banks, insurance companies, or partners**.
* Automate **secure data exchange** between services.

Spring Boot applications integrate with SFTP servers to handle these scenarios.

**📦 Library for SFTP in Spring Boot**

We use **JSch (Java Secure Channel)** library:

* A lightweight Java implementation of SSH2.
* Supports authentication, file transfers, and command execution.
* Widely used in Spring Boot applications.

[![Maven Central](https://img.shields.io/badge/Maven%20Central-View%20Dependency-blue?logo=apachemaven)](https://mvnrepository.com/artifact/com.github.mwiede/jsch)

```xml
<dependency>
    <groupId>com.github.mwiede</groupId>
    <artifactId>jsch</artifactId>
    <version>0.2.17</version>
</dependency>
```
### 🔑 Key Benefits of Using SFTP in Spring Boot
* 🔒 **Security**: Encrypts data in transit, protecting sensitive information.
* 🔄 **Reliability**: Ensures complete file transfers with integrity checks.
* ⚙️ **Automation**: Easily automate file uploads/downloads in your application workflows.
* 🌐 **Integration**: Seamlessly connect with external systems that require secure file transfers.
* 🛠️ **Flexibility**: Supports various authentication methods (password, key-based) to fit your security policies.

### [🔝 Back to Top](#-index)

---

## 🚀 Implementation

### 🏗️ Technology Stack <a id="-technology-stack"></a>

**🖥️ Backend**

* ☕ **Java 21** → Core programming language
* 🌱 **Spring Boot 3.5.5** → Main application framework
* 🗄️ **Spring Data JPA** → ORM layer for database access
* 🌐 **Spring Web (Spring MVC)** → REST APIs & controller layer
* ✅ **Spring Boot Starter Validation** → Built-in support for JSR-380 (Jakarta Bean Validation)

**📊 API Documentation**

* 📘 **Springdoc OpenAPI 2.8.9** → Generates OpenAPI 3 documentation automatically
* 🎨 **Swagger UI** → Interactive API documentation & testing interface

**🛢️ Database**

* 🐬 **MySQL** → Primary relational database
* 🔗 **MySQL Connector/J** → JDBC driver for connecting to MySQL

**📂 File Transfer (SFTP)**

* 🔒 **JSch 2.27.2** → Java SSH2 library for secure SFTP integration (upload/download files)

**🛠️ Build & Dependency Management**

* 📦 **Maven 4.0.0** → Build automation & dependency management
* 🚀 **Spring Boot Maven Plugin** → For packaging and running the Spring Boot application
* 🛠️ **Maven Compiler Plugin** → Handles compilation, Lombok annotation processing

**⚙️ Utilities**

* ✨ **Lombok** → Reduces boilerplate code (`@Getter`, `@Setter`, `@Builder`, etc.)
* ⚡ **application.yml / application.properties** → Centralized configuration (DB, JPA, logging, Swagger, etc.)


### 📂 Project Structure

```plaintext
spring-boot-sftp-integration
│── 📂 src/
│   └── 📂 main/
│       ├── 📂 java/
│       │   └── 📂 com/sahu/springboot/basics/
│       │       ├── 📂 config/
│       │       │   ├── 📄 OpenApiConfig.java
│       │       │   └── 📄 OpenApiProperties.java
│       │       │
│       │       ├── 📂 constant/
│       │       │   ├── 📄 ApiStatus.java
│       │       │   ├── 📄 AppConstants.java
│       │       │   ├── 📄 AuthenticationType.java
│       │       │   └── 📄 KeyFormat.java
│       │       │
│       │       ├── 📂 controller/rest/
│       │       │   ├── 📄 FileReaderRestController.java
│       │       │   └── 📄 SftpConfigRestController.java
│       │       │
│       │       ├── 📂 dto/
│       │       │   ├── 📄 ApiResponse.java
│       │       │   ├── 📄 SftpConfigRequest.java
│       │       │   └── 📄 SftpConfigResponse.java
│       │       │
│       │       ├── 📂 exception/
│       │       │   ├── 📄 GlobalExceptionHandler.java
│       │       │   ├── 📄 InvalidSftpKeyFileException.java
│       │       │   ├── 📄 SftpConfigAlreadyExistException.java
│       │       │   └── 📄 SftpConfigNotFoundException.java
│       │       │
│       │       ├── 📂 model/
│       │       │   └── 📄 SftpConfig.java
│       │       │
│       │       ├── 📂 operation/
│       │       │   └── 📄 SftpConnectionHandler.java
│       │       │
│       │       ├── 📂 repository/
│       │       │   └── 📄 SftpConfigRepository.java
│       │       │
│       │       ├── 📂 service/
│       │       │   ├── 📂 impl/
│       │       │   │   ├── 📄 FileReaderServiceImpl.java
│       │       │   │   └── 📄 SftpConfigServiceImpl.java
│       │       │   │
│       │       │   ├── 📂 util/
│       │       │   │   └── 📄 SftpConfigUtil.java
│       │       │   │
│       │       │   ├── 📄 FileReaderService.java
│       │       │   └── 📄 SftpConfigService.java
│       │       │
│       │       ├── 📂 util/
│       │       │   ├── 📄 AseCryptUtil.java
│       │       │   └── 📄 SftpKeyConvertorUtil.java
│       │       │
│       │       ├── 📂 validation/
│       │       │   ├── 📄 SftpConfigAuthValidator.java
│       │       │   └── 📄 ValidSftpConfigAuth.java
│       │       │
│       │       └── 📄 SpringBootSftpIntegrationApplication.java
│       │
│       └── 📂 resources/
│           └── 📄 application.yml
│
│── 📄 docker-compose.yml
└── 📄 pom.xml
```

### 🔗 Code Repository

You can find the complete code repository for this project on GitHub:

[![GitHub - spring-boot-sftp-integration](https://img.shields.io/badge/GitHub-View%20Code-black?logo=github)](https://github.com/nirmalakumarsahu/spring-boot-sftp-integration.git)

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
   `SpringBootSftpIntegrationApplication.java`
3. Select **Run 'SpringBootSftpIntegrationApplication'**.
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
  java -jar target/spring-boot-sftp-integration-0.0.1-SNAPSHOT.jar
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