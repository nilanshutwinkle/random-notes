## Chapter 1: Introduction

* **Reinforcement learning** is much more focused on goal-directed learning from interaction than other machine learning approaches (1)

### 1.1 Reinforcement Learning
* Reinforcement learning is learning what to do to maximize a numerical reward signal (1)
* **Trial-and-error search** and **delayed reward** are the two most important distinguishing features of reinforcement learning (2)
* Markov decision processes are intended to include sensation, action, and goal in their simplest possible forms without trivializing any of them (2)
* **Supervised** and **unsupervised learning** do not exhaustively cover machine learning (2)
  - Unsupervised learning is about finding structure hidden in collections of unlabeled data
  - Reinforcement learning is trying to maximize a reward signal instead of finding a hidden structure
* Trade-off between exploration and exploitation has been studied intensively by mathematicians for many decades, yet remains unsolved (3)
* Reinforcement learning considers the *whole* problem of a goal-directed agent interacting with an uncertain environment; starts with a complete, interactive, goal-seeking agent (3)
* The ability of some RL methods to learn with parameterized approximators addresses the classical **curse of dimensionality** (4)

### 1.2 Examples

### 1.3 Elements of Reinforcement Learning

* Four main subelements of a reinforcement learning system: :star: (6-7)
  - **policy**: mapping from perceived states of the environment to actions to be taken; may be stochastic
  - **reward signal**: primary basis for altering the policy; immediate, intrinsic desirability of environmental states
  - **value function**: the long-term desirability of states
  - **model of the environment**: (optional) allows inference on how environment will behave
* Seek actions that bring about states of highest value, not highest reward :star: (6)
* Most important component of almost all RL algorithms we consider is a method for efficiently estimating values (7)
* **Model-based methods** use models and planning; **model-free methods** are simpler and are trial-and-error learners (7)

### 1.4 Limitations and Scope

* Most of RL methods in book are structured around estimating value functions, though not strictly necessary for solving RL problems (7)
* **Evolutionary methods** create random variations of policies, and those with most reward are carried across to next generation of policies (7)
* Evolutionary methods ignore much of useful structure of RL problems that enable efficient search, such as policy, states, actions; hence not especially well suited to RL problems (8)

### 1.5 An Extended Example: Tic-Tac-Toe

