# SOLID Principles

[Articles](https://nirmalakumarsahu.in/articles.html) | [My Profile](https://nirmalakumarsahu.in)

[![SOLID Principles](https://img.shields.io/badge/SOLID%20Principles-Software%20Design-blue?logo=solid)](https://en.wikipedia.org/wiki/SOLID)

[![Java](https://img.shields.io/badge/Java-Programming%20Language-red?logo=openjdk)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
[![Design Patterns](https://img.shields.io/badge/Design%20Patterns-Software%20Engineering-blue?logo=designpatterns)](https://en.wikipedia.org/wiki/Software_design_pattern)

---

## Index
- [✅ Introduction](#introduction)
  - [🔤 SOLID Acronym Breakdown](#solid-acronym-breakdown)
- [Single Responsibility Principle (SRP)](#single-responsibility-principle-srp)
  - [🧠 Understanding SRP with a Practical Example](#understanding-srp-with-a-practical-example)
  - [❌ Problem with This Design](#problem-with-this-design)
  - [✅ Refactored Design using SRP](#refactored-design-using-srp)
  - [✅ Benefits of Applying SRP](#benefits-of-applying-srp)
 
- [🔗 Code Repository](#code-repository)

---

## ✅ Introduction

In Java, **SOLID principles** represent a set of object-oriented design guidelines that help developers create robust, maintainable, and scalable software systems. These principles were conceptualized by **Robert C. Martin**, popularly known as **Uncle Bob**. They have significantly influenced modern software engineering practices by promoting clean code architecture and modular system design.

Applying SOLID principles ensures that your code is:

* **Modular** and easy to test
* **Understandable** for teams and future maintainers
* **Flexible** for enhancements and extensions
* **Stable** with fewer bugs during changes or feature additions

In this guide, we will **deep dive into each SOLID principle**, with clear Java examples to illustrate their real-world application.

### 🔤 SOLID Acronym Breakdown

| Letter | Principle Name                      | Description                                                         |
| ------ | ----------------------------------- | ------------------------------------------------------------------- |
| **S**  | **Single Responsibility Principle** | A class should have one and only one reason to change.              |
| **O**  | **Open/Closed Principle**           | Open for extension, but closed for modification.                    |
| **L**  | **Liskov Substitution Principle**   | Subclasses should be replaceable for their base classes.            |
| **I**  | **Interface Segregation Principle** | Prefer many specific interfaces over one general-purpose interface. |
| **D**  | **Dependency Inversion Principle**  | Depend on abstractions, not concrete implementations.               |

### [🔝 Back to Top](#index)

---

Here's a **professionally structured and polished version** of your explanation of the **Single Responsibility Principle (SRP)**, with improved grammar, formatting, and clarity — while keeping your intent, structure, and examples intact.

---

## Single Responsibility Principle (SRP)

The **Single Responsibility Principle** states that:

> “A class should have only one reason to change,”
> which means every class should have a **single responsibility**, **single job**, or **single purpose**.


### 🧠 Understanding SRP with a Practical Example

Let’s consider a class called `BankService` that performs multiple operations:

* Deposit
* Withdraw
* Print Passbook
* Get Loan Info
* Send OTP

```java
public class BankService {

    public Long deposit(Long accountId, BigDecimal amount) {
        // deposit logic
        return null;
    }

    public Long withdraw(Long accountId, BigDecimal amount) {
        // withdraw logic
        return null;
    }

    public void printPassbook(Long accountId) {
        // print passbook logic
    }

    public void getLoanInterestDetails(LoanType loanType) {
        // get loan interest details logic
        switch (loanType) {
            case HOME_LOAN:
                System.out.println("Home Loan Interest Rate: 7.5%");
                break;
            case PERSONAL_LOAN:
                System.out.println("Personal Loan Interest Rate: 10.0%");
                break;
            case CAR_LOAN:
                System.out.println("Car Loan Interest Rate: 8.5%");
                break;
            default:
                System.out.println("Unknown loan type.");
        }
    }

    public void sendOTP(OTPMediumType otpMediumType) {
        // send OTP logic
        switch (otpMediumType) {
            case EMAIL:
                System.out.println("Sending OTP via Email.");
                break;
            default:
                System.out.println("Unknown OTP medium type.");
        }
    }

}
```

### ❌ Problem with This Design

This class has **multiple responsibilities**, meaning **multiple reasons to change**, such as:

* If we add a new loan type (e.g., Gold Loan, Education Loan), we must change `getLoanInterestDetails()`.
* If we support a new OTP medium (e.g., SMS, WhatsApp), we must modify `sendOTP()`.
* Printing logic might change based on new passbook formats.

This design violates **SRP** because **one class is handling multiple responsibilities** — transaction logic, loan logic, notification logic, and printing.

### ✅ Refactored Design using SRP

Let’s refactor the `BankService` class by extracting individual responsibilities into their own classes.

#### 📄 `PrintService` — Handles printing tasks only

```java
public class PrintService {
    public void printPassbook(Long accountId) {
        // print passbook logic
    }
}
```

#### 💰 `LoanService` — Handles loan-related logic

```java
public class LoanService {
    public void getLoanInterestDetails(LoanType loanType) {
        // get loan interest details logic
        switch (loanType) {
            case HOME_LOAN:
                System.out.println("Home Loan Interest Rate: 7.5%");
                break;
            case PERSONAL_LOAN:
                System.out.println("Personal Loan Interest Rate: 10.0%");
                break;
            case CAR_LOAN:
                System.out.println("Car Loan Interest Rate: 8.5%");
                break;
            default:
                System.out.println("Unknown loan type.");
        }
    }
}
```

#### 📩 `NotificationService` — Handles notification/OTP logic

```java
public class NotificationService {
    public void sendOTP(OTPMediumType otpMediumType) {
        // send OTP logic
        switch (otpMediumType) {
            case EMAIL:
                System.out.println("Sending OTP via Email.");
                break;
            default:
                System.out.println("Unknown OTP medium type.");
        }
    }
}
```

#### 🏦 `BankService` — Core bank transactions only

```java
public class BankService {
    public Long deposit(Long accountId, BigDecimal amount) {
        // deposit logic
        return null;
    }

    public Long withdraw(Long accountId, BigDecimal amount) {
        // withdraw logic
        return null;
    }
}
```

### ✅ Benefits of Applying SRP

| Benefit                 | Description                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| 🔄 Easier Maintenance   | Each class changes only when its specific functionality changes.             |
| 🧪 Better Testability   | Each responsibility can be unit tested independently.                        |
| 💡 Improved Readability | Responsibilities are clearly defined and separated.                          |
| 🔧 Easier Refactoring   | You can change implementation without affecting unrelated parts.             |
| ♻️ Reusability          | Smaller, focused classes are more reusable across other modules or services. |

### [🔝 Back to Top](#index)

---



---

## 🔗 Code Repository

You can find the complete Java code examples demonstrating the SOLID principles here:

[![GitHub - solid-principles-java](https://img.shields.io/badge/GitHub-View%20Code-black?logo=github)](https://github.com/your-username/solid-principles-java)

### [🔝 Back to Top](#index)

### [Read More ➡️](https://nirmalakumarsahu.in/articles.html)

---