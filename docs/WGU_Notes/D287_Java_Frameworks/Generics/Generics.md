## Collections

* Collections provide static methods that operate on vairous types of lists, like ArrayList
	- The sort() method will work as long as the Collection elements implement the **Comparable** interface
	- **Comparable** interface is used in primitive wrapper classes (Integer, Double)
	- These clases implement the **compareTo()** method
	- the **import java.util** must be used ot implement the sort() method

### Figure 3.1.1: Collections' sort() method operates on lists of Integer objects.
```
import java.util.Scanner;
import java.util.ArrayList;
import java.util.Collections;

public class ArraySorter {
   public static void main(String[] args) {
      Scanner scnr = new Scanner(System.in);
      final int NUM_ELEMENTS = 5;                             // Number of items in array
      ArrayList<Integer> userInts = new ArrayList<Integer>(); // Array of user defined values
      int i;                                                  // Loop index

      // Prompt user for input, add values to array
      System.out.println("Enter " + NUM_ELEMENTS + " numbers...");
      for (i = 1; i <= NUM_ELEMENTS; ++i) {
         System.out.print(i + ": ");
         userInts.add(scnr.nextInt());
      }

      // Sort ArrayList of Comparable elements
      Collections.sort(userInts);

      // Print sorted array
      System.out.print("\nSorted numbers: ");
      for (i = 0; i < NUM_ELEMENTS; ++i) {
         System.out.print(userInts.get(i) + " ");
      }
      System.out.println("");
   }
}
```


### Figure 3.1.2: Sorting an ArrayList of employee records.
This creates a userdefined compareTo() by implementing the Comparable<T> class
#### EmployeeData.java:
```
public class EmployeeData implements Comparable<EmployeeData> {
   private String firstName; // First Name
   private String lastName;  // Last Name
   private Integer emplID;   // Employee ID
   private Integer deptNum;  // Department Number
   
   EmployeeData(String firstName, String lastName, Integer emplID, Integer deptNum) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.emplID = emplID;
      this.deptNum = deptNum;
   }

   @Override
   public int compareTo(EmployeeData otherEmpl) {
      String fullName;           // Full name, this employee
      String otherFullName;      // Full name, comparison employee
      int comparisonVal;         // Outcome of comparison
      
      // Compare based on department number first
      comparisonVal = deptNum.compareTo(otherEmpl.deptNum);
      
      // If in same organization, use name
      if (comparisonVal == 0) {
         fullName = lastName + firstName;
         otherFullName = otherEmpl.lastName + otherEmpl.firstName;
         comparisonVal = fullName.compareTo(otherFullName);
      }
      
      return comparisonVal;
   }
   
   @Override
   public String toString() {
      return lastName + " " + firstName + 
             "       \tID: " + emplID + 
             "\t\tDept. #: " + deptNum;
   }
}
```
#### EmployeeRecords.java:
```
import java.util.Scanner;
import java.util.ArrayList;
import java.util.Collections;

public class EmployeeRecords {

   public static void main(String[] args) {
      Scanner scnr = new Scanner(System.in);
      ArrayList<EmployeeData> emplList = new ArrayList<EmployeeData>(); // Stores all employee data
      EmployeeData emplData;                                            // Stores info for one employee
      String userCommand;                                               // User defined add/print/quit command
      String emplFirstName;                                             // User defined employee first name
      String emplLastName;                                              // User defined employee last name
      Integer emplID;                                                   // User defined employee ID
      Integer deptNum;                                                  // User defined employee Dept
      int i;                                                            // Loop counter

      do {
         // Prompt user for input
         System.out.println("Enter command ('a' to add new employee, 'p' to print all employees, 'q' to quit): ");
         userCommand = scnr.next();

         // Add new employee entry
         if (userCommand.equals("a")) {
            System.out.print("First Name: ");
            emplFirstName = scnr.next();
            System.out.print("Last Name: ");
            emplLastName = scnr.next();
            System.out.print("ID: ");
            emplID = scnr.nextInt();
            System.out.print("Department Number: ");
            deptNum = scnr.nextInt();
            emplData = new EmployeeData(emplFirstName, emplLastName, emplID, deptNum);
            emplList.add(emplData);
         }
         // Print all entries
         else if (userCommand.equals("p")) {

            // Sort employees by department number first
            // and name second
            Collections.sort(emplList);

            System.out.println("");
            System.out.println("Employees: ");
            // Access employee records
            for (i = 0; i < emplList.size(); ++i) {
               System.out.println(emplList.get(i).toString());
            }
            System.out.println("");
         }
      } while (!userCommand.equals("q"));
   }
}
```

