## Docker  

### Parts  

- Docker Daemon - program that builds Docker Images and runs and distributes 
Docker Containers  
- Docker Image - templage for creating a Docker Container  
- Docker Container - running instance of an image, containing an application, a filesystem, and any configuration files or software needed  
- Docker Client - program that runs commands in a console, used to interact with the Docker Daemon  
- Dockerfile - file that contains instructions for building a Docker image  
- registry - stores Docker images  
	- A Docker image build on a ceveloper's computer cannot be used to create 
	containers on other computers without a registry. 
	- Docker Hub - popular registry where developers can create public or private 
	repositories that house Docker Images  


### Commands  
- `build` - Builds an image from a Dockerfile  
- `run` - Creates and runs an image in a container. The options `--name` 
names the container, and `-d` runs the container in the background  
- `stop` - Stops the running container  
- `ps` - Lists currently running containers or all containers with `-a` option  
- `rm` - removes a container  
- `images` - Lists images  
- `--help` - shows help information  
- Mapping the Docker Host port to your Container port: 
	- `docker run -p 27017:27017 -d mongo`  
- Viewing the docker images layer ids: 
	- `docker images -q --no-trunc` shows the list of full ids  
	- `docker images` shows the first 12 characters of the ids  
- `logs`  
	- Check the logs for a container with `docker logs containerId`  
	- So if a container fails to launch, you can check the logs for it's failure  
- Shell into a running Container
	- `docker exec -it <container name> bash`  
- Tail the console output of a running coker container  
	- `docker logs -f <container name>`  
- Share storage on the host system with a docker container  
	- `docker run -v <my host path>:<the container path> <image name>`
- Specify an environment variable for a docker container  
	- `docker run -e MY_VAR=my_prop <image name>`

#### Registry Commands  

- `login` - Logs the user into Docker Hub  
- `tag` - Create a target image tag that refers to a source image  
	- the full registry tag name is: registry.hub.docker.com/\[username?\]/\[repository\]:\[tag\]  
	- Ex: registry.hub.docker.com/mongo:latest  
- `push` - Copies an image to a repository  
- `pull` - Copies an image from a repository  

#### Housekeeping  

- Cleaning up a Container  
	- Kill all running containers: `docker kill $(docker ps -q)`  
	- Delete all Stopped Docker Containers: `docker rm $(docker ps -a -q)`  
- Cleaning up Images  
	- Remove a Docker Image: `docker rmi <image name>`  
	- Delete Untagged (dangling) Images: `docker rmi $(docker images -q -f dangling=ture)`  
	- Delete All Images: `docker rmi $(docker images -q)`  
- Cleaning up Volumes
	- Once a volume is no longer associated with a container, it is considered 'dangling'.  
	- Remove all dangling volumes:  
		- `docker volume rm $(docker volume ls -f dangling=true -q)`  
		- Does not remove files from host system in shared volumes.  
	

#### Commands for setting up CentOS image  

CentOS is the free version of RedHat. Enterprises may have you using RedHat for the support, so CentOS is a free way to practice.  

- `docker run -d centos`
	- Docker containers run until the last command. CentOS wasn't given a command 
	so when you run `docker ps`, you won't see anything, CentOS is not running.  
	- You can also check the log for CentOS's quick execution `docker logs <container name>`  
- Run CentOS with a never ending command so that it doesn't close  
	- `docker run -d cenos tail -f /dev/null`  
- Shell into the running CentOS container, using the container name  
	- get the container name `docker ps`  
	- `docker exec -it <container name> bash`  

#### Contents of a sample Dockerfile to install Java  

```Java

FROM centos  

RUN yum install -y java 
// the -y is for agreeing to prompts. Not agreeing will cause the container to crash  

VOLUME /tmp
// This designates a storage location for persistant memory  

ADD /spring-boot-web-0.0.1-SNAPSHOT.jar myapp.jar  
RUN sh -c 'touch /myapp.jar'  
// This just updates the date of the file
ENTRYPOINT ["java, "-Djava.security.egd=file:/dev/ ./urandom", "-jar", "/myapp.jar"]
// This helps TomCat run faster
```
- Build the Dockerfile  
	- `docker build -t <filename?> .`

- Run the installed docker container  
	- `docker run -d -p 8080:8080 spring-boot-docker`  

