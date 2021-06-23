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

* Cloud native databases free us from concerns of databased connection pools, but introduce capacity throttling (62)
* Disposable architecture frees us from worrying about vendor lock-in, enabling us to leverage cost-effective vendor-specific solutions (62)
* Synchronous inter-component communication creates tight coupling (66)
* **two-phase commit** (**2PC**): distributed transaction protocol made up of a vote phase followed by commit phase.
* **change data capture** (**CDC**): database design pattern where trigger some action whenever data changes
* **Command Sourcing** records inputs to commands, whereas **Event Sourcing** records the outputs
* Data lake is the system of record for all row events, and is used to replay events to repair components, populate new components, and support data science activities (81)
* **Stream Circuit breaker**: send event with unrecoverable error as fault event (along with metadata, such as impacted stream) so event can be monitored and retried (87)
* **Circuit breaker**: pattern where wrap remote call, and monitor failures, and once critical threshold reacher return errors without invoking call.
* Michael Nygard's **Release It**
* Backpressure is natural product of functional reactive designs (91)

## Chapter 4: Boundary Patterns

* Can use CDNs for all traffic (PUT, POST, GET, DELETE) to protect against DDOS attacks (106)
* Caching within the API Gateway should be considered an anti-pattern. API Gateway should have single responsibility: providing perimeter around systems (107)
* Some quasi-dynamic data (e.g., putting to blob storage) can bypass API directly, and route through CDN instead. Benefits: CDN invalidation, reduced load on API Gateway (107)
* **AWS CloudFront**: AWS managed CDN service
* Common to run API gateway behind custom CDN, to get full power (e.g., caching)
* API gateway usually either pointing to 1) lambda, or 2) load balancer pointing to ECS or another container service (108)
* Synchronous API are great place to employ **Database-First Event Sourcing** (109)
* Keep complexity low in synchronous boundary components (110)
* Materialized views are primary facilitator of global scalability (114)
* Retrieving data from a database always has final word on performance and scalability (114)
* **Offline-First Database**: pattern where persist events client-side in local storage and publish to cloud whenever connected, which is stored as materialized view
* **AWS Cognito**: AWS managed SSO, including SDK with offline sync capabilities (123-4)
* Backend for Frontend helps ensure a fullstack team can own its frontend and corresponding backend (129)
* Micro-frontend approaches enable integrate multiple independent components with separate BFFs into single experience
* Achieving balance of BFF components is iterative process (130)
* **Micro Frontend**: architectural style where independently deliverable front end applications are composed into greater whole
* ThoughtWoprks **Technology Radar**
* **Postel's Law**: aka, The Robustness Principle. Be conservative in what you send, liberal in what you accept. (132)
* Want to avoid shared components, and instead turn database inside-out (132)
* **SendGrid**: Popular API-driven managed email service
* **Event-First Event Sourcing**: variant of Event Sourcing where event is first published to event stream and subsequently stored to database (140)
* **HighlandJS**: popular streaming JS library

## Chapter 5: Control Patterns

* **Event Collaboration**: pattern where independent components consume relevant events & publish events in uncoordinated manner. Suffers from event type coupling. (148)
* **Event Orchestration**: pattern where leverage mediator component to orchestrate collaboration between components without event type coupling (152)
* **event-type coupling**: happens when changing events requires updating consumers (152, 153)
* **command messages**: events specifically intended to trigger a specific process, e.g., Event Orchestration (156)
* **Saga**: pattern where use compensating transactions to undo changes in multi-step process. (162)
* **BASE model**: alternative to ACID for distributed transactions. Basically available, soft state, eventually consistent. (163)
* The industry has abandoned two-phase commit transactions because they don't scale (164)

## Chapter 6: Deployment

* Should deploy on 1st day writing code, to get plumbing of deployment pipeline up and running
* Preferable to use user permissions for feature toggling, instead of flags in code (since they pollute codebase), enabling functions like demos, A/B testing, beta access, and user preferences (196)

## Chapter 7: Testing

* Writing code is a developer's job, and writing tests is writing code. (211)
* If engineers define their test cases, they will likely just confirm the code they wrote. (211)
* Test system will be larger than the system being tested. (211)
* **Sinon**: JavaScript test double library. (213)
* Cloud-native systems share little code across components (if any), so less reliance on frameworks (e.g., dependency injection) (214)
* **component testing**: a level up from unit testing, verifies that a component produces desired behavior while still isolating from neighboring components. (216)
* Because of high cost of integration and end-to-end tests, traditionally batch up changes to deploy -- the opposite desired outcome for mature software delivery (both in terms of delays and risks given volume of changes) (217)
* **VCR libraries**: integration testing libraries that provide a recording mode to fetch and cache remote responses, and playback mode for testing via cache (220-1)
* **contract testing**: asserting that response or event matches expected payload, often using consumer-specified tests and assertions. (221-3)
* Can combine contract testing & integration tests with VCR libraries to overcome VCR's main weakness: producer changes (223)
* **transitive testing**: coordinating series of integration & contract tests together across teams to create an e2e test out of isolated tests (224)
* **Pact**: Popular consumer-first contract testing tool for HTTP and message-based integrations.
* Automated testing doesn't ensure quality, and internal manual, exploratory testing before turning on a feature is a good idea. (226)
* **Supertest library**: JavaScript library providing HTTP assertions via a fluent API, leveraging Superagent library.
* **Replay library**: JavaScript library for recording & replaying HTTP responses
* **Mocha**: Very popular JavaScript BDD testing framework, with strong async testing support.
* Rolling your own contract testing using `supertest`, `replay`, `serverless-offline`, and `baton-request-replay` (228-9)
* **baton-request-relay**: JavaScript library that reads Replay VCR recordings for use with contract testing.
* **serverless-offline**: Serverless plugin to emulate AWS Lambdas & API gateway locally

## Chapter 8: Monitoring

* Instead of trying to minimize mnean time between failures, aim to improve mean time to recovery (236)
* Monitor on key performance indicators - symptoms, not causes. (237-8)
    - E.g., Netflix monitors using **Starts Per Second** (**SPS**), the rate at which customers press the play button. (Use a double exponential smoothing algorithm to produce clear signal that can be monitored for anomalies.)
* All other non-KPI data used to identify root cause, but not to alert. (238)
* **TestOps**: Discipline of managing the operational aspects of testing within the SDL; including planning, management, control, and insights
* Identifying key performance indicators of systems is objective of TestOps practice (238)
* For companies without large international user bases, combine synthetic transaction monitoring with real-user monitoring to ensure predictable traffic (239)
* **Real-user monitoring** (**RUM**): End user applications sample performance data in real-time & periodically submit this info for tracking purposes. (239)
* **Synthetic transaction monitoring** (**STM**): generate a regular, consistent, and deterministic flow of traffic in production, generating signals that we monitor in our KPI, allowing us to continuously & predictably monitorhealth of system (240-1)
* **telemetry**: transmitting observations & measurements to the monitoring system for processing (246)
* **StatsD**: Popular open source telemetry agent developed by Etsy (246)
* Alert fatigue is classic problem with monitoring. (248)
* :star: Don't page on both symptoms & causes; paging on causes may be premature. Page on symptom decouples from implementation, which can change over time. (249)
* Teams should create dashboards for each component in advance, including work metrics, resource metrics, all events, filters for tags (e.g., environment, region)

## Chapter 9: Security

## Chapter 10: Value Focused Migration
