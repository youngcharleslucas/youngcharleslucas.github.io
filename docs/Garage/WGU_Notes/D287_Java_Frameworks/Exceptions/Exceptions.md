## try-with-resources
* closes the resource once the block is completed. So you don't have to explicitly close a file
* ex: 
	
```
	try(Scanner fileScnr - new Scanner (new FileInputStream("input.tst?))){
			code
		} catch (...){
		}
```
		
finally block always executes when exiting a try/catch


If a method is built to throw an exception to be handled by the calling method, its signature looks:

public static doubl getArea(Scanner scnr) throws Exception, FileNotFoundException {
method stuff
return value

}

Above is called a throws clause. Multiple exceptions can be declared.
The first exception declared in the 'throws' statement must be used in the callingme
method. The second or additional exceptions are optional to the calling method.


## Java has two types of exceptions:
A checked exception is an exception that a programmer should be able to anticipate and handle. Ex: A program that opens files should anticipate and handle a FileNotFoundException.
An unchecked exception is an exception caused by hardware or logic errors that a programmer usually cannot anticipate and handle. 
Ex: A program should try to eliminate code that uses null references instead of catching and handling NullPointerException.

### Figure 2.4.1: Exceptions with hierarchical methods: DataTimeSpeedup example.
```
import java.util.Scanner;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

public class DataTimeSpeedup {
   public static double calcAvgInputVal(Scanner scnr) throws Exception {
      double sumVal = 0;
      int numValues = scnr.nextInt();

      if (numValues < 0) {
         throw new Exception("Negative number of values");
      }

      for (int i = 0; i < numValues; ++i) {
         sumVal += scnr.nextDouble();
      }

      return sumVal / (double) numValues;
   }

   public static double calcAvgSpeedup(String file1, String file2) throws FileNotFoundException, Exception {
      FileInputStream inStream1 = new FileInputStream(file1);
      FileInputStream inStream2 = new FileInputStream(file2);
      Scanner fileScnr1 = new Scanner(inStream1);
      Scanner fileScnr2 = new Scanner(inStream2);

      double file1Avg = calcAvgInputVal(fileScnr1);
      double file2Avg = calcAvgInputVal(fileScnr2);

      return file2Avg / file1Avg;
   }

   public static void main(String[] args) {
      Scanner scnr = new Scanner(System.in);
      String file1;
      String file2;
      double avgSpeedup;
      boolean retry = true;

      while (retry) {
         System.out.print("Enter data file names: ");
         file1 = scnr.next();
         file2 = scnr.next();

         try {
            avgSpeedup = calcAvgSpeedup(file1, file2);
            retry = false;

            System.out.println("Speedup: " + avgSpeedup);
         }
         catch (FileNotFoundException exception) {
            System.out.println(exception.getMessage());
            retry = true;
         }
         catch (Exception exception) {
            System.out.println(exception.getMessage());
            retry = false;
         }
      }
   }
}
```

## Collections

* Collections provide static methods that operate on vairous types of lists, like ArrayList
	- The sort() method will work as long as the Collection elements implement the **Comparable** interface
	- **Comparable** interface is used in primitive wrapper classes (Integer, Double)
	- These clases implement the **compareTo()** method
	- the **import java.util** must be used ot implement the sort() method

Testing adding a bash alias

