# Chapter 1: Introduction

* **Reinforcement learning** is much more focused on goal-directed learning from interaction than other machine learning approaches (1)

## 1.1 Reinforcement Learning
* Reinforcement learning is learning what to do to maximize a numerical reward signal (1)
* **Trial-and-error search** and **delayed reward** are the two most important distinguishing features of reinforcement learning (2)
* Markov decision processes are intended to include sensation, action, and goal in their simplest possible forms without trivializing any of them (2)
* **Supervised** and **unsupervised learning** do not exhaustively cover machine learning (2)
  - Unsupervised learning is about finding structure hidden in collections of unlabeled data
  - Reinforcement learning is trying to maximize a reward signal instead of finding a hidden structure
* Trade-off between exploration and exploitation has been studied intensively by mathematicians for many decades, yet remains unsolved (3)
* Reinforcement learning considers the *whole* problem of a goal-directed agent interacting with an uncertain environment; starts with a complete, interactive, goal-seeking agent (3)
* The ability of some RL methods to learn with parameterized approximators addresses the classical **curse of dimensionality** (4)

## 1.2 Examples

## 1.3 Elements of Reinforcement Learning

* Four main subelements of a reinforcement learning system: :star: (6-7)
  - **policy**: mapping from perceived states of the environment to actions to be taken; may be stochastic
  - **reward signal**: primary basis for altering the policy; immediate, intrinsic desirability of environmental states
  - **value function**: the long-term desirability of states
  - **model of the environment**: (optional) allows inference on how environment will behave
* Seek actions that bring about states of highest value, not highest reward :star: (6)
* Most important component of almost all RL algorithms we consider is a method for efficiently estimating values (7)
* **Model-based methods** use models and planning; **model-free methods** are simpler and are trial-and-error learners (7)

## 1.4 Limitations and Scope

* Most of RL methods in book are structured around estimating value functions, though not strictly necessary for solving RL problems (7)
* **Evolutionary methods** create random variations of policies, and those with most reward are carried across to next generation of policies (7)
* Evolutionary methods ignore much of useful structure of RL problems that enable efficient search, such as policy, states, actions; hence not especially well suited to RL problems (8)

## 1.5 An Extended Example: Tic-Tac-Toe

* **Greedy actions**: select action with greatest value; as opposed to exploratory actions (9)
* **Back up**: after taking greedy move, current value of earlier exploratory state is updated to be closer to value of this later state (9)
* **Temporal-difference learning** involve updating estimates based on difference between estimates at two successive states: (9)

  ![Equation for back up](chap1/1.svg)

  Where:
  - ![alpha](chap1/2.svg) is small positive fraction called **step-size parameter**
  - ![S_t](chap1/3.svg) is state prior to greedy move
  - ![S_t+1](chap1/4.svg) is state after greedy move
  - ![V(S_t)](chap1/5.svg) is value function applied to particular state

## 1.6 Summary

> In our opinion, reinforcement learning is the first field to seriously address the computational issues that arise when learning from interaction with an environment in order to achieve long-term goals. (13)

* Model-free methods can have advantages when real bottleneck in solving a problem is difficulty in constructing sufficiently accurate environment model (12)
* In hierarchical learning systems, RL can work simultaneously on several levels (12)
* Chapter 3: RL uses formal framework of Markov decision processes (13)
* Value functions are important for efficient search in the space of policies (13)

## 1.7 Early History of Reinforcement Learning

* Bellman et al (1950s): The class of methods for solving optimal control problems by solving an "optimal return function" (value function) is known as **dynamic programming** (14)
* Dynamic programming widely considered only feasible way of solving general stochastic optimal control problems; far more efficient than any other general method at dealing with the "curse of dimensionality" (14)
* **Thorndike**'s (1911) **Law of Effect**:

> Of several responses made to the same situation, those which are accompanied or closely followed by satisfaction to the animal will, other things being equal, be more firmly connected with the situation, so that, when it recurs, they will be more likely to recur; those which are accompanied or closely followed by discomfort to the animal will, other things being equal, have their connections with that situation weakened, so that, when it recurs, they will be less likely to occur. The greater the satisfaction or discomfort, the greater the strengthening or weakening of the bond. (15)

* **B.F. Skinner**'s influential experimental methods (16)
* **Pavlov** (1927) descrived reinforcement as strengthening of pattern of behavior due to animal receiving a stimulus (reinforcer) in appropriate temporal relationship with another stimulus or with a response (16)
* **Alan Turing**'s (1948) artificial "pleasure-pain system" (16)
* **Marvin Minsky**'s (1954) Ph.D. thesis on SNARCs - Stochastic Neural-Analog Reinforcement Calculators (16)
* Minsky's "Steps Toward Artificial Intelligence" (1961) outlined many problems, including the **basic credit-assignment problem** for complex reinforcement learning systems: how do you distribute credit for success among the many decisions that may have been involved in producing it? (17)
* Methods for solving non-associative, purely selectional learning problem known as **k-armed bandit**
* **John Holland** (1975) outlined general theory of adaptive systems, classifier systems (true RL systems) including the "bucket-brigade algorithm" (for credit assignment), and genetic algorithms
* **Harry Klopf** (1972) recognized limits of focusing exclusively on supervised learning, and revived trial-and-error thread of RL (19)
* Origins of temporal-difference learning in part animal learning psychology, especially **secondary reinforces**, which are stimulus paired with primary reinforcer and starts to take on similar reinforcing properties (20)
* **Claude Shannon** (1950) suggested a computer can use evaluation function to play chess, improving the function online (20)
* Authors (1981) developed **actor-critic architecture**, temporal-difference learning combined with trial-and-error learning (21)
