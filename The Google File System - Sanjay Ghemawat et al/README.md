# The Google File System

Sanjay Ghemawat, Howard Gobioff, and Shun-Tak Leung

## Abstract
* Benefits: provides fault tolerance, runs on inexpensive commodity hardware, provides high aggregate performance.

## 1: Introduction
* Designed for component failures, which are the norm.
* Almost always mutated by appending; random writes practically non-existent.

## 2.3: Architecture
* Single master and multiple chunkservers.
* Store three replicas, those users can designate replication levels.
* Master maintains all file system metadata, controls system-wide activities like chunk lease management, garbage collection of orphaned chunks, chunk migration between chunkservers.

## 2.4: Single Master
* Single master simplifies design and enables sophisticated chunk placement and replication decisions using global knowledge.

## 2.5: Chunk Size
* Large chunk size disadvantages: chunkservers can become hotspots, but fix by increasing replication.

## 2.6.1: In-Memory Data Structures
* Chunk migration balances load and disk space usage across chunkservers.

## 2.6.2: Chunk Locations
* Chunkserver has final word over what chunks it has on its disks. No point trying to maintain a consistent view of this information on the master.

## 2.6.3: Operation Log
* Changes not visible to clients until metadata changes are persisted. Replicate metadata on multiple remote machines and respond to client only after flushing corresponding log record to disk both locally and remotely.
* Master recovers its file system state by replaying the operation log.
* The checkpoint is a compact B-tree like form that can be directly mapped into memory.

## 2.7.1: Guarantees by GFS
* Chunks are only lost if replicas lost before GFS reacts, typically within minutes.

## 3.3: Atomic Record Appends
* GFS guarantees data atomically written once. Written regions are consistent; intervening inconsistent.

## 3.4: Snapshot
* Use standard copy-on-write techniques to implement snapshots.

## 4.1: Namespace Management and Locking
* Includes read and write locks.
* Since no inode to lock, GFS locking scheme allows concurrent mutations in the same directory.

## 4.2: Replica Placement
* Chunk replica placement policy serves two purposes: maximize data reliability and availability, and maximize network bandwidth utilization.
* Spread chunk replicas across racks for availability.

## 4.3: Creation, Re-replication, Rebalancing
* Factors impacting where new chunks written: below-average disk utilization, limit recent changes on given chunkserver, spread chunks across racks.
* Re-replicates when chunk count below user-specified goal.
* Master rebalances replicas periodically.

## 4.4.1: Mechanism
* Deleted files are renamed, and after configurable time (e.g., 3 days) removes the hidden files from namespace.
* Master identifies orphaned chunks and erases metadata during heartbeats. Replies to chunkservers, which are free to delete replicas of chunks.

## 4.5: Stale Replica Detection
* Chunk version number to distinguish between up-to-date and stale replicas.
* Master removes stale replicas in its regular garbage collection.

## 5.2: Data Integrity
* Chunkservers use checksumming to detect corruption of stored data.
* Checksums verified during reads, and will not return data to requester if fails. Will not propagate corruptions to other machines.

## 8: Related Work
* Opted for centralized approach to simplify design, increase reliability, gain flexibility. Easier to implement sophisticated chunk placement and replications policies since master has most of relevant information.
* Simplified problem significantly by focusing on needs of application rather than building POSIX-compliant file system.

## 9: Conclusion
* High aggregate throughput achieved by separating file system control (master) from data transfer (chunkservers). Master involvement in common operations minimized by large chunk size and chunks leases.
