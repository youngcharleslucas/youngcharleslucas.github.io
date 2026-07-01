+++
title = "Database fundamental notes"
date = 2026-02-01
draft = true
tags = ["db"]
+++

https://www.youtube.com/watch?v=oYxTTirKY8M
https://www.youtube.com/watch?v=vRYBG_R8JAI
https://www.youtube.com/watch?v=I7_WXKhyGms

### Glossary   

**Dynamically-typed language**: like JavaScript, where the interpreter 
assigns variables a type at runtime based on the variable's value at 
the time. Like in Python, variables are not bound to a specific type 
at declaration. A single variable can hold data of **different types** 
throughout its lifetime.   

**Statically-typed langauge**: like Java, C, or C++, where variable types 
are known at compile time.  

**Compiler**: Translates the **entire** source code program into machine 
code all at once, *before* execution. It saves this translation as a 
standalone file (like an `.exe` file on Windows)  

**Interpreter**: Translates **and executes** the source code line-by-line 
(or statement-by-statement) at runtime. **No separate machine code file is created**.  

**Just-In-Time (JIT) Compilation**: Traditional JavaScript used to be an 
interpreted language. Modern JavaScript engines (like Chrome's V8 or 
Firefox's SpiderMonkey) no longer rely on simple line-by-line 
interpretation. JIT Compilation is a hybrid approach of compilation 
and interpretation.
- Parsing: the engine reads the source code and turns it into a data 
  structure called an Abstract Syntax Tree  
- Interpretation: An interpreter quickly takes that AST and generates 
  unoptimized bytecode so the program can start running immediately.  
- Profiling: While the code runs, a profiler monitors it to see which 
  pieces of code are run freqeuntly (these are called 'hot spots')  
- JIT Compilation: The engine passes thos "hot" chunks of code to a 
  compiler, which translates them directly into higly optimized machine 
  code on the fly. The engine then swaps out the slow interpreted code 
  for this lightning-fase machine code.  

**Ahead-of-time (AOT) Compiler**:  


**Intermediate Representations and Virtual Machines**: Like Java, C#, Scala,
these languages don't generate an .exe file. It produces **byte code** in 
.class files. These files are an intermediate language that run on a 
virtual machine. This makes the language portable and platform independent. 
The os needs the JVM for Java or .NET CLR VM for C#. The Run Time step 
includes execution of the VM. Inside the VM, a JIT Compiler and interpreter 
translate the byte code into machine code. The JIT Compiler's feature of 
compiling "hot spots" greatly increases performance.  

**REPL**: Read-Evaluate-Print-Loop, interactive programming environment 
that takes single user inputs, executes them, and returns the results. 
The user can type a single line of code and see what happens instantly.  
 
**Turing Completeness**: a system or language can compute any logically 
possible problem. If gien enough time and memory, it can simulate any modern 
computer. A system typically needs: conditional branching, arbitrary repitition 
(while or for loops), data storage.  


**Monads**: in functional programming (like Haskell), it is a design pattern 
used to chain operations and manage side effects (like null values, async 
requests, or state changes) while keeping functions pure. It acts as a 
wrapper, or "context", around a value and provies a standardized way to 
apply functions to it. It helps Haskell deal with problems of side effects 
at compile time instead of runtime.   

---
**Higher-kinded polymorphism**: is the ability of a programming language to abstract 
over generic types themselves, not just concrete types. 
It allows you to write functions or data structures that accept a generic type 
constructor (like List, Maybe, or Future) as a parameter, without needing to know 
which specific container is being used.  

### The Three Levels of Abstraction
#### 1. No Polymorphism (Concrete Types) 
Functions work on exactly one specific type. 

* Example: A function that only squares an Int or appends a String.

#### 2. Parametric Polymorphism (Standard Generics)
Functions or structures abstract over a concrete type (like Int, String, or a custom class). 

* Example: `List[T]`. The List is a type constructor. It waits for you to give it a concrete type T (like Int) to produce a final, real type (List[Int]).
* The Limitation: You cannot write a function that abstracts over the List part itself. [14, 15, 16] 

#### 3. Higher-Kinded Polymorphism (Generics over Generics) [17] 
You abstract over the container type constructor itself, usually represented as a variable like F[_] or F<T>. 

* Example: You want to write a function that works for any container F that supports a .map() function (a Functor). It shouldn't matter if F is a List, an Option, or a Future. 

#### A Conceptual Example (Scala)
Scala is one of the few mainstream languages that natively supports higher-kinded types. Here is how you define a generic interface (Trait) that abstracts over the container type F: 
```
// F[_] means F is a type constructor that expects a type parametertrait Mapper[F[_]] {
  def map[A, B](container: F[A])(f: A => B): F[B]
}

Because of higher-kinded polymorphism, you can implement this interface once for a List and once for an Option: [22, 23] 

// Implementation for Listobject ListMapper extends Mapper[List] {
  def map[A, B](container: List[A])(f: A => B): List[B] = container.map(f)
}
// Implementation for Optionobject OptionMapper extends Mapper[Option] {
  def map[A, B](container: Option[A])(f: A => B): Option[B] = container.map(f)
}
```

#### Why Do We Need It?
Without higher-kinded polymorphism, you suffer from massive code duplication. 
If you want to write a utility function like combineSequences that unzips and zips data, you would have to write one version for List, a completely identical version for Array, and another identical version for Option. Higher-kinded polymorphism allows you to write that logic exactly once for any container F that qualifies. It is the fundamental machinery behind functional programming abstractions like Monads, Functors, and Applicatives. 
#### Language Support

* Native Support: Haskell (via Typeclasses), Scala (via Type Constructors), OCaml.
* Emulated/Workarounds: TypeScript (using lightweight higher-kinded type tricks), Rust (via Generic Associated Types or GATs), C++ (via template-template parameters).
* No Support: Java, C#, Go. These languages allow standard generics (List<T>), but you cannot pass List by itself as a generic parameter. 

---


### Transactions -> ACID  

- **Atomicity** All changes to data are performed as if they are a single 
  operation. That is, all the changes are performed, or none of them are.

  For example, in an application that transfers funds from one account to 
  another, the atomicity property ensures that, if a debit is made successfully 
  from one account, the corresponding credit is made to the other account.

- **Consistency** Data is in a consistent state when a transaction starts and 
  when it ends.

  For example, in an application that transfers funds from one account to 
  another, the consistency property ensures that the total value of funds in 
  both the accounts is the same at the start and end of each transaction.

- **Isolation** The intermediate state of a transaction is invisible to other 
  transactions. As a result, transactions that run concurrently appear to be 
  serialized.

  For example, in an application that transfers funds from one account to 
  another, the isolation property ensures that another transaction sees the 
  transferred funds in one account or the other, but not in both, nor in neither.

- **Durability** After a transaction successfully completes, changes to data 
  persist and are not undone, even in the event of a system failure.

  For example, in an application that transfers funds from one account to 
  another, the durability property ensures that the changes that are made to 
  each account will not be reversed.

ref: [IBM](https://www.ibm.com/docs/en/cics-tx/11.1.0?topic=processing-acid-properties-transactions)


### NoSQL  

- Document Stores  
- Wide-Column Stores 
- Key-value Stores  
- Graph  

### 7 Strategies for Load Balancers  