#### Use Apache Groovy for adding variables into Dockerfile??


Learn how you can use Docker to supercharge your enterprise Java Development!  
Video 49  


### Push container to Cloud  

---

These are notes from the WGU instructional video "Hows to Deploy A Docker Container on AWS and Azure"  

- The start of the video covers assigning the deployed port to a variable  
- A Docker file was already created  
- cd to the directory with the Dockerfile, enter the command: 
	- `docker build --tag <desiredTagName>`  
- Create a DockerHub account. You are allowed one private image in you free DockerHub account  
- You will have to create an access token for that one private image. This is done in DockerHub. (23:30)  
- To push the local image to DockerHub: (24:50)  
	- `docker tag <nameOfImage> <nameOfRepository>/<nameOfImage>`  
	- `docker push <nameOfRepository>/<nameOfImage>`  

#### Deoploying to AWS  

1. Log into AWS and set up an IAMs account 
	- Search IAM (30:00)
	- Select EC2 role from IAM dashboard
	- Use SSM permissions  	
2. Launch an EC2 Linux instance  
3. Start a session and install docker (37:30) 
4. Pull your instance from Docker hub and deploy it in a container (38:50)   

#### Deploy to Azure  

(44:20)
1. Log into Azure  
2. Set up a management environment  
3. Create a resource and choose Container App  
4. Fill out the form and deploy (choose port 8080)  

#### CORS  

Calling a third-party web API from the web browser requires a cross-origin HTTP request, since the web API is not hosted on the local website's web server. Two main techniques are used to make cross-origin requests:

- Cross-Origin Resource Sharing (CORS) is a W3C specification for how web browsers and web servers should communicate when making cross-origin requests.
- JSON with Padding (JSONP) is a technique to circumvent cross-origin restrictions by injecting <script> elements dynamically into a webpage. Script elements have no cross-origin restrictions.  
- CORS allows the browser to send GET, POST, PUT, and DELETE requests. JSONP limits the browser to sending only GET requests.  


#### Keeping the webpage up to date  

Keeping a website's user interface consistent or up-to-date when multiple users are accessing the same data is a significant challenge for developers. Two general solutions exist:

- Polling - The web browser sends periodic requests to the web server asking if the data has changed.
- Pushing - The web server pushes updates to all web browsers as soon as the data is changed on the web server.

Polling is typically implemented with Ajax, but can be problematic: The browser can become out of synch with the web server in the time between poll requests. Pushing keeps the browser and server better synchronized. Pushing is implemented with WebSockets or server-sent events (SSE).

### Multi Threading in Java  

The Java programming language is multithreaded, meaning that the program can run more than one thread (or process) simultaneously, thus maximizing the computer’s central processing unit (CPU).  
the threads are independent, which means that not only can multiple operations occur simultaneously but should one of those operations fail for whatever reason, the other threads are not affected.   

- A thread consists of:  
	- An instance of class ` java.lang.Thread`  
	- A thrad of execution  
- In Java, there is one thread per heap/call stack  
- When it comes to threads, very little is guaranteed  
- Calling `.start()` on a new thread will call a new stack  
- Then calling `.run()` will execute on that new stack. Leaving out `.start()` will just cause the method to execute on the current stack rather than start a new one.  

### Concurrency  

---  

DEFINE:  
1. Deadlock:  
2. Livelock:
3. Starvation:  
4. Race Condition:  

- The java.util.concurrent.atomic package enables multithreaded applications to safely access individual variables without locking    
- java.util.concurrent.locks package provides a locking framework that can be used to create locking behaviors that are the same or superior to those of Java’s synchronized keyword  

-The reason this implementation is now thread-safe is something called CAS. CAS stands for **Compare And Swap**. Most modern CPUs have a set of CAS instructions. Following is a basic outline of what is happening now:

	1. The value stored in count is copied to a temporary variable.

	2. The temporary variable is incremented.

	3. Compare the value currently in count with the original value. If it is unchanged, then swap the old value for the new value.  
	
#### Apply Atomic Variables and Locks (OCP Objective 10.3)  

- The java.util.concurrent.atomic package provides classes that are similar to volatile fields (changes to an atomic object’s value will be correctly read by other threads without the need for synchronized code blocks in your code).

