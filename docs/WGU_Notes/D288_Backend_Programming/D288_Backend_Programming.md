# D288 Backend Programming  

# Unit Testing  
  
1) Explain what unit testing is.  

Testing the lowest level compoenents of an application. 
Unit and Integration testing.   
Can perform performance testing.  
Can perform functional testing.  
Final step is User Acceptance Testing.  

2) Differentiate between black box and glass box testing.  

**Black box** testing tests only the functionality of a particular component without knowing anything about how the component
is implemented.  
**Glass box** or white box, testing does take the implementation of a component into acount. The tests are designed so that each code path through teh compoenent is ecercised.  

3) Differentiate between stateful and stateless components.  

**Stateless**: code that has no state, causes no side effects.  IF you put the same inputs into this code, it will always produce the same result.  

**Stateful**: identical inputs might be different depending on what happened previously.   

Stateful code may need to be tested in a specific order, while stateless code can be tested in any order.  

4) Describe test-driven development. Trace the process of Red/Green/Refactor. 

**Test-Driven Developement**: unit tests for a component are written before the componenet is implemented. All tests start out failing. 
- Known as **Red/Green/Refactor**. All tests start red, turn green, then the developer is free to refactor the code to make it more concise or efficient.  
 
5) n/a
6) Explain the usage of test stubs.

**Test stubs** allow us to simulate some components of the system to make the testing of other components easier. For example, when testing the business logic in our Service Layer, we will stub out both the ClassRosterDao and the ClassRosterAuditDao components. It is not necessary for the DAOs to actually read from and write to files when testing the Service Layer so we'll replace the File Implementations with Stub Implementations containing canned data.

7) Use JUnit to create, run, and document unit tests.
8) Explain how the arrange, act, assert approach to unit testing works.