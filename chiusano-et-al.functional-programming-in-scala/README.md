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
* **Partial functions** aren't defined for some inputs. (E.g., mean wouldn't be defined for an empty list.)
* **Total functions** define exactly one value for each value of input type.

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
