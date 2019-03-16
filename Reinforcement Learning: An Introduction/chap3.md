# Chapter 3: Finite Markov Decision Processes
* MDPs are a classical formalization of sequential decision making, where actions influence not just immediate rewards, but also subsequent states (47)
* MDPs involve delayed reward and the need to tradeoff immediate and delayed reward (47)
* As in all of artificial intelligence, there is a tension between breadth of applicability and mathematical tractability (47)

## 3.1 The Agent-Environment Interface
* MDPs are meant to be straightforward framing of the problem of learning from interaction to achieve a goal (47)
* **Agent**: the learner and decision maker (47)
* **Environment**: everything the agent interacts with (47)
* The agent and environment interact at each of a sequence of discrete time steps; at each time step `t`, the agent receives some representation of the environment's state, ![S_t](chap3/1.svg), and on that basis selects an action, ![A_t](chap3/2.svg). One time step later, the agent receives a numerical reward, ![R_t+1](chap3/3.svg), and finds itself in a new state, ![S_t+1](chap3/4.svg).
* **Finite MDP**: sets of states (`S`), actions (`A`), rewards (`R`) all have a finite number of elements. The random variables for current reward and current state have well defined discrete probability distributions dependent only on the preceding state and action (48-9):

  ![definition of probability](chap3/5.svg)

  ![p as a probability distribution](chap3/6.svg)

  These probabilities only depend on preceding state and action, ![S_t-1](chap3/7.svg) and ![A_t-1](chap3/8.svg)
* **Markov property**: state must include information about all aspects of the paste agent-environment interaction that makes a difference for the future (49)
* **State-transition probabilities** (49):

  ![State-transition probability formula](chap3/9.svg)

* **Expected reward** (49):

  ![Expected reward formula](chap3/10.svg)

  ![Expected reward formula](chap3/11.svg)

* Boundary between agent and environment typically not the same as physical boundary of robot's or animal's body; anything that cannot be changed arbitrarily by the agent is considered to be outside of it and thus part of its environment. (50)
* Any problem of learning goal-directed behavior can be reduced to three signals passing back and forth between an agent and its environment: actions, states, rewards (50)
* **Bioreactor**: large vat of nutrients and bacteria used to produce useful chemicals (51)
* State is a vector, each action is a vector, rewards are scalars (51)
* **Transition graph**: each state is a node, each action an arrow with a probability (52-3)

## 3.2 Goals and Rewards

* **Reward hypothesis**: all we mean by goals and purposes can be thought of as maximization of expected value of cumulative sum of received rewards
* Don't reward subgoals; if achieving of subgoals is rewarded, agent might find way to achieve subgoals without achieving goal. Reward signal is how you communication _what_ you want to achieve, not _how_. (54)

## 3.3 Returns and Episodes

* **Expected return**, ![G_t](chap3/12.svg), for **episodic tasks**:

  ![Expected return formula](chap3/13.svg)

  ![R_T](chap3/14.svg) only makes sense when agent-environment interactions break into sequences, called **episodes**, where each episode ends in a **terminal state**.

* **Continuing tasks**: when agent-environment interaction does not break naturally into identifiable episodes, but goes on continually without limit. (54)
* **Discounting**: when determining **present value** of future rewards (55):

  ![Discounted return formula](chap3/15.svg)

  Where ![gamma](chap3/16.svg) is the **discount rate** and ![0 <= gamma <= 1](chap3/17.svg).

* If ![gamma = 0](chap3/18.svg), the agent is **myopic**; it only cares about maximizing immediate rewards. (55)

## 3.4 Unified Notation for Episodic and Continuing Tasks

* **Absorbing state** transitions only to itself and generates a reward of zero (57)

* If we only sum over finite number `T` of rewards (57):

  ![Expected return formula for finite sequence of tasks](chap3/19.svg)

## 3.5 Policies and Value Functions

* Almost all reinforcement learning algorithms involve estimating **value functions** &mdash; functions of states or state-action pairs that estimate how good it is for the agent to be in that state.(58)
* **Policy**: mapping from states to probabilities of selecting each possible action. (58)
* If agent is following policy &pi; at time _t_, then &pi;(a|s) is the probability that ![A_t = a](chap3/20.svg) if ![S_t = s](chap3/21.svg). (58)
* A **value function** takes a state or state-action pair for policy &pi; and returns the expected return. (58)
* The **state-value function for policy &pi;** (58):

  ![State-value function for policy pi](chap3/22.svg)

* The **action-value function for policy &pi;** (58):

  ![State-value function for policy pi](chap3/23.svg)

* The above value functions can be estimated from experience; **Monte Carlo methods** track separate average returns for states and actions across many random samples. However, if very many states, may not be practical to keep separate averages for each state individually; agent would need to maintain ![v_pi](chap3/24.svg) and ![q_pi](chap3/25.svg) as parameterized functions and adjust parameters to better match observed returns. (58-9)
* The **Bellman equation** expresses a relationship between the value of a state and the values of successor states; it is recursive (59):

  ![Bellman equaition for v_pi](chap3/26.svg)

  It's a fundamental property of value functions used throughout reinforcement learning and dynamic programming that they satisfy recursive relationships like this.

* **Backup diagrams**: graph diagrams showing how operations trasfer value information *back* to a state from successor states (59-60)
* Example: Gridworld  (60-61)
* Example: Golf (61-62)

## 3.6 Optimal Policies and Optimal Value Functions

* Solving a reinforcement learning task means finding a policy that achieves a lot of reward over the long run. (62)
* The **optimal policy**, ![pi_*](chap3/27.svg), is the one or more policies that are better than or equal to all other policies. (62)
* **Optimal state-value function** (62):

  ![Optimal state-value function](chap3/28.svg)

* **Optimal action-value function** (63):

  ![Optimal action-value function](chap3/29.svg)

* Example: optimal value functions for golf (63-65)
* **Bellman optimality equation** (63-64):

  ![Bellman optimality equation](chap3/30.svg)

  This is actually a system of equations, one for each state. Can solve this system of equations using any one of variety of methods for solving systems of nonlinear equations.
* Any policy that is greedy with respect to the optimal evaluation function ![v_*](chap3/31.svg) is an optimal policy. (64)
* Example: solving Gridworld (65)
* Example: Bellman Optimality equations for the recycling robot (65)
* Explicitly solving Bellman optimality equation is one route to finding an optimal policy, and thus solving the reinforcement learning problem. It's akin to an exhaustive search, and depends on three assumptions that are rarely true in practice: (66)

    1. We accurately know the dynamics of the environment
    1. We have enough computational resources to complete the computation of the solution
    1. Markov property

* In reinforcement learning, one typically has to settle for approximate solutions. (66)


## 3.7 Optimality and Approximation


## 3.8 Summary
