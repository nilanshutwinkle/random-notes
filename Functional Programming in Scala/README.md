# Functional Programming in Scala

## Chapter 1: What is functional programming?
* Side effects limits testability, comparability. (6)
* Pure core, thin layer on outside for effects. (8)
* **Referential transparency** (RT): if all occurrence of expressions can be replaced with values. (9)
* **Pure function**: when function is RT. (9)
* **Substitution model**: mode of reasoning based on RT. (11)
* Local reasoning enabled when no state. (12)

## Chapter 2: Getting started with functional programming in Scala
* **Tail call elimination** and `@annotation.tailrec` (20-21)
* Monomorphic vs polymorphic (aka, "generic") functions (22-23)
* Elided = omitted (25)
* Function literals actually `Function0`, `Function1`, etc with `apply` method defined (25)
* Implementations of polymorphic functions are often significantly constrained (25)
* **Partial application**: when fn only has some (but not all) of its arguments supplied
* **Currying**: convert fn of two arguments into partially applied fn of one argument (27)
* **Function composition**: feeds output of one function as input into another (27)
* Functional programming in the large has much the same flavor as programming in the small (28)

## Chapter 3: Functional data structures
* Functional data structures are immutable. (29)
* `sealed trait` requires that all Implementations are defined in the file. (30)
* Covariant type parameter (e.g., `List[+A]`). For all types `X` that are subtypes of `Y`, `List[X]` is subtype of `List[Y]`; otherwise, invariant. (31-32)
* `Nothing` is a subtype of all types. (32)
* Companion objects are a Scala idiom. (32, 33)
* Pattern matching matches against structural equivalence. (34)
* **Variadic functions**, e.g., `def apply[A](as: A*): List[A] = ???`. (34)
* **Data sharing**: don't copy immutable data structures; we reuse them. (35)
* For immutable linked lists, operating on head is cheap; operating on tail is expensive. (37)
* Use multiple argument lists to help Scala with type inference. (37-38)
* Reducing duplication buy pulling subexpressions into function arguments. (38)
* Implementing `foldLeft` (40-41), `flatten` (41), `map` (42), `filter` (42), `flatMap` (42), `zipWith`. (42)
* Downside of general purpose functions is that they aren't always efficient; may make several passes of data. (44)
* **Algebraic data type** (ADT): data type defined by one or more data constructors; the data type is the *union* of its constructors, and each constructor is the *product* of its arguments. (44)
* Tuples are ADT with a special syntax. (45)
* FP less concerned about encapsulation (e.g., hiding internal representation for ADTs) since there is no delicate state to protect (46)

## Chapter 4: Handling errors without exceptions

* Throwing exceptions is a side effect, and breaks RT since where it is thrown (inside or outside try blocks) impacts result of expression. (48, 49)
* RT doesn't depend on context, but non-RT expressions are context-dependent and depend on globally reasoning. Exceptions introduce context dependence. (49)
* Can represent failures with ordinary values, and use higher-order functions to abstract common patterns of error handling. (48)
* Unchecked exceptions are not type safe, and checked exceptions are problematic for higher-order functions. (50)
* **Partial functions** aren't defined for some inputs; e.g., mean wouldn't be defined for an empty list. (51)
* **Total functions** define exactly one value for each value of input type. (52)
* Should try to use higher-order functions before resorting to pattern matching. (54)
* `Option` doesn't infect our codebase; can use non-Option methods with `lift`. (56)
* Using `map2` to apply two `Option` values to `(A,B) => C`. (58)
* **for-comprehensions**. (59-60)
* `Either` is disjoint union of two types. (61)
* When using `Either` for error handling, by convention the right constructor is reserved for success. (61)
* Standard library `Either` does not define right-biased flatMap. (61)
* Beyond error handling, the idea of representing effects as values is something that will be covered repeatedly in this book. (63)

```
sealed trait Option[+A]
case class Some[+A](get: A) extends Option[A]
case object None extends Option[Nothing]
```
* `Option[+A]` and `Some[+A]` are covariant.
* `None` is singleton (`case object`).
* Because `Nothing` is subtype of everything and `Option` is covariant, `None` is subtype of every possible `Option[A]`.

```
def getOrElse[B >: A](default: => B): B
```
* `B` must be a supertype of `A`.
* `default` is a **lazy parameter** won't be evaluated unless needed.

```
def lift[A,B](f: A => B): Option[A] => Option[B] = _ map f
```
* Easy to `lift` non-Option methods to Option methods

```
sealed trait Either[+E, +A]
case class Left[+E](value: E) extends Either[E, Nothing]
case class Right[+A](value: A) extends Either[Nothing, A]

object Either {
  def Try[A](a: => A): Either[Exception, A] =
    try Right(a)
    catch { case e: Exception => Left(e) }
}
```

## Chapter 5: Strictness and laziness

* Couple of the goals of **non-strictness** (e.g., **laziness**) is to avoid temporary structures and perform computations in a single pass. (65)
* A function is non-strict if it can choose to not evaluate one or more of its arguments. (65)
* **Thunk**: the unevaluated form of an expression that can be evaluated to get the result. (66)
* Non-strict functions accept parameters **by name**: `def foo[A](f: => A): A = f`. (67-68)
* Caching values with `lazy` keyword: `lazy val j = i`. (67)
* **Streams** are lazy lists. (68)
* **Smart constructors** are data type constructors that ensures invariants (e.g., memoizing) or different signature. By convention, lowercase. (69)
* **Separation of concerns** is a theme in functional programming. Laziness involves separating the description of computations from actually running them. (70)
* Huge benefit of lazy methods: can terminate early. (71)
* An implementation is **incremental** if they don't fully generate their answers until someone looks at them. I.e., they are lazy. (72)
* Streams are often called **first-class loops** because higher-order methods are invoked in an interleaved manner without calculating intermediate streams, just like can be accomplished with a for loop. This reduces their memory footprint and can avoid unnecessary work. (73)
* **Infinite streams**. E.g., `val ones: Stream[Int] = Stream.cons(1, ones)`. (73)
* **Corecursive functions** (aka, "guarded recursion") produce data (e.g., `unfold`), whereas recursive functions consume them (e.g., `fold`). (75)

