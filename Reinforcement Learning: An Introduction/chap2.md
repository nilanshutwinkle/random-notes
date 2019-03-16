# Chapter 2: Multi-armed Bandits

* Most important distinguishing feature of RL: uses training information that evaluates action rather than instructing them by providing correct actions :star: (25)
* When learning does not involve more than one situation, called **nonassociative** (25)

## 2.1 A *k*-armed Bandit Problem

* **k-armed bandit problem**: faced repeatedly with choice among *k* different actions. After each choice, receive numerical reward chosen from stationary probability distribution depending on selected action. Objective is to maximize expected total reward over some number of **time steps** (25-6)
* We don't know the action values with certainty, though we may have estimates (26)
* **greedy actions** are actions at any time step that have greatest estimated value; if you select this action, you are **exploiting** your current knowledge (26)
* If you select **nongreedy action**, you are **exploring** (26)

Value | Definition | Description
----- | ---------- | -----------
![A_t](chap2/1.svg) | - | action at time step *t*
![R_t](chap2/2.svg) | - | Reward based on action at time step *t*
![q_*(a)](chap2/3.svg) | ![Expected value of R_t given A_t = a](chap2/4.svg) | Value of arbitrary action *a*
![Q_t(a)](chap2/5.svg) | - | Estimated value of action *a* at time step *t*

## 2.2 Action-value Methods

* **action-value methods** are methods for estimating the values of actions for purposes of making action selection decisions (27)
* **sample-average method** (27):

  ![Definition of sample-average method](chap2/6.svg)

  Where ![1_predicate](chap2/7.svg) denotes value of 1 when predicate is true
* Simplest action selection rule is the greedy action selection (27): ![Argmax of estimated value](chap2/8.svg)
* Alternative is to be greedy most of time, but with small probability &epsilon; select randomly among all actions with equal probability, known as **&epsilon;-greedy methods** (28)

## 2.3 The 10-armed Testbed

* Low &#949; values improve more slowly, but eventually outperforms larger &#949; values; possible to reduce &#949; over time to get better performance (30)
* **Nonstationarity** means that true values of actions change over time; this is most common case encountered in RL (30)

## 2.4 Incremental Implementation

* Non-incremental formula for estimating value requires unbounded memory and additional computation (31):

  ![Non-incremental formula for sample average method](chap2/9.svg)

* **Incremental formula** use constant memory and per-time-step computation (30-1):

  ![Incremental formula for sample average method](chap2/10.svg)

* This general form of an **update rule** will occur many times in this book (31):

  ![General form of update rule](chap2/11.svg)

  Where `[Target - OldEstimate]` is the **error** of the estimate

## 2.5 Tracking a Nonstationary Problem

* In cases of nonstationarity, makes sense to give more weight to recent awards (32)
* Using a constant step-size parameter effectively gives more weight to recent awards (32):

  ![Constant step-size formula](chap2/12.svg)

  Where ![alpha is between 0 and 1](chap2/13.svg). The weight decays exponentially on `1 - alpha`. (See p. 32 for derivation.)

## 2.6 Optimistic Initial Values

* So far, all methods are **biased** by their initial estimates; for sample-average method, goes away once every action selected, but anything with constant &alpha; has a permanent bias (34)
* Setting initial values to be wildly optimistic is called **optimistic initial values**; this forces exploration, which performs worse initially but performs better in long run as exploration decreases (34)
* It's possible to avoid bias of constant step sizes for working with nonstationary problems (35)

## 2.7 Upper-Confidence-Bound Action Selection

* The **upper confidence bound** (**UCB**) action selection helps with exploration by measuring uncertainty (35-6):

  ![UCB formula](chap2/14.svg)

  Where ![square root portion of equation](chap2/15.svg) is a measure of uncertainty.

## 2.8 Gradient Bandit Algorithms

Value | Definition | Description
----- | ---------- | -----------
![H_t(a)](chap2/16.svg) | - | Numerical preference for action _a_
![pi_t(a)](chap2/17.svg) | ![soft-max formula of preferences for actions](chap2/18.svg) | Probability of taking action _a_ at time _t_

* Gradient bandit algorithms estimate action preferences, not action values (42)
* **Soft-max distribution** (i.e., Gibbs or Boltmaxx distribution) converts values to a distribution of probabilities (37)

## 2.9 Associative Search (Contextual Bandits)

* So far, only considered nonassociative tasks, in which no need to associate different actions with different situations (41)
* **Contextual bandits** are bandits with **associative search task**. This represents an intermediate between the _k_-armed bandit problem and the full reinforcement learning problem (41)
* In next chapter, actions are allowed to affect the next situation as well as reward: this is the point where we have full reinforcement learning problem (41)

## 2.10 Summary

* **Learning curve** (29, 34, 36, 38, 42)
* **Parameter study** used to explore different algorithms with different parameters (42)
* There's a Bayesian approach to balancing exploration and exploitation in which select actions at each step according to their posterior probability of being the best action, which is called **posterior sampling** or **Thompson sampling** (43)