## Implements:
* Implements keyword tells the compiler that a class implements, instead of extends,  
instead of extends, a particular interface
* **Interfaces** cannot instantiate the methods declared, it must be overwritten  
by an implementing class  
* Interfaces have method declarations, not method definitions

## Generic Method:
* **Generic Methods** have a special type parameter rather than a specific type.  
* It is (Kind of) an alternative to using method overrides, because those can be confusing, I guess  
* In the following:  
	- The method return type is preceded by <TheType extends Comparable<TheType>>,   
where TheType can be any identifier. That type is known as a **type parameter**   
and can be used throughout the method for any parameter types, return types, or local   
variable types. The identifier is known as a **template parameter**, and may be various   
reference types or even another template parameter.  
	- **Type Bound** specifyies what type is allowed, like Compare<TheType> means that  
	only a class implementing compareTo() can be used as a type.
	- Primitive types cannot be used for arguments, use primitive wrapper classes  
	

### Figure 3.2.2: A generic method enables a method to handle various class types.
```
public class ItemMinimum {
   public static <TheType extends Comparable<TheType>> 
   TheType tripleMin(TheType item1, TheType item2, TheType item3) {
      TheType minVal = item1; // Holds min item value, init to first item

      if (item2.compareTo(minVal) < 0) {
         minVal = item2;
      }
      if (item3.compareTo(minVal) < 0) {
         minVal = item3;
      }
      return minVal;
   }

   public static void main(String[] args) {
      Integer num1 = 55;    // Test case 1, item1
      Integer num2 = 99;    // Test case 1, item2
      Integer num3 = 66;    // Test case 1, item3

      Character let1 = 'a'; // Test case 2, item1
      Character let2 = 'z'; // Test case 2, item2
      Character let3 = 'm'; // Test case 2, item3

      String str1 = "zzz";  // Test case 3, item1
      String str2 = "aaa";  // Test case 3, item2
      String str3 = "mmm";  // Test case 3, item3

      // Try tripleMin method with Integers
      System.out.println("Items: " + num1 + " " + num2 + " " + num3);
      System.out.println("Min: " + tripleMin(num1, num2, num3) + "\n");

      // Try tripleMin method with Characters
      System.out.println("Items: " + let1 + " " + let2 + " " + let3);
      System.out.println("Min: " + tripleMin(let1, let2, let3) + "\n");

      // Try tripleMin method with Strings
      System.out.println("Items: " + str1 + " " + str2 + " " + str3);
      System.out.println("Min: " + tripleMin(str1, str2, str3) + "\n");
   }
}
```
Output:
```
run:
Items: 55 99 66
Min: 55

Items: a z m
Min: a

Items: zzz aaa mmm
Min: aaa
```  

## Generic class


**TripleItem.java:**
```
public class TripleItem <TheType extends Comparable<TheType>> {
   private TheType item1; // Data value 1
   private TheType item2; // Data value 2
   private TheType item3; // Data value 3

   public TripleItem(TheType i1, TheType i2, TheType i3) {
      item1 = i1;
      item2 = i2;
      item3 = i3;
   }

   // Print all data member values
   public void printAll() {
      System.out.println("(" + item1 + "," + item2 + "," + item3 + ")");
   }

   // Return min data member value
   public TheType minItem() {
      TheType minVal;        // Holds min item value, init to first item

      minVal = item1;

      if (item2.compareTo(minVal) < 0) {
         minVal = item2;
      }
      if (item3.compareTo(minVal) < 0) {
         minVal = item3;
      }
      return minVal;
   }
}
```
**TripleItemManager.java:**
```
public class TripleItemManager {
   public static void main(String[] args) {

      // TripleItem class with Integers
      TripleItem<Integer> triInts = new TripleItem<Integer>(9999, 5555, 6666);       
      
      // TripleItem class with Shorts
      TripleItem<Short> triShorts = new TripleItem<Short>((short)99, (short)55, (short)66); 

      // Try methods from TripleItem
      triInts.printAll();
      System.out.println("Min: " + triInts.minItem() + "\n");
      
      triShorts.printAll();
      System.out.println("Min: " + triShorts.minItem());
   }
}
```
Output:
```
(9999,5555,6666)
Min: 5555

(99,55,66)
Min: 55
```