- The atomic classes provide a compareAndSet method that is used to validate that an atomic variable’s value will only be changed if it matches an expected value.

- The atomic classes provide several convenience methods such as addAndGet that will loop repeatedly until a compareAndSet succeeds.

- The java.util.concurrent.locks package contains a locking mechanism that is an alternative to synchronized methods and blocks. You get greater flexibility at the cost of a more verbose syntax (such as having to manually call lock.unlock() and having an automatic release of a synchronization monitor at the end of a synchronized code block).

- The ReentrantLock class provides the basic Lock implementation. Commonly used methods are lock(), unlock(), isLocked(), and tryLock(). Calling lock() increments a counter and unlock() decrements the counter. A thread can only obtain the lock when the counter is zero.

- The ReentrantReadWriteLock class provides a ReadWriteLock implementation that supports a read lock (obtained by calling readLock()) and a write lock (obtained by calling writeLock()).

#### Use java.util.concurrent Collections (OCP Objective 10.4)  

- Copy-on-write collections work well when there are more reads than writes because they make a new copy of the collection for each write. When looping through a copy-on-write collection, use an iterator (remember, for-each loops use an iterator).

- None of the concurrent collections make the elements stored in the collection thread-safe—just the collection itself.

- ConcurrentHashMap, ConcurrentSkipListMap, and ConcurrentSkipListSet should be preferred over synchronizing with the more traditional collections.

- ConcurrentHashMap and ConcurrentSkipListMap are ConcurrentMap implementations that enhance a standard Map by adding atomic operations that validate the presence and value of an element before performing an operation: putIfAbsent(K key, V value), remove(Object key, Object value), replace(K key, V value), and replace(K key, V oldValue, V newValue).

- Blocking queues are used to exchange objects between threads. Blocking queues will block (hence the name) when you call certain operations, such as calling take() when there are no elements to take. There are seven different blocking queues that have slightly different behaviors; you should be able to identify the behavior of each type.

Blocking Queue

---

- ArrayBlockingQueue  
	- A FIFO (first-in-first-out) queue in which the head of the queue is the oldest element and the tail is the newest. An int parameter to the constructor limits the size of the queue (itis a bounded queue).

- LinkedBlockingDeque  
	- Similar to LinkedBlockingQueue, except itis a double-ended queue (deque). Instead of only supporting FIFO operations, you can remove from the head or tail of the queue.

- LinkedBlockingQueue  
	- A FIFO queue in which the head of the queue is the oldest element and the tail is the newest. An optional int parameter to the constructor limits the size of the queue (itcan be bounded or unbounded).

- PriorityBlockingQueue
	- An unbounded queue that orders elements using Comparable or Comparator. The head of the queue is the lowest value.

- DelayQueue  
	- An unbounded queue of java.util.concurrent.Delayed instances. Objects can only be taken once their delay has expired. The head of the queue is the object that expired first.

- LinkedTransferQueue   
	- Added in Java 7. An unbounded FIFO queue that supports the features of a ConcurrentLinkedQueue, SynchronousQueue, and LinkedBlockingQueue.

- SynchronousQueue  
	- A blocking queue with no capacity. An insert operation blocks until another thread executes a remove operation. A remove operation blocks until another thread executes an insert operation.

- Some blocking queues are bounded, meaning they have an upper bound on the number of elements that can be added, and a thread calling put(e) may block until space becomes available.

- CyclicBarrier creates a barrier at which threads must wait until all participating threads reach that barrier. Once all of the threads have reached the barrier, they can continue running. You can use CyclicBarrier to coordinate threads so that an action occurs only after another action is complete or to manage data in Collections that are not thread-safe.

- CyclicBarrier takes the number of threads that can wait at the barrier and an optional Runnable that is run after all threads reach the barrier, but before they continue execution. The last thread to reach the barrier is used to run this Runnable.

#### Use Executors and ThreadPools (OCP Objective 10.1)  

- An Executor is used to submit a task for execution without being coupled to how or when the task is executed. Basically, it creates an abstraction that can be used in place of explicit thread creation and execution.

- An ExecutorService is an enhanced Executor that provides additional functionality, such as the ability to execute a Callable instance and to shut down (nondaemon threads in an Executor may keep the JVM running after your main method returns).

- The Callable interface is similar to the Runnable interface, but adds the ability to return a result from its call method and can optionally throw an exception.

