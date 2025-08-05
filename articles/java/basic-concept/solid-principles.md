# SOLID Principles

[Articles](https://nirmalakumarsahu.in/articles.html) | [My Profile](https://nirmalakumarsahu.in)

[![SOLID Principles](https://img.shields.io/badge/SOLID%20Principles-Software%20Design-blue?logo=solid)](https://en.wikipedia.org/wiki/SOLID)

[![Java](https://img.shields.io/badge/Java-Programming%20Language-red?logo=openjdk)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
[![Design Patterns](https://img.shields.io/badge/Design%20Patterns-Software%20Engineering-blue?logo=designpatterns)](https://en.wikipedia.org/wiki/Software_design_pattern)

---

## Index
- [✅ Introduction](#-introduction)
  - [🔤 SOLID Acronym Breakdown](#-solid-acronym-breakdown)
- [Single Responsibility Principle (SRP)](#single-responsibility-principle-srp)
  - [🧠 Understanding SRP with a Practical Example](#-understanding-srp-with-a-practical-example)
  - [❌ Problem with This Design](#-problem-with-this-design)
  - [✅ Refactored Design using SRP](#-refactored-design-using-srp)
  - [✅ Benefits of Applying SRP](#-benefits-of-applying-srp)
- [Open/Closed Principle (OCP)](#openclosed-principle-ocp)
  - [🏢 Real-world Analogy](#-real-world-analogy)
  - [❌ Bad Design Example](#-bad-design-example)
  - [✅ Good Design Using OCP](#-good-design-using-ocp)
  - [👍 Benefits of Applying OCP](#-benefits-of-applying-ocp)
- [Liskov Substitution Principle (LSP)](#liskov-substitution-principle-lsp)
  - [🏢 Real-world Analogy](#-real-world-analogy-1)
  - [❌ Bad Design Example (LSP Violation)](#-bad-design-example-lsp-violation)
  - [✅ Good Design Using Interfaces (LSP Applied)](#-good-design-using-interfaces-lsp-applied)
  - [👍 Benefits of Applying LSP](#-benefits-of-applying-lsp)
 
- [🔗 Code Repository](#-code-repository)

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

    public void sendOTP(MediumType mediumType) {
        // send OTP logic
        switch (mediumType) {
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
    public void sendOTP(MediumType mediumType) {
        // send OTP logic
        switch (mediumType) {
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

## Open/Closed Principle (OCP)

The **Open/Closed Principle** states:

> **"Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification."**

In simple terms:
You should be able to **add new functionality** to existing code **without changing** the already tested and deployed code.

### 🏢 **Real-world Analogy**

Think of a **plugin-based browser** (like Chrome or Firefox).
You don’t modify the browser's core source code to add new features like ad blockers or password managers.
Instead, you **extend** it using plugins or extensions.

That’s exactly what **OCP promotes in code** — enhance features via **extension**, not **modification**.

### ❌ **Bad Design Example**

Here’s a simple `NotificationService`:

```java
public class NotificationService {
  public void sendOTP(MediumType mediumType) {
    // send OTP logic
    switch (mediumType) {
      case EMAIL:
        System.out.println("Sending OTP via Email.");
        break;
      case SMS:
        System.out.println("Sending OTP via SMS.");
        break;
      default:
        System.out.println("Unknown OTP medium type.");
    }
  }
}
```

* Every time you want to add a **new channel** (e.g., Slack, Telegram, Push Notification), you must **modify this class**.
* This breaks OCP because it’s **not closed for modification**.

### ✅ **Good Design Using OCP**

Let’s use **abstraction (interfaces)** and **polymorphism** to make the system extensible.

#### 🔧 Define an Interface

```java
public interface NotificationService {
    void sendOTP();
    void sendTransactionNotification();
}
```

#### 📧 Email Notification Implementation

```java
public class EmailNotification implements NotificationService {
    @Override
    public void sendOTP() {
        // Logic using JavaMail API
    }

    @Override
    public void sendTransactionNotification() {
        // Logic to send email transaction alert
    }
}
```

#### 📱 Mobile Notification Implementation

```java
public class MobileNotification implements NotificationService {
    @Override
    public void sendOTP() {
        // Logic using Twilio SMS API
    }

    @Override
    public void sendTransactionNotification() {
        // SMS transaction alert logic
    }
}
```

#### 💬 WhatsApp Notification Implementation

```java
public class WhatsAppNotification implements NotificationService {
    @Override
    public void sendOTP() {
        // Logic using WhatsApp Business API
    }

    @Override
    public void sendTransactionNotification() {
        // WhatsApp alert logic
    }
}
```

### 👍 Benefits of Applying OCP

| Benefit                     | Description                                                           |
| --------------------------- | --------------------------------------------------------------------- |
| 🔄 No Modification Required | You don’t need to touch working code to add new notification types    |
| 🧪 Safe Enhancements        | You can safely introduce new behavior without breaking existing logic |
| 🧱 Scalable Design          | Codebase grows cleanly with clear separation of concerns              |
| ♻️ Reusability              | Implementations can be reused across different modules or services    |

### [🔝 Back to Top](#index)

---

## Liskov Substitution Principle (LSP)

The **Liskov Substitution Principle** states:

> **“Derived or child classes must be substitutable for their base or parent classes.”**

In simple terms:
If class **A** is a subtype of class **B**, then we should be able to **replace B with A** anywhere in the program **without breaking the behavior**.

### 🏢 **Real-world Analogy**

Imagine you have a **Universal TV Remote**.
It’s expected to work with **any TV brand** — Sony, Samsung, LG.

If one brand (say LG) doesn’t respond to the **Volume Up** button, then it **violates the substitution** expectation — that all TVs behave the same with the universal remote.

In code, this means:
**If a subclass does not behave as expected when used in place of a superclass, it violates LSP.**

### ❌ **Bad Design Example (LSP Violation)**

```java
public interface SocialMedia {
  void chatWithFriend();
  void publishPost(Object post);
  void sendPhotosAndVideos();
  void groupVideoCall(String... users);
}
```

#### ✅ `Facebook` is a valid substitution

```java
public class Facebook implements SocialMedia {
  @Override
  public void chatWithFriend() {

  }

  @Override
  public void publishPost(Object post) {

  }

  @Override
  public void sendPhotosAndVideos() {

  }

  @Override
  public void groupVideoCall(String... users) {

  }
}

```

Everything works. Facebook supports all these features.

#### ❌ `WhatsApp` violates LSP

```java
public class WhatsApp implements SocialMedia {
  @Override
  public void chatWithFriend() {

  }

  @Override
  public void publishPost(Object post) {
    // NOT SUPPORTED — violates substitution
  }

  @Override
  public void sendPhotosAndVideos() {

  }

  @Override
  public void groupVideoCall(String... users) {

  }
}

```

🛑 **Problem**: WhatsApp does **not support publishing posts**, but it's **forced** to implement it due to inheritance.
This breaks **LSP** — you can't substitute `WhatsApp` in place of `SocialMedia` safely.

### ✅ **Good Design Using Interfaces (LSP Applied)**

To apply LSP, we **segregate the behavior** into focused interfaces:

```java
public interface SocialMedia {
    void chatWithFriend();
    void sendPhotosAndVideos();
}

public interface SocialPostAndMediaManager {
    void publishPost(Object post);
}

public interface VideoCallManager {
    void groupVideoCall(String... users);
}
```

#### ✅ `Facebook` Implementation

```java
public class Facebook implements SocialMedia, SocialPostAndMediaManager, VideoCallManager {

  @Override
  public void chatWithFriend() {
    // Implementation for chatting with friends
  }

  @Override
  public void sendPhotosAndVideos() {
    // Implementation for sending photos and videos
  }

  @Override
  public void publishPost(Object post) {
    // Implementation for publishing a post
  }

  @Override
  public void groupVideoCall(String... users) {
    // Implementation for group video call
  }
}
```

✅ LSP is preserved — Instagram supports the interfaces it needs.

#### ✅ `WhatsApp` Implementation

```java
public class WhatsApp implements SocialMedia, VideoCallManager {
  @Override
  public void chatWithFriend() {

  }

  @Override
  public void sendPhotosAndVideos() {

  }

  @Override
  public void groupVideoCall(String... users) {

  }
}

```

✅ WhatsApp only implements what it supports — no forced behavior.

### 👍 Benefits of Applying LSP

| Benefit                   | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| ✅ Safe Substitution       | Subtypes can be used interchangeably with their base types  |
| 🔁 Flexible Architecture  | Interfaces give freedom to implement only required features |
| ❌ Avoids Overridden Stubs | No empty or unsupported method implementations              |
| 🧪 Easier Testing         | Polymorphic behavior is predictable and safe                |

### [🔝 Back to Top](#index)

---

## 🔗 Code Repository

You can find the complete Java code examples demonstrating the SOLID principles here:

[![GitHub - solid-principles-java](https://img.shields.io/badge/GitHub-View%20Code-black?logo=github)](https://github.com/nirmalakumarsahu/solid-principles.git)

### [🔝 Back to Top](#index)

### [Read More ➡️](https://nirmalakumarsahu.in/articles.html)

---