* **Greedy actions**: select action with greatest value; as opposed to exploratory actions (9)
* **Back up**: after taking greedy move, current value of earlier exploratory state is updated to be closer to value of this later state (9)
* **Temporal-difference learning** involve updating estimates based on difference between estimates at two successive states: (9)

  ![Equation for back up](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Cbg_white%20V%28S_%7Bt%7D%29%20%5Cleftarrow%20V%28S_%7Bt%7D%29%20&plus;%20%5Calpha%20%5BV%28S_%7Bt&plus;1%7D%29%20-%20V%28S_%7Bt%7D%29%5D)

  Where:
  - ![alpha](https://latex.codecogs.com/svg.latex?%5Cbg_white%20%5Calpha) is small positive fraction called **step-size parameter**
  - ![S_t](https://latex.codecogs.com/svg.latex?%5Cbg_white%20S_%7Bt%7D) is state prior to greedy move
  - ![S_t+1](https://latex.codecogs.com/svg.latex?%5Cbg_white%20S_%7Bt&plus;1%7D) is state after greedy move
  - ![V(S_t)](https://latex.codecogs.com/svg.latex?%5Cbg_white%20V%28S_%7Bt&plus;1%7D%29) is value function applied to particular state

### 1.6 Summary

> In our opinion, reinforcement learning is the first field to seriously address the computational issues that arise when learning from interaction with an environment in order to achieve long-term goals. (13)

* Model-free methods can have advantages when real bottleneck in solving a problem is difficulty in constructing sufficiently accurate environment model (12)
* In hierarchical learning systems, RL can work simultaneously on several levels (12)
* Chapter 3: RL uses formal framework of Markov decision processes (13)
* Value functions are important for efficient search in the space of policies (13)

### 1.7 Early History of Reinforcement Learning

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

# Part I: Tabular Solution Methods

## Chapter 2: Multi-armed Bandits

* Most important distinguishing feature of RL: uses training information that evaluates action rather than instructing them by providing correct actions :star: (25)
* When learning does not involve more than one situation, called **nonassociative** (25)

### 2.1 A *k*-armed Bandit Problem

* **k-armed bandit problem**: faced repeatedly with choice among *k* different actions. After each choice, receive numerical reward chosen from stationary probability distribution depending on selected action. Objective is to maximize expected total reward over some number of **time steps** (25-6)
* We don't know the action values with certainty, though we may have estimates (26)
* **greedy actions** are actions at any time step that have greatest estimated value; if you select this action, you are **exploiting** your current knowledge (26)
* If you select **nongreedy action**, you are **exploring** (26)

Value | Definition | Description
----- | ---------- | -----------
![A_t](https://latex.codecogs.com/svg.latex?%5Cbg_white%20A_%7Bt%7D) | - | action at time step *t*
![R_t](https://latex.codecogs.com/svg.latex?%5Cbg_white%20R_%7Bt%7D) | - | Reward based on action at time step *t*
![q_*(a)](https://latex.codecogs.com/svg.latex?%5Cbg_white%20q_%7B*%7D%28a%29) | ![Expected value of R_t given A_t = a](https://latex.codecogs.com/svg.latex?%5Cbg_white%20E%5BR_%7Bt%7D%20%7C%20A_%7Bt%7D%3Da%5D) | Value of arbitrary action *a*
![Q_t(a)](https://latex.codecogs.com/svg.latex?%5Cbg_white%20Q_%7Bt%7D%28a%29) | - | Estimated value of action *a* at time step *t*

### 2.2 Action-value Methods

* **action-value methods** are methods for estimating the values of actions for purposes of making action selection decisions (27)
* **sample-average method** (27):

  ![Definition of sample-average method](https://latex.codecogs.com/svg.latex?%5Cbg_white%20Q_%7Bt%7D%28a%29%20%5Cdoteq%20%5Cfrac%7B%20%5Csum_%7Bi%3D1%7D%5E%7Bt-1%7D%20R_%7Bi%7D%20%5Ccdot%201_%7BA_%7Bi%7D%3Da%7D%20%7D%7B%20%5Csum_%7Bi%3D1%7D%5E%7Bt-1%7D%201_%7BA_%7Bi%7D%3Da%7D%20%7D)

  Where ![1_predicate](https://latex.codecogs.com/svg.latex?%5Cbg_white%201_%7BA_%7Bi%7D%3Da%7D) denotes value of 1 when predicate is true
* Simplest action selection rule is the greedy action selection (27): ![Argmax of estimated value](https://latex.codecogs.com/svg.latex?%5Cbg_white%20A_%7Bt%7D%20%5Cdoteq%5Cunderset%7Ba%7D%7Bargmax%7D%20Q_%7Bt%7D%28a%29)
* Alternative is to be greedy most of time, but with small probability &#949; select randomly among all actions with equal probability, known as **&#949;-greedy methods** (28)

### 2.3 The 10-armed Testbed

* Low &#949; values improve more slowly, but eventually outperforms larger &#949; values; possible to reduce &#949; over time to get better performance (30)
* **Nonstationarity** means that true values of actions change over time; this is most common case encountered in RL (30)

### 2.4 Incremental Implementation

* Non-incremental formula for estimating value requires unbounded memory and additional computation (31):

  ![Non-incremental formula for sample average method](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Cbg_white%20Q_%7Bn%7D%20%5Cdoteq%20%5Cfrac%7B%20R_%7B1%7D%20&plus;%20R_%7B2%7D%20&plus;%20...%20&plus;%20R_%7Bn-1%7D%20%7D%7B%20n%20-%201%20%7D)

* **Incremental formula** use constant memory and per-time-step computation (30-1):

  ![Incremental formula for sample average method](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Cbg_white%20Q_%7Bn&plus;1%7D%20%3D%20Q_%7Bn%7D%20&plus;%20%5Cfrac%7B%201%20%7D%7B%20n%20%7D%20%5BR_%7Bn%7D%20-%20Q_%7Bn%7D%5D)

* This general form of an **update rule** will occur many times in this book (31):

  ![General form of update rule](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Cbg_white%20NewEstimate%20%5Cleftarrow%20OldEstimate%20&plus;%20StepSize%20%5B%20Target%20-%20OldEstimate%20%5D)

  Where `[Target - OldEstimate]` is the **error** of the estimate

### 2.5 Tracking a Nonstationary Problem
