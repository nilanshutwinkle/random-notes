# Apache Big Data

## Projects

### Avro

### Hadoop

Hadoop provides massive scale out and fault tolerance capabilities for data storage and processing on commodity hardware.

### HBase

[HBase](https://hbase.apache.org/) is a column-oriented database built on top of HDFS.

* Modeled after Google's Bigtable
* No structured query language like SQL
* Data is partitioned into labeled tables; each table is accessed through its primary key
* Column groups are columns that are stored together
* Must predefine schema for tables and column groups, but not columns
* Four primary operations:
    1. Put: add or update rows
    1. Scan: retrieve range of cells
    1. Get: retrieve cells for specified row
    1. Delete: remove rows, columns, column versions
* Not fully ACID compliant, though provides some [limited ACID guarantees](http://hbase.apache.org/acid-semantics.html)

### HDFS

[HDFS](http://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-hdfs/HdfsUserGuide.html) is a distributed storage used by Hadoop applications.

* NameNode manages filesystem data
* DataNodes store the actual data
* Clients contact NameNode and directly I/O with DataNodes

### Hive

[Hive](https://cwiki.apache.org/confluence/display/Hive/Home) is a data warehouse infrastructure that provides SQL access (read, write) to distributed datasets.

* Impose structure on variety of data formats
* JDBC compliant
* Non-real time; query execution provided via Tez, Spark, or MapReduce
* Built on top of Hadoop
* Predefined connectors for CSV/TSV, Parquet, ORC, and some other formats

### ORC

[ORC](https://orc.apache.org/) is a small columnar data format.

* Block-level index
* ACID support

### Parquet

[Parquet](http://parquet.apache.org/documentation/latest/) is a compressed, efficient columnar storage format.

* Built for complex nested data structures
* Record shredding and assembly algorithm from [Google Dremel](https://research.google.com/pubs/pub36632.html)
* Per-column compression schemas

### Phoenix

### Pig

### Spark

[Spark](http://spark.apache.org/docs/latest/) is a fast, general-purpose engine for data processing on clusters.

* A job is associated with a chain of RDD dependencies organized into a logical plan, known as a DAG
* DAG is materialized and executed when SparkContext is asked to run job.
  - Invoke `toDebugString` RDDs to view execution plan (with indentation indicating shuffle boundary)

### Storm

Distributed stream processing framework.

* DAGs where "spouts" (information sources) and "bolts" (transformations) are the vertices and streams are the edges.
* Written predominantly in Clojure.

### Tez

[Tez](http://tez.apache.org/) is a framework for building DAGs of tasks. Useful for building purpose-built tools, as opposed to using something general purpose like Spark.

* Built on top of YARN

### Thrift

### YARN

[YARN](http://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/YARN.html) splits up resource management from job management.

* Part of Hadoop
* Global ResourceManager and per-application ApplicationManager
* Application is a job or DAG of jobs

### ZooKeeper

[ZooKeeper](http://zookeeper.apache.org/) is a centralized service for coordinating distributed processes.

## Notes

* [Amazon Elastic MapReduce](https://aws.amazon.com/emr/) (EMR) is a managed service for Hadoop and Spark ecosystems.