- The Executors (plural) class provides factory methods that can be used to construct ExecutorService instances, for example: ExecutorService ex = Executors.newFixedThreadPool(4);.

#### Use the Parallel Fork/Join Framework (OCP Objective 10.5)  

- Fork/Join enables work stealing among worker threads in order to keep all CPUs utilized and to increase the performance of highly parallelizable tasks.

- A pool of worker threads of type ForkJoinWorkerThread is created when you create a new ForkJoinPool(). By default, one thread per CPU is created.

- To minimize the overhead of creating new threads, you should create a single Fork/Join pool in an application and reuse it for all recursive tasks.

- A Fork/Join task represents a large problem to solve (often involving a collection or array).

- When executed by a ForkJoinPool, the Fork/Join task will subdivide itself into Fork/Join tasks that represent smaller segments of the problem to be solved.

- A Fork/Join task is a subclass of the ForkJoinTask class, either RecursiveAction or RecursiveTask.

- Extend RecursiveTask when the compute() method must return a value, and extend RecursiveAction when the return type is void.

- When writing a ForkJoinTask implementation’s compute() method, always call fork() before join() or use one of the invokeAll() methods instead of calling fork() and join().

- You do not need to shut down a Fork/Join pool before exiting your application because the threads in a Fork/Join pool typically operate in daemon mode.

#### Use Parallel Streams Including Reduction, Decomposition, Merging Processes, Pipelines, and Performance (OCP Objective 10.6)  

- Parallel streams are built on top of the Fork/Join pool.

- Parallel streams provide an easier syntax for creating tasks in the Fork/Join pool.

- You can use the default Fork/Join pool, or create a custom pool and submit tasks expressed as parallel streams via a Callable.

- Parallel streams split the stream into subtasks that represent portions of the problem to be solved. Each subtask solution is then combined to produce a final result for the terminal operation of the parallel stream.

- Create a parallel stream by calling parallel() on a stream object or parallelStream() on a Collection object.

- Make a parallel stream sequential again by calling the sequential() method.

- Test to see if a stream is parallel with the isParallel() method.

- Parallel stream pipelines should be stateless, and for optimum performance, parallel streams should be unordered. Reduction operations on parallel streams should be associative and stateless.

- Stateful parallel stream pipelines will either create an error or unexpected results.

- Nonassociative reductions on streams will produce unexpected results.

- Just like sequential streams, parallel streams can have multiple intermediate operations and must have one terminal operation to produce a result.

- Test your parallel streams to verify you are getting the performance benefits you expect. The performance overhead of creating threads can be greater than the performance gain of a parallel stream in some situations.

- Stateful stream operations, such as distinct(), limit(), skip(), and sorted(), will limit the performance of your parallel streams.

- Collect results from a parallel stream pipeline with collect(), just as we did with sequential streams. The collecting happens in a thread-safe way, so you can use collect() with Collectors.toList(), toSet(), and toMap() safely.


## Kill a process on a port  

`netstat -ano | findstr :8080`  
Take the port id and use that to kill the task  
`taskkill /PID 15828 /F`  

## Recursion  

- A recursive algorithm is an algorithm that breaks the problem into smaller subproblems and applies the same algorithm to solve the smaller subproblems.
- Recursion may be direct, such as f() itself calling f(), or indirect, such as f() calling g() and g() calling f().  
- Each method call places a new **stack frame** on the stack, for local parameters, local variables, and more method items. Upon return, the frame is deleted.  
- Deep recursion could fill the stack region and cause a **stack overflow**, meaning a stack frame extends beyond the memory region allocated for stack.

## Java Scanner class  

- Is used to convert the bytes from a System.In to the desired data types  
- As seen from previous examples, a programmer often needs a way to extract strings or integers from an input stream. Instead of directly reading bytes from System.in, a program typically uses the Scanner class as a wrapper that augments System.in by automatically scanning a sequence of bytes and converting those bytes to the desired data type.  
- `Scanner scnr = new Scanner(System.in);`  


## Java print format  

- The first argument of the **printf()** method, the format string, specifies the format of the text to print along with any number of placeholders for printing values. The placeholders are known as format specifiers. A format specifier specifies the type of value to print in its place. A format specifier begins with the % character followed by another character that indicates the value type to be printed. Ex: **%d** indicates an integer type, and **%s** indicates a string type.
	
	```java
	System.out.printf("The %s account saved you $%f over %d years\n",
    account, total, years);  
	```
	
