# Spring Boot Validation

[📄 Articles](https://nirmalakumarsahu.in/spring-boot.html) | [👤 My Profile](https://nirmalakumarsahu.in)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Framework-blue?logo=spring)](https://spring.io/projects/spring-boot) [![Validation](https://img.shields.io/badge/Validation-Data%20Integrity-green?logo=check)](https://en.wikipedia.org/wiki/Data_validation)

[![Spring Framework](https://img.shields.io/badge/Spring%20Framework-Framework-blue?logo=spring)](https://spring.io/projects/spring-framework) [![Framework](https://img.shields.io/badge/Framework-Software%20Development-blue?logo=spring)](https://spring.io/projects/spring-framework)

---

## 📑 Index

- [✅ What is Validation in Spring Boot?](#-what-is-validation-in-spring-boot)
- [🏷️ Different Validation Annotations in Spring Boot](#️-different-validation-annotations-in-spring-boot)
  - [1. Null / Empty Checks](#1-null--empty-checks)
  - [2. String Length / Size](#2-string-length--size)
  - [3. Number Validations](#3-number-validations)
  - [4. Boolean Checks](#4-boolean-checks)
  - [5. Date & Time Constraints](#5-date--time-constraints)
  - [6. String Format Validators](#6-string-format-validators)
  - [7. Custom Validation ✨](#7-custom-validation-)
  - [📊 Quick Reference Table](#-quick-reference-table)
- [⚙️ How to Implement Validation in Spring Boot](#️-how-to-implement-validation-in-spring-boot)
  - [1️⃣ Using Bean Validation Annotations (Most Common)](#1️⃣-using-bean-validation-annotations-most-common)
  - [2️⃣ Custom Error Handling with @ControllerAdvice or @RestControllerAdvice](#2️⃣-custom-error-handling-with-controlleradvice-or-restcontrolleradvice)
  - [3️⃣ Method-Level Validation](#3️⃣-method-level-validation)
- [🎯 Custom Validation in Spring Boot](#-custom-validation-in-spring-boot)
  - [1️⃣ Create a Custom Validation Annotation](#1️⃣-create-a-custom-validation-annotation)
  - [2️⃣ Create the Custom Validator Class](#2️⃣-create-the-custom-validator-class)
  - [3️⃣ Apply Custom Validation in DTO/Entity](#3️⃣-apply-custom-validation-in-dtoentity)
  - [🏷️ Annotation Elements in Spring Validation](#️-annotation-elements-in-spring-validation)
- [✅ Validation Groups in Spring Boot](#-validation-groups-in-spring-boot)
  - [1️⃣ Create Marker Interfaces](#1️⃣-create-marker-interfaces)
  - [2️⃣ Entity with Group-based Validation](#2️⃣-entity-with-group-based-validation)
  - [3️⃣ Controller Using @Validated](#3️⃣-controller-using-validated)
- [🚀 Implementation](#-implementation)
    - [🏗️ Technology Stack](#-technology-stack)
    - [📂 Project Structure](#-project-structure)
    - [🔗 Code Repository](#-code-repository)
    - [🚀 To Run the Spring Boot Application](#-to-run-the-spring-boot-application)
- [🎥 Video Reference](#-video-reference)


---

## ✅ What is Validation in Spring Boot?

**Validation** is the process of ensuring that the data provided by a user (via an API, form, or request) is correct, complete, and within the required rules **before processing it further**.

✨ For example:

* 📝 A username must not be empty
* 📧 An email must follow a valid email format
* 🎂 Age must be greater than 18

Spring Boot provides **powerful validation support** using **Jakarta Bean Validation (JSR 380)** (formerly Hibernate Validator).

### [🔝 Back to Top](#-index)

---

## 🏷️ Different Validation Annotations in Spring Boot

Here are the most commonly used annotations you’ll encounter 👇

### 1. Null / Empty Checks

* 🚫 `@Null` → Must be `null`
* ✅ `@NotNull` → Must **not** be `null` (but can be empty, e.g., `""`)
* ✍️ `@NotEmpty` → Must **not** be `null` and must have at least 1 element/character (for strings, collections, arrays)
* 🧾 `@NotBlank` → Must **not** be `null` and must contain at least one non-whitespace character (better for strings)

📌 Example:

```java
public class UserRequest {
    @NotNull(message = "ID cannot be null")
    private Long id;

    @NotEmpty(message = "Username cannot be empty")
    private String username;

    @NotBlank(message = "Password cannot be blank")
    private String password;
}
```

### 2. String Length / Size

* 📏 `@Size(min, max)` → Defines min & max length, restrict length of string, collection, or array

📌 Example:

```java
@Size(min = 3, max = 20, message = "Username must be 3-20 chars")
private String username;
```

### 3. Number Validations

* 🔢 `@Min(value)` → Minimum allowed value (Must be greater than or equal to given number)
* 🔢 `@Max(value)` → Maximum allowed value (Must be less than or equal to given number)
* ➕ `@Positive` / `@PositiveOrZero` → Must be positive / ≥0
* ➖ `@Negative` / `@NegativeOrZero` → Must be negative / ≤0
* 💯 `@Digits(integer, fraction)` → Restrict number of digits in integer and fraction parts

📌 Example:

```java
@Min(value = 18, message = "Age must be at least 18")
@Max(value = 60, message = "Age must be at most 60")
private int age;

@Digits(integer = 6, fraction = 2, message = "Amount format is invalid")
private BigDecimal amount;
```

### 4. Boolean Checks

* ✅ `@AssertTrue` → Must be `true`
* ❌ `@AssertFalse` → Must be `false`

📌 Example:

```java
@AssertTrue(message = "Must accept terms & conditions")
private boolean accepted;
```

### 5. Date & Time Constraints

* ⏳ `@Past` → Must be a past date
* ⏱️ `@PastOrPresent` → Must be today or past
* 📅 `@Future` → Must be a future date
* 🕒 `@FutureOrPresent` → Must be today or future

📌 Example:

```java
@Past(message = "DOB must be in the past")
private LocalDate dob;

@Future(message = "Booking date must be in the future")
private LocalDate bookingDate;
```

### 6. String Format Validators

* 📧 `@Email` → Valid email format
* 🔤 `@Pattern(regexp = "...")` → Must match given regex pattern

📌 Example:

```java
@Email(message = "Invalid email")
private String email;

@Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
private String phone;
```

### 7. Custom Validation ✨

When built-in ones are not enough, you can define your own rules.

📌 Example:

```java
@StrongPassword
private String password;
```

(Here, `@StrongPassword` is a custom annotation validated via `ConstraintValidator`.)

### 📊 Quick Reference Table

| 🏷️ Annotation     | 📖 Meaning              |
| ------------------ | ----------------------- |
| 🚫 `@Null`         | Must be `null`          |
| ✅ `@NotNull`       | Must not be `null`      |
| 🧾 `@NotBlank`     | Must not be blank       |
| ✍️ `@NotEmpty`     | Not empty               |
| 📏 `@Size`         | Length/size restriction |
| 🔢 `@Min` / `@Max` | Number range            |
| ➕ `@Positive`      | Positive value          |
| ➖ `@Negative`      | Negative value          |
| 💯 `@Digits`       | Number format           |
| ✅ `@AssertTrue`    | Must be true            |
| ❌ `@AssertFalse`   | Must be false           |
| ⏳ `@Past`          | Past date               |
| 📅 `@Future`       | Future date             |
| 📧 `@Email`        | Valid email             |
| 🔤 `@Pattern`      | Regex check             |

👉 Best Practice (Industry Standard):

* Put validation annotations on **DTOs** (not entities).
* Handle errors centrally with `@ControllerAdvice`.
* Use **custom validators** only for complex business rules.

### [🔝 Back to Top](#-index)

---

## ⚙️ How to Implement Validation in Spring Boot

There are multiple ways you can implement validation. Let’s go step by step.

### 1️⃣ Using Bean Validation Annotations (Most Common)

You annotate your DTOs (Request classes) with validation constraints.

**Example:**

```java
import jakarta.validation.constraints.*;

public class UserRequest {

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @Email(message = "Invalid email format")
    private String email;

    @Min(value = 18, message = "Age must be at least 18")
    private int age;

    // Getters and Setters
}
```

**Controller**

```java
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    @PostMapping
    public ResponseEntity<String> createUser(@Valid @RequestBody UserRequest userRequest) {
        return ResponseEntity.ok("User Created Successfully!");
    }
}
```

👉 Here, `@Valid` ensures validation is applied. If validation fails, Spring throws `MethodArgumentNotValidException`.

### 2️⃣ Custom Error Handling with `@ControllerAdvice` or `@RestControllerAdvice`

To make responses user-friendly:

```java
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage())
        );
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
```

👉 Now invalid input returns structured JSON errors.

### 3️⃣ Method-Level Validation

Spring also supports validating **method parameters & return values** with `@Validated`.

```java
import jakarta.validation.constraints.Min;
import org.springframework.validation.annotation.Validated;
import org.springframework.stereotype.Service;

@Service
@Validated
public class PaymentService {

    public void processPayment(@Min(1) double amount) {
        System.out.println("Processing payment: " + amount);
    }
}
```

👉 If someone calls `processPayment(0)`, Spring throws a validation error.

### [🔝 Back to Top](#-index)

--- 

## 🎯 Custom Validation in Spring Boot

When built-in annotations like `@NotBlank` or `@Email` aren’t enough, you can create your **own validation annotation** + **custom validator class**.

### 1️⃣ Create a **Custom Validation Annotation**

📌 The annotation defines:

* 🎯 `@Target` → Where the annotation can be applied (field, method, parameter).
* ⏳ `@Retention` → How long it should be retained (we use `RUNTIME`).
* 🛠️ `@Constraint` → Points to the **validator class** that implements the validation logic.

```java
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Constraint(validatedBy = StrongPasswordValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface StrongPassword {
    String message() default "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
```

### 2️⃣ Create the **Custom Validator Class**

📌 This class must implement `ConstraintValidator<AnnotationType, FieldType>`.

* `initialize()` → runs before validation (optional).
* `isValid()` → actual validation logic.

```java
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class StrongPasswordValidator implements ConstraintValidator<StrongPassword, String> {

    @Override
    public void initialize(CustomValidation constraintAnnotation) {
        // (Optional) Initialize validator if needed
    }
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value != null && value.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).+$");
    }
}
```

### 3️⃣ Apply Custom Validation in DTO/Entity

📌 Just use the annotation like a built-in validator.

```java
public class RegisterRequest {
    @StrongPassword
    private String password;
}
```

#### ⚡ Real-World Use Cases for Custom Validators

✅ Password strength → `@StrongPassword`

✅ Confirm password match → `@PasswordMatches`

✅ Unique email (DB check) → `@UniqueEmail`

✅ PAN/Aadhar/SSN validation → `@ValidPAN`

✅ Mobile number format → `@ValidPhone`

### 🏷️ Annotation Elements in Spring Validation

When you create a **custom validation annotation**, you usually see these three properties:

```java
public @interface StrongPassword {
    String message() default "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
```

Let’s break them down one by one 👇

#### 1️⃣ `String message() default "...";`

✅ **What is it?**

* It’s the **default error message** returned if validation fails.
* Declared like a method, but acts as an **annotation attribute** (property).

✅ **Why do we need it?**

* So that users of your annotation can **override the error message** when they apply it.

✅ **How to use it?**

```java
@StrongPassword(message = "Password must follow company policy")
private String password;
```

Here, instead of the default, it will show **"Password must follow company policy"** when validation fails.

#### 2️⃣ `Class<?>[] groups() default {};`

✅ **What is it?**

* It allows you to perform **grouped (conditional) validations**.
* Think of it like **validation categories** you can choose when validating.

✅ **Why do we need it?**

* Sometimes you want **different validation rules in different scenarios**.
  Example:

    * While **creating** a user → all fields must be validated.
    * While **updating** a user → only some fields should be validated.

✅ **How to use it?**

```java
public interface CreateGroup {}
public interface UpdateGroup {}

public class UserRequest {
    @NotNull(groups = CreateGroup.class)
    private String name;

    @NotNull(groups = {CreateGroup.class, UpdateGroup.class})
    private String email;
}
```

Then, in your controller/service:

```java
@PostMapping("/create")
public ResponseEntity<?> create(@Validated(CreateGroup.class) @RequestBody UserRequest user) {
    ...
}
```

Here only validations in the **CreateGroup** will run.

#### 3️⃣ `Class<? extends Payload>[] payload() default {};`

✅ **What is it?**

* A less commonly used property that lets you **attach extra metadata** to a constraint.
* Usually for **advanced use cases** like severity levels, error codes, or integration with other frameworks.

✅ **Why do we need it?**

* Suppose you want to mark certain errors as **critical** or **warning** for logging or API responses.

✅ **How to use it?**
First, define your own `Payload`:

```java
public class Severity {
    public interface Info extends Payload {}
    public interface Critical extends Payload {}
}
```

Then apply:

```java
@StrongPassword(payload = {Severity.Critical.class})
private String password;
```

Now your validator (or custom error handler) can check the payload type and decide how to handle the error (e.g., log it differently or give different HTTP status).

#### ✅ Summary

| Attribute       | Purpose                                   | Typical Usage                            |
| --------------- | ----------------------------------------- | ---------------------------------------- |
| **`message()`** | Default error message                     | `@NotNull(message = "Name is required")` |
| **`groups()`**  | Conditional / grouped validations         | `@Validated(CreateGroup.class)`          |
| **`payload()`** | Extra metadata (severity, category, etc.) | Advanced / custom cases                  |

👉 So, you’ll almost **always use `message()`**, sometimes **`groups()`**, and **rarely `payload()`** unless you’re building a very advanced system.

### [🔝 Back to Top](#-index)

---

## ✅ Validation Groups in Spring Boot

Validation groups let you **apply different validation rules for different use cases** on the same entity/model.

For example:

* **Basic Info Validation** → only checks username.
* **Advanced Info Validation** → checks username + email.

### 1️⃣ Create Marker Interfaces

Marker interfaces represent validation groups.

```java
package com.sahu.springboot.validation.group;

public interface BasicInfo {}
public interface AdvancedInfo {}
```

### 2️⃣ Entity with Group-based Validation**

Apply different constraints for different groups.

```java
package com.sahu.springboot.validation.model;

import com.sahu.springboot.validation.group.BasicInfo;
import com.sahu.springboot.validation.group.AdvancedInfo;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {

    @NotNull(message = "Username is required", groups = {BasicInfo.class, AdvancedInfo.class})
    private String username;

    @NotNull(message = "Email is required for advanced info", groups = AdvancedInfo.class)
    private String email;

}
```

### 3️⃣ Controller Using @Validated**

We can validate the same `User` object differently depending on the endpoint.

```java
package com.sahu.springboot.validation.controller;

import com.sahu.springboot.validation.group.BasicInfo;
import com.sahu.springboot.validation.group.AdvancedInfo;
import com.sahu.springboot.validation.model.User;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @PostMapping("/registerBasic")
    public String registerBasicInfo(@Validated(BasicInfo.class) @RequestBody User user,
                                    BindingResult result) {
        if (result.hasErrors()) {
            return "❌ Basic Info Validation Failed: " + result.getAllErrors();
        }
        return "✅ Basic Info Registered Successfully!";
    }

    @PostMapping("/registerAdvanced")
    public String registerAdvancedInfo(@Validated(AdvancedInfo.class) @RequestBody User user,
                                       BindingResult result) {
        if (result.hasErrors()) {
            return "❌ Advanced Info Validation Failed: " + result.getAllErrors();
        }
        return "✅ Advanced Info Registered Successfully!";
    }
}
```

**🔑 Key Points**

1. **Marker Interfaces** → represent validation groups.
2. **@Validated(Group.class)** → tells Spring which group to validate.
3. Same entity (`User`) can have **different rules per use case**.

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

**🛠️ Build & Dependency Management**

* 📦 **Maven 4.0.0** → Build automation & dependency management
* 🚀 **Spring Boot Maven Plugin** → For packaging and running the Spring Boot application
* 🛠️ **Maven Compiler Plugin** → Handles compilation, Lombok annotation processing

**⚙️ Utilities**

* ✨ **Lombok** → Reduces boilerplate code (`@Getter`, `@Setter`, `@Builder`, etc.)
* ⚡ **application.yml / application.properties** → Centralized configuration (DB, JPA, logging, Swagger, etc.)

### 📂 Project Structure

```plaintext
spring-boot-validation
│── 📂 src/
│   └── 📂 main/
│       ├── 📂 java/
│       │   └── 📂 com/sahu/springboot/basics/
│       │       ├── 📂 config/
│       │       │   ├── 📄 OpenApiConfig.java
│       │       │   └── 📄 OpenApiProperties.java
│       │       │
│       │       ├── 📂 constant/
│       │       │   └── 📄 AppConstants.java
│       │       │
│       │       ├── 📂 controller/rest/
│       │       │   └── 📂 rest/
│       │       │       ├── 📄 ProductRestController.java
│       │       │       └── 📄 UserRestController.java
│       │       │
│       │       ├── 📂 dto/
│       │       │   ├── 📄 ApiResponse.java
│       │       │   ├── 📄 ProductRequest.java
│       │       │   ├── 📄 ProductResponse.java
│       │       │   ├── 📄 UserRequest.java
│       │       │   └── 📄 UserResponse.java
│       │       │
│       │       ├── 📂 exception/
│       │       │   ├── 📄 GlobalExceptionHandler.java
│       │       │   ├── 📄 ProductAlreadyExistException.java
│       │       │   └── 📄 ProductNotFoundException.java
│       │       │
│       │       ├── 📂 model/
│       │       │   ├── 📄 Product.java
│       │       │   └── 📄 User.java
│       │       │
│       │       ├── 📂 repository/
│       │       │   ├── 📄 ProductRepository.java
│       │       │   └── 📄 UserRepository.java
│       │       │
│       │       ├── 📂 service/
│       │       │   ├── 📂 impl/
│       │       │   │   ├── 📄 ProductServiceImpl.java
│       │       │   │   └── 📄 UserServiceImpl.java
│       │       │   │
│       │       │   ├── 📂 util/
│       │       │   │   ├── 📄 ProductUtil.java
│       │       │   │   └── 📄 UserUtil.java
│       │       │   │
│       │       │   ├── 📄 ProductService.java
│       │       │   └── 📄 UserService.java
│       │       │
│       │       ├── 📂 validation/
│       │       │   ├── 📂 group/
│       │       │   │   ├── 📄 CreateGroup.java
│       │       │   │   └── 📄 UpdateGroup.java
│       │       │   │
│       │       │   ├── 📄 StrongPassword.java
│       │       │   └── 📄 StrongPasswordValidator.java
│       │       │
│       │       └── 📄 SpringBootValidationApplication.java
│       │
│       └── 📂 resources/
│           └── 📄 application.yml
│
│── 📄 docker-compose.yml
└── 📄 pom.xml
```

### 🔗 Code Repository

You can find the complete code repository for this project on GitHub:

[![GitHub - spring-boot-validation](https://img.shields.io/badge/GitHub-View%20Code-black?logo=github)](https://github.com/nirmalakumarsahu/spring-boot-validation.git)

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
   `SpringBootValidationApplication.java`
3. Select **Run 'SpringBootValidationApplication'**.
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
  java -jar target/spring-boot-validation-0.0.1-SNAPSHOT.jar
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