## Chapter 6: Purely functional state

* Chapter about writing purely functional programs that manipulate state. (78)
* Achieve referential transparency by making state updates explicit; not as a side effect, but returning state with generated values. (80)
* **Linear congruential generator**: random number generator implementation. (81)
* **State transitions** (or **state actions**), e.g., `RNG => (A, RNG)`. (84)
* State actions can be combined using **combinators**. (84)
* `type Rand[+A] = RNG => (A, RNG)`. (84)
* Goal: use `Rand` with combinators to abstract away the `RNG`. (84)
* Useful combinators: `map` (84), `map2` (85), `sequence` (86), `flatMap` (87).
* The `State` type and case class. (88)
* **Imperative programming**: program is sequence of statements where each statement modifies program state. Functional programming has excellent support for writing imperative programs; e.g., for comprehensions. (88-89)
* Created *Machine*, a finite state machine that dispenses candy. (90-91)

## Chapter 7: Purely functional parallelism

* Theme: separating description of computation from running it. (95)
* **Algebraic reasoning**, and an API can be described by an algebra that obeys certain laws. (96)
* Goal: design a functional library for parallel computations without any side effects. (96)
* Design ideal API, and work backwards towards the implementation. (97)
* Separation of logical threads and OS threads. (98-99)
* Defining `unit` and blocking `get` is not referentially transparent, and hence it has side effects. We'll need to combine asynchronous computations prior to waiting for them to finish. (100)
* Combining parallel computations: (100)
  ```scala
  def sum(ints: IndexedSeq[Int]): Par[Int] =
    if (ints.size <= 1)
      Par.unit(ints.headOption getOrElse 0)
    else {
      val (l, r) = ints.splitAt(ints.length / 2)
      Par.map2(sum(l), sum(r)) { _ + _ }
    }
  ```
* Exercise 7.1:
  ```scala
  object Par {
    def map2[A,B,C](a1: => A, a2: => B)(fn: (A, B) => C): Par[C]
  }
  ```
* Not desirable to always run computation in separate thread (e.g., `Par.unit(1)`), so make forking explicit: (102)
  ```scala
  Par.map2(Par.fork(sum(l)), Par.fork(sum(r))) { _ + _ }
  ```
* Derived combinators (e.g., `lazyUnit`) are composed of primitive combinators (e.g., `lazy`, `unit`)
* If `Par` is a function that takes an `ExecutorService`, `run` becomes trivial: (105)
  ```scala
  type Par[A] = ExecutorService => Future[A]
  def run[A](s: ExecutorService)(a: Par[A]): Future[A] = a(s)
  ```
* Exercise 7.3:
  ```scala
  private case class MappedFuture[A,B,C](af: Future[A], bf: Future[B], fn: (A,B) => C) extends Future[C] {
    def isDone = af.isDone && bf.isDone
    def get(timeout: Long, units: TimeUnits) = {
      val start = System.currentTimeMillis
      val a = af.get(timeout, units)
      val rem = TimeUnits.MILLISECONDS.convert(timeout, units) - (System.currentTimeMillis - start)
      fn(a, bf.get(rem, TimeUnits.MILLISECONDS))
    }
    def isCancelled = a.isCancelled || b.isCancelled
    def cancel(evenIfRunning: Boolean) = {
      a.cancel(evenIfRunning)
      b.cancel(evenIfRunning)
      isCancelled
    }
  }

  def map2[A,B,C](a1: => A, a2: => B)(fn: (A, B) => C): Par[C] =
    (es: ExecutorService) => MappedFuture(a(es), b(es), fn)
  ```
* Exercise 7.4:
  ```scala
  def asyncF[A,B](f: A => B): A => Par[B] = a => Par.unit(f(a))
  ```
* Implementing `map` in terms of `map2`: (108)
  ```scala
  def map[A,B](pa: Par[A])(f: A => B): Par[B] =
    map2(pa, unit(())) { (a,_) => f(a) }
  ```
* Exercise 7.5:
  ```scala
  def sequence[A](ps: List[Par[A]]): Par[List[A]] = {
    val emptyPar = Par.unit { List[Par[A]]() }
    ps.foldLeft(emptyPar) { (b, a) =>
      Par.map2(b, a) { _ :+ _ }
    }
  }
  ```
* Exercise 7.6:
  ```scala
  def parFilter[A](as: List[A])(f: A => Boolean): Par[List[A]] = ???
  ```
  - `map(asyncF)` -> `zip` -> `sequence` -> `map` -> `filter` (yuck)
* **Free theorem**: when derive a theorem based on another theorem due to paramicity of function. (112)
* Non-observable side effects as an implementation detail of purely functional API. (116)
* `AtomicReference`, `CountDownLatch`: (116)
  ```scala
  def run[A](es: ExecutorService)(p: Par[A]): A = {
    val ref = new AtomicReference[A]
    val latch = new CountDownLatch(1)
    p(es) { a => ref.set(a); latch.countDown }
    latch.await
    ref.get
  }
  ```
* *Actor* is a concurrent process that only occupies a thread when it receives a message. (117)
* When you need new functionality, try to find the most general form. E.g., `choose` -> `chooseN` -> `chooser` -> `flatMap` -> `join`. This is a skill that develops over time. (121-122)
