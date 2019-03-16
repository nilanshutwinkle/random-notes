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
