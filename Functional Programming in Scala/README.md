# Functional Programming in Scala

## Chapter 1
* Side effects limits testability, comparability. (6)
* Pure core, thin layer on outside for effects. (8)
* **Referential transparency** (RT): if all occurrence of expressions can be replaced with values. (9)
* **Pure function**: when function is RT. (9)
* **Substitution model**: mode of reasoning based on RT. (11)
* Local reasoning enabled when no state. (12)

## Chapter 2
* **Tail call elimination** and `@annotation.tailrec` (20-21)
* Monomorphic vs polymorphic (aka, "generic") functions (22-23)
* Elided = omitted (25)
* Function literals actually `Function0`, `Function1`, etc with `apply` method defined (25)
* Implementations of polymorphic functions are often significantly constrained (25)
* **Partial application**: when fn only has some (but not all) of its arguments supplied
* **Currying**: convert fn of two arguments into partially applied fn of one argument (27)
* **Function composition**: feeds output of one function as input into another (27)
* Functional programming in the large has much the same flavor as programming in the small (28)

## Chapter 3
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

## Chapter 4

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

## Chapter 5

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
