# Apache Spark 2.0 with Scala

[Udemy](https://www.udemy.com/apache-spark-with-scala-hands-on-with-big-data)

## Notes

I'm using Spark 2.2.1, installed via `brew`:

```
/usr/local/Cellar/apache-spark/2.2.1
```

## Section 1: Getting Started

### Lecture 2
* Setup, resources: [sundog-education.com/spark-scala/](http://sundog-education.com/spark-scala/)
* Install Spark 2.0.0 or later, pre-built for Hadoop
* In `conf/`, change `log4j.properties.template` to `log4j.properties` and change `log4j.rootCategory` from `INFO` to `ERROR`
* Testing:

```sh
$ cd /usr/local/Cellar/apache-spark/2.2.1
$ spark-shell
scala> val rdd = sc.textFile("README.md")
scala> rdd.count()
res0: Long = 103
CTRL-D
```

* RDD = "Resilient distributed dataset"

### Lecture 3

* Create a directory, e.g., `~/Developer/SparkScala`
* Download MovieLens 100k Dataset from [grouplens.org](https://grouplens.org/) > datasets, unzip, and place inside your `SparkScala` directory
* Download `ScalaSpark.zip` from the instructor's resources page, put somewhere safe (e.g., `~/Developer/SparkScala/course`)
* Inside this directory, I added a symlink to Spark install:
```sh
$ ln -s /usr/local/Cellar/apache-spark/2.2.1 apache-spark
```
* Setup IDE
  - I'm using Intellij, create new project in directory created above, `~/Developer/SparkScala`
  - I had to install Scala 2.11, since version of Spark not compatible with 2.12
* Create package, e.g., `com.bryanesmith.spark` and copy `course/RatingsCounter.scala` from instructor's source directory
* Add all jars from Spark install to your project
* Run `RatingsCounter` to view histogram

## Section 2: Scala Crash Course

### Lecture 4
* Spark is written in Scala; if use Scala, get latest features first

### Lecture 5

```scala
f"Foo $foo%3f"
f"Bar $bar%05d"
val pattern = """.* ([\d]+).""".r
val pattern(answer) = someStr
```

### Lecture 8

```scala
"foo" -> "bar" // tuple
list1 ++ list2 // concat lists
```

## Section 3: Spark Basics

### Lecture 9
* Spark is general, fast engine for lage-scale data processing
* Architecture: driver program, cluster manager, executor
* DAG engine to optimize workflows
* One main concept: the Resilient Distributed Dataset (RDD)
* Spark components:
  - Spark Core
  - Spark Streaming
  - Spark SQL
  - MLLib
  - GraphX

### Lecture 10
* RDDs can be **transformed** (e.g., `map`, `flatMap`, `filter`, `distinct`, `sample`, etc) and have **actions** (e.g., `collect`, `count`, `countByValue`, `take`, `top`, `reduce`, etc)
* Nothing happens until call action (lazy evaluation)

### Lecture 11

```scala
val sc = new SparkContext("local[*]", "RatingsCounter")
val lines = sc.textFile("...")
...
val results = ratings.countByValue()
```

### Lecture 12

* Execution plan created from RDD
* `countByValue` can result in **shuffle operation** on cluster, which can be expensive (want to minimize)
* **Stages** run in parallel. Stages are broken into **tasks**, which may be distributed across servers.
* Sample execution plan:
  - Stage 1: `textFile`, `map`
  - Stage 2: `countByValue`

### Lecture 13

* **Key/value RDDs** are RDDS with key/value tuples. E.g., average # of friends by age.
* Useful for key/value RDDs: `reduceByKey`, `groupByKey`, `sortByKey`, `keys`, `values`
* Can do SQL-like joins on two key/value RDDs: `join`, `rightOuterJoin`, `leftOuterJoin`, `cogroup`, `subtractByKey`

### Lecture 14

* `FriendsByAge.scala` example
* Using `reduce` action to get results

### Lecture 16

* `MinTemperatures.scala`, `MaxTemperatures.scala` examples

### Lecture 17

* `WordCount.scala` example

### Lecture 18

* `WordCountBetter.scala` example

### Lecture 19

* Instead of `countByValue`, going to use map/reduce (e.g., `map` + `reduceByKey`) so that execution is distributed
* `WordCountBetterSorted.scala` example

### Lecture 20

* Exercise: sum up amount spent per customer (`custom-orders.csv`)

### Lecture 21

* Exercise: sort by amount spent per customer

## Section 4: Advanced Examples of Spark Programs

### Lecture 23

* `PopularMovies.scala` (find movie w/ most ratings)

### Lecture 24

* **Broadcast variables**: sharing values across cluster using `broadcast()` and `value()`, e.g.,
  ```scala
  val nameDict = sc.broadcast(loadMoviesNames)
  ...
  nameDict.value(x._2)
  ```
* `PopularMoviesNicer.scala`

### Lecture 25

* `MostPopularSuperhero.scala`

### Lecture 26

* Introduce breadth-first search BFS

### Lecture 27
* **Accumulators** are variables for aggregating info across clusters:
  ```scala
  val emptyLines = sc.accumulator(0, "Empty")
  ...
  forEach { line =>
    if (line.isEmpty) emptyLines += 1
  }
  ```
* Going to impl BFS using map/reduce

### Lecture 28

* `DegreesOfSeparation.scala`

### Lecture 29

* **Item-based collaborative filtering**: movies that are similar to each other based on similar ratings
* `cache()` (memory) and `persist()` (disk) when need to access RDD more than once

### Lecture 30

* `MoviesSimilarities.scala`
* **Self join**:
  ```scala
  val ratings = ??? // (userId, rating)
  val combos = ratings.join(ratings)
  ```
* **Cosine similarity** measurement
* Running Spark on command-line:
  ```bash
  $ spark-submit --class com.foo.Bar Bar.jar <param1> ...
  ```

### Lecture 31
* Ideas for extensions:
  - Discard bad ratings
  - Try different similarity metrics (Pearson R, conditional probability)
  - Ise genres from `u.items`

## Section 5: Running Spark on a Cluster

### Lecture 32
* To run with `spark-submit`:
  1. Make sure no paths to local filesystem; use HDFS, S3, etc
  2. Package as JAR
  3. `spark-submit --class <main-class> <path-to-jar>`
    -  `--jars <paths-to-dependencies>`
    -  `--files <files-to-distribute>`
* `spark-submit` can integrate with cluster manager

### Lecture 33
* sbt directory structure:
  - `/src/main/scala`
  - `/project`
* `/project/assembly.sbt`:
  ```scala
  addSbtPlugin("com.eed3si9n" % "sbt-assembly" % "0.14.3")
  ```
* `/build.sbt`:
  ```scala
  name := "PopularMovies"
  version := "1.0"
  organization := "com.bryanesmith"
  scalaVersion := "2.10.6" // this is old; use newer
  libraryDependencies ++= Seq(
    "org.apache.spark" %% "spark-core" % "1.6.1" % "provided" // don't bundle dependencies
  )
  ```
* `sbt assembly`
* `MoviesSimilarities1M.scala`
* Loading from S3:
  ```scala
  val data = sc.textFile("s3n://sundog-spark/ml-1m/ratings.dat")
  ```
* To use EMR cluster's configuration:
  ```scala
  val conf = new SparkConf()
  conf.setAppName("MovieSimilarities1M")
  val sc = new SparkContext(conf)
  ```
* :star: **Activity**: package up `MovieSimilarities1M.scala` using sbt, and execute using `spark-submit`

## Section 6: SparkSQL, DataFrames, and DataSets

## Section 7: Machine Learning with MLLib

## Section 8: Intro to Spark Streaming

## Section 9: Intro to GraphX

## Section 10: Where to Go From Here
