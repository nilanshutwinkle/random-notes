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
![A_t](https://latex.codecogs.com/svg.latex?%5Cbg_white%20A_%7Bt%7D) | - | action at time step *t*
![R_t](https://latex.codecogs.com/svg.latex?%5Cbg_white%20R_%7Bt%7D) | - | Reward based on action at time step *t*
![q_*(a)](https://latex.codecogs.com/svg.latex?%5Cbg_white%20q_%7B*%7D%28a%29) | ![Expected value of R_t given A_t = a](https://latex.codecogs.com/svg.latex?%5Cbg_white%20E%5BR_%7Bt%7D%20%7C%20A_%7Bt%7D%3Da%5D) | Value of arbitrary action *a*
![Q_t(a)](https://latex.codecogs.com/svg.latex?%5Cbg_white%20Q_%7Bt%7D%28a%29) | - | Estimated value of action *a* at time step *t*

## 2.2 Action-value Methods

* **action-value methods** are methods for estimating the values of actions for purposes of making action selection decisions (27)
* **sample-average method** (27):

  ![Definition of sample-average method](https://latex.codecogs.com/svg.latex?%5Cbg_white%20Q_%7Bt%7D%28a%29%20%5Cdoteq%20%5Cfrac%7B%20%5Csum_%7Bi%3D1%7D%5E%7Bt-1%7D%20R_%7Bi%7D%20%5Ccdot%201_%7BA_%7Bi%7D%3Da%7D%20%7D%7B%20%5Csum_%7Bi%3D1%7D%5E%7Bt-1%7D%201_%7BA_%7Bi%7D%3Da%7D%20%7D)

  Where ![1_predicate](https://latex.codecogs.com/svg.latex?%5Cbg_white%201_%7BA_%7Bi%7D%3Da%7D) denotes value of 1 when predicate is true
* Simplest action selection rule is the greedy action selection (27): ![Argmax of estimated value](https://latex.codecogs.com/svg.latex?%5Cbg_white%20A_%7Bt%7D%20%5Cdoteq%5Cunderset%7Ba%7D%7Bargmax%7D%20Q_%7Bt%7D%28a%29)
* Alternative is to be greedy most of time, but with small probability &#949; select randomly among all actions with equal probability, known as **&#949;-greedy methods** (28)

## 2.3 The 10-armed Testbed

* Low &#949; values improve more slowly, but eventually outperforms larger &#949; values; possible to reduce &#949; over time to get better performance (30)
* **Nonstationarity** means that true values of actions change over time; this is most common case encountered in RL (30)

## 2.4 Incremental Implementation

* Non-incremental formula for estimating value requires unbounded memory and additional computation (31):

  ![Non-incremental formula for sample average method](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Cbg_white%20Q_%7Bn%7D%20%5Cdoteq%20%5Cfrac%7B%20R_%7B1%7D%20&plus;%20R_%7B2%7D%20&plus;%20...%20&plus;%20R_%7Bn-1%7D%20%7D%7B%20n%20-%201%20%7D)

* **Incremental formula** use constant memory and per-time-step computation (30-1):

  ![Incremental formula for sample average method](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Cbg_white%20Q_%7Bn&plus;1%7D%20%3D%20Q_%7Bn%7D%20&plus;%20%5Cfrac%7B%201%20%7D%7B%20n%20%7D%20%5BR_%7Bn%7D%20-%20Q_%7Bn%7D%5D)

* This general form of an **update rule** will occur many times in this book (31):

  ![General form of update rule](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Cbg_white%20NewEstimate%20%5Cleftarrow%20OldEstimate%20&plus;%20StepSize%20%5B%20Target%20-%20OldEstimate%20%5D)

  Where `[Target - OldEstimate]` is the **error** of the estimate

## 2.5 Tracking a Nonstationary Problem