- To preserve resources, the system may wait until the buffer is full, or at least has a certain number of characters before moving them to the output device. Or, with fewer characters in the buffer, the system may wait until the resources are not busy. Sometimes a programmer does not want the system to wait. Ex: In a very processor-intensive program, waiting could cause delayed and/or jittery output.

- The PrintStream method flush() flushes the stream's buffer contents. Ex: The statement System.out.flush(); writes the contents of the buffer for System.out to the computer screen.  

- Most Java implementations make System.out flush when a newline character is output or println() method is called.  








### Making Angular read from the environment, not hardwired to port 8080  

In app.components.ts  
- Import {Location, LocationStrategy} from "@angular/common";
- Add location and locationStrategy to the constructor  
	- Constructor(private httpClient:HttpClient, private location: Location, private locationStrategy: LocationStrategy){}
- Comment out  
	- private baseURL:string='http://localhost:8080';
- replace with  
	- private baseURL:string=this.location.path();


# Deploy a Java application in a Docker Container to AWS  

# Task C.3  

> Describe how you would deploy the current multithreaded Spring 
application to the cloud. Include the name of the cloud service 
provider you would use.  
 

The following instructions are for deploying a Java Web Application 
to an AWS Cloud EC2 instance.  The Java application will be dockerized
and deployed from the EC2 instance as a Docker container. The final 
application can be accessed through the EC2 instance IPv4 number. 
The Docker Container's port :8080 will be mapped through the EC2 
port :80.  

1. Dockerize the application
	- Build a runnable .jar file    
	- Create a Dockerfile  
	- Build a Docker Image  
	- Push the Docker Image to Docker Hub  
2. Deploy on an AWS EC2 Instance  
	- Create an IAM Role for an EC2  
	- Launch EC2 Instance  
	- Start a session under Systems Manager  
	- Install Docker in the session  
	- Pull the Docker Image into the session  
	
## Dockerize the Application  

A .jar file is an archived file in ZIP format of bundled Java 
class files.  A runnable .jar has an entrypoint into the application's 
main method. To create a Docker image, the application will first need 
to create the .jar file that will be the first layer of the image.  
Next, a Dockerfile will be added under the project's root directory. 
The Dockerfile has no extension. It contains the instructions for 
building the image. With a Dockerfile added, the docker image can be 
built and pushed up to Docker Hub. Placing the image into Docker Hub 
allows the image to be pulled down to other machines, like the AWS EC2.  

### Build a runnable .jar file

This project used Maven. There are other ways to build a runnable .jar, 
but the instructions here will be directed towards Maven.  

1. Add the *maven-jar-plugin* to the *pom.xml* file. In the code snippet
below, substitute 'com.baeldung.HelloWorld' for the path to the project's 
file containing the *main* method.  

```xml  
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-jar-plugin</artifactId>
	<version>${maven-jar-plugin.version}</version>             
	<configuration>
		<archive>
			<manifest>
				<mainClass>com.baeldung.HelloWorld</mainClass>
			</manifest>
		</archive>
	</configuration>
</plugin>
```

2. Navigate a command terminal to the project's root directory. Build the 
.jar file by running the command `mvn clean package` in the terminal. 

### Create a Dockerfile  

The Dockerfile will be located just within the root directory. It 
will contain the instructions for building the Docker Image.  

1. The simplest way, since this project uses IntelliJ IDEA, is to 
right-click on the project root directory, select 'new' from the listed 
options, then choose 'Dockerfile'. Another way would be to create a 
file called 'Dockerfile' with no extension inside of the root directory.  

2. The Dockerfile should contain the following content:  

	```
	FROM openjdk:17-jdk-alpine
	COPY target/applicationName-0.0.1-SNAPSHOT.jar app.jar
	ENTRYPOINT ["java","-jar","/app.jar"]
	```  

	- The path listed next to 'COPY' can be found in the project target 
	directory. Replace the .jar file called 'applicationName' with the 
	name of the project to be placed in the Docker Image.  

### Build a Docker Image  

1. In a command terminal, navigate to the root directory where the 
Dockerfile is located. Run the following command but replace 'imageName' 
with the intended name of the image: 

	- `docker image build -t imageName:latest .`  

