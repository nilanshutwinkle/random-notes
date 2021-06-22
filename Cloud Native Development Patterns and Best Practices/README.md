# Cloud Native Development Patterns and Best Practices

## Preface

* AWS, NodeJS, Serverless Framework, HighlandJS streaming library (3)
* Diagrams created using Cloudcraft (5)

## Chapter 1: Understanding Cloud Native Concepts

* Disposable infra is key to speed, safety, and scale (12)
* Bounded components follow single responsibility principle (14)
* Bounded components service requests from local materialized views (15)
* "What, really, wow": running UI tier without any servers (16)
* Pushing more (API, security, caching, storage) to the edge of cloud (16)
* Why does model need to properly reflect domain? When talking to domain experts, easier to reason about (17)
* Leverage native cloud services, even if proprietary, over deploying open source solutions (18)
* Concerns of vendor lock-in are monolith thinking; leverage value-add services, and you can replace the component later (19)
* Polyglot cloud (running on multiple cloud providers) is inevitable, as competition builds niches with competitive advantages (20)
* Multicloud strategies will not pan out, as they require upfront abstractions/complexity & fail to leverage provider's strengths (21)
* Decoupling deployments frmo releases (24)

## Chapter 2: The Anatomy of Cloud Native Systems

* "The Reactive Manifesto" and "Turning the Database Inside-Out" (27)
* **materialized view**: copy of data resulting from query but continuously kept up-to-date. This is a database concept that applies well to cloud native systems. (30)
* "Turning the database inside-out" is about taking all the processing databases do and moving to other parts of the cloud (30)
* **polyglot persistance pattern**: publish to event stream, which all databases read from and store in locally-optimized manner
* **bulkhead**: dividing wall or barrier between compartments in a ship, aircraft, or other transport vehicles
* **Reactive Manifesto**: System should be responsive, resilient, elastic, message-driven (28)
* **CAP theory**: In the presence of a network partition, choose between consistency and availability (33)
* Embracing eventual consistency significant advancement for industry (33)
* Modern databases scale horizontally via sharding (34)
* Goal: empower self-suffient, full-stack teams to leverage value-added cloud services & embrace disposable architecture so teams focus on value prop of their bounded, isolated components (35)
* **Event Sourcing**: pattern where persist change in state of entities as a series of atomically-produced immutable events (41)
* **Stream Circuit Breaker**: pattern where control flow of events in stream processors so failures do not inappropriately disrupt throughput using fault events to delegate handling of unrecoverable errors (41)
* **Trilateral API**: pattern where leverage 3 APIs: 1) synchronous for processing command & queries, 2) async for publishing events, 3) async for consuming events from other components (41)
* **API gateway**: create barrier at boundary of system by pushing cross-cutting concerns, such as security and caching, to edge of cloud
* **Command Query Responsibility Segregation** (**CQRS**): Pattern where consume events from upstream components and create materialized views for local consumption (43)
* **Backend for Frontend**: create dedicated backend components to support features of frontend applications (43)
* **External Service Gateway**: anticorruption layer between systems that encapsulates all inter-system communication (43)
* Master data model (which describes all entities in the enterprise) is futile endeavor, and will impede progress by doubling down on unbounded, non-isolated, monolithic applications (46)
* Components should have high cohesiveness/one responsibility (49-50)
* In summary, we can decompose a system based on business domain/value stream, proper application of design patterns, data life cycle, single responsibility principle (46-50)

## Chapter 3: Foundation Patterns

## Chapter 4: Boundary Patterns

## Chapter 5: Control Patterns

## Chapter 6: Deployment

## Chapter 7: Testing

## Chapter 8: Monitoring

## Chapter 9: Security

## Chapter 10: Value Focused Migration
