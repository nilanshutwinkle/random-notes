# Chapter 1: Introduction

* **Reinforcement learning** is much more focused on goal-directed learning from interaction than other machine learning approaches (1)
* Reinforcement learning is learning what to do to maximize a numerical reward signal (1)
* **Trial-and-error search** and **delayed reward** are the two most important distinguishing features of reinforcement learning (2)
* Markov decision processes are intended to include sensation, action, and goal in their simplest possible forms without trivializing any of them (2)
* **Supervised** and **unsupervised learning** do not exhaustively cover machine learning (2)
  - Unsupervised learning is about finding structure hidden in collections of unlabeled data
  - Reinforcement learning is trying to maximize a reward signal instead of finding a hidden structure
* Trade-off between exploration and exploitation has been studied intensively by mathematicians for many decades, yet remains unsolved (3)
* Reinforcement learning considers the *whole* problem of a goal-directed agent interacting with an uncertain environment; starts with a complete, interactive, goal-seeking agent (3)
* The ability of some RL methods to learn with parameterized approximators addresses the classical **curse of dimensionality** (4)
* Four main subelements of a reinforcement learning system: :star: (6-7)
  - **policy**: mapping from perceived states of the environment to actions to be taken; may be stochastic
  - **reward signal**: primary basis for altering the policy; immediate, intrinsic desirability of environmental states
  - **value function**: the long-term desirability of states
  - **model of the environment**: (optional) allows inference on how environment will behave
* Seek actions that bring about states of highest value, not highest reward :star: (6)
* Most important component of almost all RL algorithms we consider is a method for efficiently estimating values (7)
* **Model-based methods** use models and planning; **model-free methods** are simpler and are trial-and-error learners (7)
* Most of RL methods in book are structured around estimating value functions, though not strictly necessary for solving RL problems (7)
* **Evolutionary methods** create random variations of policies, and those with most reward are carried across to next generation of policies (7)
* Evolutionary methods ignore much of useful structure of RL problems that enable efficient search, such as policy, states, actions; hence not especially well suited to RL problems (8)
* **Greedy actions**: select action with greatest value; as opposed to exploratory actions (9)
* **Back up**: after taking greedy move, current value of earlier exploratory state is updated to be closer to value of this later state (9)
* **Temporal-difference learning**: (9)

  ![Equation for back up](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Cbg_white%20V%28S_%7Bt%7D%29%20%5Cleftarrow%20V%28S_%7Bt%7D%29%20&plus;%20%5Calpha%20%5BV%28S_%7Bt&plus;1%7D%29%20-%20V%28S_%7Bt%7D%29%5D)

* Where:
  - ![alpha](https://latex.codecogs.com/svg.latex?%5Cbg_white%20%5Calpha) is small positive fraction called **step-size parameter**
  - ![S_t](https://latex.codecogs.com/svg.latex?%5Cbg_white%20S_%7Bt%7D) is state prior to greedy move
  - ![S_t+1](https://latex.codecogs.com/svg.latex?%5Cbg_white%20S_%7Bt&plus;1%7D) is state after greedy move
  - ![V(S_t)](https://latex.codecogs.com/svg.latex?%5Cbg_white%20V%28S_%7Bt&plus;1%7D%29) is value function applied to particular state
