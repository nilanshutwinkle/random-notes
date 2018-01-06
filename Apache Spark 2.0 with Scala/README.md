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
