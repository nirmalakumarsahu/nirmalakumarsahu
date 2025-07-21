# Saga Choreography Design Pattern

[Articles](https://nirmalakumarsahu.in/microservices.html) | [My Profile](https://nirmalakumarsahu.in)

[![Saga Pattern](https://img.shields.io/badge/Saga%20Pattern-Distributed%20Transactions-blueviolet?logo=apachekafka)](https://microservices.io/patterns/data/saga.html)
[![Choreography](https://img.shields.io/badge/Choreography%20Saga-Event%20Driven-lightgrey?logo=eventbrite)](https://microservices.io/patterns/data/saga.html)
[![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-Stream%20Processing-231F20?logo=apachekafka\&logoColor=white)](https://kafka.apache.org/)
[![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED?logo=docker)](https://www.docker.com/)

[![Spring Cloud Stream](https://img.shields.io/badge/Spring%20Cloud%20Stream-Message%20Bus-6DB33F?logo=springcloudstream)](https://spring.io/projects/spring-cloud-stream)
[![Microservices Architecture](https://img.shields.io/badge/Microservices%20Architecture-Design%20Pattern-blue?logo=microservices)](https://microservices.io/patterns/microservices.html)
[![Java](https://img.shields.io/badge/Java-Programming%20Language-red?logo=openjdk)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Java%20Framework-6DB33F?logo=springboot)](https://spring.io/projects/spring-boot)

---

## Index

---

## 🧨 Problem: Distributed Transactions in Microservices

Let’s take a very simple business requirement:

> **"When a user places an order, the order should only be fulfilled if the product's price is within the user’s credit limit or available balance."**

Sounds easy, right?

In a **monolithic application**, this is indeed straightforward. The application might wrap this entire process inside a **single database transaction**. If anything goes wrong—like insufficient balance or out-of-stock inventory—the transaction is **rolled back**. This approach is **safe**, **consistent**, and **reliable**.

However, things get a lot more complicated when you move to a **microservices architecture**, where:

* Each business capability is **owned by a separate microservice**
* Each service has **its own database**
* Services **communicate via the network**
* Each service can fail **independently**


### 🎯 Example Scenario

Let’s break the example down using microservices:

| Service               | Responsibility                            |
| --------------------- | ----------------------------------------- |
| **Order Service**     | Handles creation and management of orders |
| **Payment Service**   | Manages user balances and credit limits   |
| **Inventory Service** | Tracks and reserves product stock         |

Now, here’s how the flow would work:

1. A user sends a request to **place an order**.
2. `order-service` receives the request and creates an order in a **PENDING** state.
3. It calls `payment-service` to check if the user has enough credit.
4. It also calls `inventory-service` to check if the product is in stock.
5. If both respond positively:

    * The order is marked as **COMPLETED**
    * Balance is deducted, and inventory is reduced
6. If any check fails:

    * The order is **cancelled**
    * Any partially completed steps must be **rolled back**

### ⚠ The Distributed Challenge

This simple scenario becomes incredibly complex due to the **distributed nature** of the system:

### ❌ Why HTTP Synchronous Communication Fails

* What if `payment-service` is **temporarily down**?
* What if `inventory-service` responds **after a long delay**?
* What if `order-service` crashes **after reserving inventory** but **before confirming payment**?
* What if both services **accept** but the **final commit fails**?

These kinds of failures lead to:

* **Inconsistent state across systems**
* **Partial commits**
* **Tight coupling** between services
* **Hard-to-debug** user issues
* **Revenue loss** and poor UX

### [🔝 Back to Top](#index)

---

## ✅ Solution: Saga Pattern + Event Sourcing

To solve this problem, we need a **reliable coordination pattern** that supports **asynchronous**, **event-driven**, and **fault-tolerant** communication.

### 🧩 Saga Pattern

A **Saga** is a **sequence of local transactions** where each service performs its task and **publishes an event** that triggers the next action.

Each service is **autonomous** and responsible for:

* Executing its local logic
* Emitting events on success
* Reacting to other services’ events

If a step fails, a **compensating transaction** (a rollback-like action) is triggered through another event.

### 🧭 Two Ways to Implement Sagas

| Approach          | Description                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------ |
| **Choreography**  | Each service listens to events and reacts accordingly. There is **no central controller**. |
| **Orchestration** | A central **Saga orchestrator service** tells each microservice what to do.                |

We will use the **Choreography approach** for its simplicity and full decoupling.

### [🔝 Back to Top](#index)

---

## 📣 Event Sourcing

In **Event Sourcing**, every change in the system is recorded as an **immutable event**:

* `OrderCreated`
* `PaymentReserved`
* `InventoryReserved`
* `PaymentDeclined`, etc.

These events:

* Are stored in a database or event store
* Are **published to a message broker** like **Apache Kafka**
* Can be **replayed** for recovery or debugging
* Can **trigger reactions** from other services

### [🔝 Back to Top](#index)

---

## 🔄 End-to-End Workflow (Order + Payment Only)



### ✅ Step-by-Step Execution:

1. **User places an order**

   * `OrderService` receives a REST request.
   * It creates a new order in the **`ORDER_CREATED`** state.
   * It then **publishes an `OrderCreated` event** to Kafka.

2. **Payment Service receives the event**

   * Listens for `OrderCreated` events.
   * Checks the user’s balance:

      * If **sufficient**, reserves the amount, publishes `PaymentReserved` event.
      * If **insufficient**, publishes `PaymentDeclined` event.

3. **Order Service listens to payment events**

   * Listens for `PaymentReserved` or `PaymentDeclined`.
   * Based on the event received:

      * If **PaymentReserved**, marks the order as **`ORDER_COMPLETED`**.
      * If **PaymentDeclined**, marks the order as **`ORDER_CANCELLED`**.

---

## 🔁 Compensation Strategy (Two Services Only)

Since we don’t have inventory in this scenario, compensation is minimal but still essential:

| Failure Point | Compensating Action                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------- |
| Payment fails | Cancel the order (`ORDER_CANCELLED`)                                                               |
| Order fails   | (If failure occurs after payment) → Roll back reserved balance (requires `PaymentCancelled` event) |

> 🔁 *Note: In a more robust system, even the Payment Service would listen to an `OrderCancelled` event to refund the balance if needed. This is optional here.*

### 💡 Advantages of Saga + Event Sourcing

| Feature            | Benefit                                     |
| ------------------ | ------------------------------------------- |
| **Loose coupling** | Services only interact through events       |
| **Resilience**     | One service’s failure doesn’t crash others  |
| **Event-driven**   | Improves scalability and performance        |
| **Traceability**   | Easy to audit and debug via event logs      |
| **Recoverability** | Replay events to rebuild state              |
| **Autonomy**       | Services are independent, easily deployable |


### [🔝 Back to Top](#index)

---

## 🛠️ Technology Stack

| Layer                    | Tech                          |
|--------------------------|-------------------------------|
| **Framework**            | Spring Boot                   |
| **Event Bus**            | Apache Kafka                  |
| **Message Integration**  | Spring Cloud Stream           |
| **Reactive Programming** | Spring Boot Webflux           | 
| **Monitoring**           | Spring Boot Actuator          |
| **Documentation**        | Swagger/OpenAPI               | 
| **Build Tool**           | Maven                         |
| **Database**             | MySQL                         |
| **Containerization**     | Docker Compose                |



### 📝 Example Code Snippet (Implementation)

   
### [🔝 Back to Top](#index)

### [Read More ➡️](https://nirmalakumarsahu.in/articles.html)

---