2. Test the image, run a container (Optional)  
	
	- Build the image into a container with the following command. 
	Use the `-p` tag to map the container's port to the running 
	machine's port.
	
	- `docker run --name containerName -d -p 8080:8080 imageName`  

	- Check that the container is running with `docker ps`  

	- Stop the running container with `docker stop containerName`  

### Push the Docker Image to Docker Hub  

1. This step creates an access token to the Docker Hub repository. 
Keep this token later for signing into Docker Hub from the AWS EC2 
Instance.  
	
	- Log into Docker Hub. Find the Security tab, click 
	'New Access Token'. Save this token for later use.  

2. Push the Docker Image to a Docker Hub repository.  
	
	- Run the following command, replacing 'nameOfImage' with the 
	name of the Docker Image to be pushed. Also replace nameOfRepository 
	with the name of the Docker Hub repository that the image is being 
	pushed to.  
	
	- `docker tag nameOfImage nameOfRepository/nameOfImage`  
	
	- `docker push nameOfRepository/nameOfImage`  

## Deploy on an AWS EC2 Instance  

Create/Login to an AWS Account. 
 
### Create an IAM Role for an EC2  

1. Search for and select IAM service.  

2. Create a Role for the EC2 instance by selecting a new EC2 role.  

3. Search in Permission Policies for SSM. The returned results should 
have the option for AmazonSSMManagedInstanceCore. Select this option 
then click 'next'.  

4. Give the role a name, then click 'Create Role'  

### Launch EC2 Instance  

1. Go to the 'Instances' option in the side bar.  

2. Click on 'Launch an Instance'  

3. Make the following selections for the new instance: 

	- Give a name to the instance  
	
	- Choose Linux as the Operating System  
	
	- Under 'Key pair (login)' choose 'launch'  
	
	- Create a Security Group and allow HTTP and HTTPS  
	
	- Configure Store to ` 1x 8 GiB gp2`  
	
	- In 'Advanced Details' choose the IAM instance profile just 
	created.  
	
	- Launch the instance.  
	
4. Go back to the 'Instances' option on the left side bar and 
select the newly running EC2 Instance. Under details, copy and save 
the IPv4 address for accessing the EC2 later.  

### Start a session under Systems Manager  

1. Search for 'Session Manager' service and open a session  

2. Start a session  

3. Use the instance just created.

### Install Docker in the session  

Inside the instance session the following commands will need to be 
run to install Docker:  

- `sudo sh`  
- `yum install -y docker`  
- `service docker start`  
- `docker info` (This is to check on the status of Docker)  

### Pull the Docker Image into the session  

1. Login to Docker from the EC2 Instance session. The value for 
'password' requires the access token that was created in step 1 
of 'Push the Docker Image to Docker Hub'.  

	- Enter `docker login` into the session. 
	
	- The prompts will ask for 'Username' and 'Password'. Enter 
	the requested values, using the Docker Hub access key for the 
	password.  
	
2. Pull the Docker Image with the following command. Replace 
nameOfRepository and nameOfImage with the respective values.  

	- `docker pull nameOfRepository/nameOfImage`  
	
3. Run `docker images` to see if the image pulled from the repository.  

4. Run the Docker image inside the EC2 instance, replacing the respective  
values  

	- `docker run -name desiredContainerName -d -p 80:8080 nameOfRepository/nameOfImage`  
	
5. Take the IPv4 number that was saved in step 4 of 'Launch EC2 Instance' 
and place it into a web browser. The Java web application should appear.  


## References  

1. Piwowarek, Grzegorz. *Dockerizing a Java Application*. January 16, 2024.  
	https://www.baeldung.com/java-dockerize-app. Accessed July 7th, 2024.  

2. Sher-DeCusatis, Carolyn. "D387 Packaging a Jar". *Panopto*, May 5, 2023.  

3. Sher-DeCusatis, Carolyn. "D387 How To Deploy A Docker Container on AWS  
	and Azure". *Panopto*, November 19, 2022.  
	
4. Lizarraga, A., & Lysecky, R. (2022). D387: Advanced Java. zyBooks,  
	a Wiley brand. https://learn.zybooks.com/zybook/WGUD387v1 (accessed July 2024).
