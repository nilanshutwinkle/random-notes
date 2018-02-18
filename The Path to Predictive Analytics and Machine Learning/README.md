# The Path to Predictive Analytics and Machine Learning

## 1: Building Real-Time Data Pipelines

* **Operational applications** (automatic decision making) vs **interactive applications** (computer-aided decision making) (1)
* Domain-specific languages like R generally not suitable for low-latency production envs (1)
* Starts w/ high-through messaging system (e.g., Kafka), then the transformation tier (incl enrichment, filtering, aggregation; e.g., Spark streaming), the persistent datastore (2-4)
* Traditionally, OLTP (real-time data) and OLAP (historical data) are siloed, and moving data between them requires ETL. This siloing prevents real-time application. (5-6)

## 2: Processing Transactions and Analytics in a Single Database

* Memory optimized datastore allow concurrent, transactional read-write access; in-memory is necessary, as disk-backed cannot deliver necessary I/O (8)
* Our hybrid data system must allow us to compare real-time data (high-throughput operational transactions) to aggregations of historical data (fast analytical queries) (8)
* **Compiled query execution plans**: executing query directly in memory avoids code generation and hence improves query performance (8-9)
* **Multiversion Concurrency Control** (MVCC) avoids locks on reads and writes (9)
* Durability and high availability essential (11-12)

## 3: Dawn of the Real-Time Dashboard

* E.g., Tableau (18), Zoomdata (19), Looker (19-20)

## 4: Redeploying Batch Models in Real Time

* **Lambda architecture** handles high volumes of data by combining batch processing and stream processing (24-25) 
  - *batch layer* (e.g., Hadoop) stores events and produces *batch views*
  - *speed layer* (e.g., Storm, Spark) deals with recent data only
  - *serving layer* responds to queries and merges results from batch and speed layers

## 5: Applied Introduction to Machine Learning

## 6: Real-Time Machine Learning Applications

## 7: Preparing Data Pipelines for Predictive Analytics and Machine Learning

## 8: Predictive Analytics in Use

## 9: Techniques for Predictive Analytics in Production

## 10: From Machine Learning to Arti cial Intelligence
