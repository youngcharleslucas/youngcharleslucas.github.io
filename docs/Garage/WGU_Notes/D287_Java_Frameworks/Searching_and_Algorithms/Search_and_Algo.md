# Searching and Algorithm
## Linear Searching
* For a list with N elements, linear search thus **requires at most N comparisons.** The algorithm is said to **require "on the order" of N comparisons**.  


```
import java.util.Scanner;
public class LinearSearch {
   public static int linearSearch(int [] numbers, int key) {
      int i;
      
      for (i = 0; i < numbers.length; ++i) {
         if (numbers[i] == key) {
            return i;
         }
      }
      
      return -1; /* not found */
   }
   
   public static void main(String [] args) {
      Scanner scnr = new Scanner(System.in);
      int [] numbers = {2, 4, 7, 10, 11, 32, 45, 87};
      int i;
      int key;
      int keyIndex;
      
      System.out.print("NUMBERS: ");
      for (i = 0; i < numbers.length; ++i) {
         System.out.print(numbers[i] + " ");
      }
      System.out.println();
      
      System.out.print("Enter a value: ");
      key = scnr.nextInt();
      
      keyIndex = linearSearch(numbers, key);
      
      if (keyIndex == -1) {
         System.out.println(key + " was not found.");
      } 
      else {
         System.out.println("Found " + key + " at index " + keyIndex + ".");
      }
   }
}
```

## Runtime
* An algorithm's runtime is the time the algorithm takes to execute. If each comparison takes 1 µs (1 microsecond), a linear search algorithm's runtime is up to 1 s to search a list with 1,000,000 elements, 10 s for 10,000,000 elements, and so on. Ex: Searching Amazon's online store, which has more than 200 million items, could require more than 3 minutes.  

## Binary Search  
* Checks the middle first  
* For a 32 element list, if the search key is not found, the search space is halved to have 16 elements, then 8, 4, 2, 1, and finally none, requiring only 6 steps.   
	- ![image](binary_runtime.png?raw=true "Runtime Equation")  
	- **Know the change of base calculation!!!**	

```
import java.util.Scanner;

public class BinarySearch {
   public static int binarySearch(int [] numbers, int key) {
      int mid;
      int low;
      int high;
      
      low = 0;
      high = numbers.length - 1;

      while (high >= low) {
         mid = (high + low) / 2;
         if (numbers[mid] < key) {
            low = mid + 1;
         } 
         else if (numbers[mid] > key) {
            high = mid - 1;
         } 
         else {
            return mid;
         }
      }

      return -1; // not found
   }

   public static void main(String [] args) {
      Scanner scnr = new Scanner(System.in);
      int [] numbers = {2, 4, 7, 10, 11, 32, 45, 87};
      int i;
      int key;
      int keyIndex;

      System.out.print("NUMBERS: ");
      for (i = 0; i < numbers.length; ++i) {
         System.out.print(numbers[i] + " ");
      }
      System.out.println();

      System.out.print("Enter a value: ");
      key = scnr.nextInt();

      keyIndex = binarySearch(numbers, key);

      if (keyIndex == -1) {
         System.out.println(key + " was not found.");
      } 
      else {
         System.out.println("Found " + key + " at index " + keyIndex + ".");
      }
   }
}
```
Output:  
```
NUMBERS: 2 4 7 10 11 32 45 87 
Enter a value: 10
Found 10 at index 3.
...
NUMBERS: 2 4 7 10 11 32 45 87 
Enter a value: 17
17 was not found.
```

## Sorting
### Sorting Selection
* **Selection Sort** is an algorithm that treats the input as two parts,  
a sorted part and an unsorted part, and repeatedly selects the proper next  
value to move from the unsorted part to the end of the sorted part.  
* Selection Sort runtime = O(N^2)
	- The outer loop executes N-1 times
	- The inner loop executes N/2 times
	- The result is (N-1) x (N/2) = O(N^2)  


```
public class SelectionSort {
   public static void selectionSort(int [] numbers) {
      int i;
      int j;
      int indexSmallest;
      int temp;      // Temporary variable for swap

      for (i = 0; i < numbers.length - 1; ++i) {

         // Find index of smallest remaining element
         indexSmallest = i;
         for (j = i + 1; j < numbers.length; ++j) {

            if (numbers[j] < numbers[indexSmallest]) {
               indexSmallest = j;
            }
         }

         // Swap numbers[i] and numbers[indexSmallest]
         temp = numbers[i];
         numbers[i] = numbers[indexSmallest];
         numbers[indexSmallest] = temp;
      }
   }

   public static void main(String [] args) {
      int numbers [] = {10, 2, 78, 4, 45, 32, 7, 11};
      int i;

      System.out.print("UNSORTED: ");
      for (i = 0; i < numbers.length; ++i) {
         System.out.print(numbers[i] + " ");
      }
      System.out.println();

      /* initial call to selection sort with index */
      selectionSort(numbers);

      System.out.print("SORTED: ");
      for (i = 0; i < numbers.length; ++i) {
         System.out.print(numbers[i] + " ");
      }
      System.out.println();
   }
}
```
Output:
```
UNSORTED: 10 2 78 4 45 32 7 11 
SORTED: 2 4 7 10 11 32 45 78
```

### Insertion Sort  
*Insertion sort is a sorting algorithm that treats the input as two parts, a sorted part and an unsorted part, and repeatedly inserts the next value from the unsorted part into the correct location in the sorted part.
* Same runtime as a Selection Sort, O(N^2)  
	- This may not be true. The practice questions use Factorial => 
		- In the worst case, assuming each comparison takes 1 µs, how long will insertion sort algorithm take to sort a list of 10 elements?  
		- If N = 10, then Insertion Sort comparisons = (N-1)! = **45**  
* For sorted or nearly sorted inputs, insertion sort's runtime is O(N). A **nearly** sorted list only contains a few elements not in sorted order. Ex: {4, 5, 17, 25, 89, 14} is nearly sorted having only one element not in sorted position.


```
public class InsertionSort {
   public static void insertionSort(int [] numbers) {
      int i;
      int j;
      int temp;      // Temporary variable for swap

      for (i = 1; i < numbers.length; ++i) {
         j = i;
         // Insert numbers[i] into sorted part 
         // stopping once numbers[i] in correct position
         while (j > 0 && numbers[j] < numbers[j - 1]) {

            // Swap numbers[j] and numbers[j - 1]
            temp = numbers[j];
            numbers[j] = numbers[j - 1];
            numbers[j - 1] = temp;
            --j;
         }
      }
   }

   public static void main(String [] args) {
      int [] numbers = {10, 2, 78, 4, 45, 32, 7, 11};
      int i;

      System.out.print("UNSORTED: ");
      for (i = 0; i < numbers.length; ++i) {
         System.out.print(numbers[i] + " ");
      }
      System.out.println();

      insertionSort(numbers);

      System.out.print("SORTED: ");
      for (i = 0; i < numbers.length; ++i) {
         System.out.print(numbers[i] + " ");
      }
      System.out.println();
   }
}
```
Output:
```
UNSORTED: 10 2 78 4 45 32 7 11 
SORTED: 2 4 7 10 11 32 45 78
```

### Quicksort
* Quicksort is a sorting algorithm that repeatedly partitions the input into low and high parts (each part unsorted), and then recursively sorts each of those parts. To partition the input, quicksort chooses a pivot to divide the data into low and high parts.
* The pivot can be any value within the array being sorted, commonly the value of the middle array element. Ex: For the list {4 34 10 25 1}, the middle element is located at index 2 (the middle of indices 0..4) and has a value of 10.
* The quicksort algorithm's runtime is typically O(N log N). 
* So the worst case runtime for the quicksort algorithm is O(N^2)  


```
public class QuickSort {
   public static int partition(int [] numbers, int i, int k) {
      int l;
      int h;
      int midpoint;
      int pivot;
      int temp;
      boolean done;

      /* Pick middle element as pivot */
      midpoint = i + (k - i) / 2;
      pivot = numbers[midpoint];

      done = false;
      l = i;
      h = k;

      while (!done) {
         /* Increment l while numbers[l] < pivot */
         while (numbers[l] < pivot) {
            ++l;
         }

         /* Decrement h while pivot < numbers[h] */
         while (pivot < numbers[h]) {
            --h;
         }

         /* If there are zero or one items remaining,
            all numbers are partitioned. Return h */
         if (l >= h) {
            done = true;
         } 
         else {
            /* Swap numbers[l] and numbers[h],
               update l and h */
            temp = numbers[l];
            numbers[l] = numbers[h];
            numbers[h] = temp;

            ++l;
            --h;
         }
      }

      return h;
   }

   public static void quicksort(int [] numbers, int i, int k) {
      int j;

      /* Base case: If there are 1 or zero entries to sort,
       partition is already sorted */
      if (i >= k) {
         return;
      }

      /* Partition the data within the array. Value j returned
         from partitioning is location of last item in low partition. */
      j = partition(numbers, i, k);

      /* Recursively sort low partition (i to j) and
         high partition (j + 1 to k) */
      quicksort(numbers, i, j);
      quicksort(numbers, j + 1, k);
   }

   public static void main(String [] args) {
      int [] numbers = {10, 2, 78, 4, 45, 32, 7, 11};
      int i;

      System.out.print("UNSORTED: ");
      for (i = 0; i < numbers.length; ++i) {
         System.out.print(numbers[i] + " ");
      }
      System.out.println();

      /* Initial call to quicksort */
      quicksort(numbers, 0, numbers.length - 1);

      System.out.print("SORTED: ");
      for (i = 0; i < numbers.length; ++i) {
         System.out.print(numbers[i] + " ");
      }
      System.out.println();
   }
}
```
Output: 
```
UNSORTED: 10 2 78 4 45 32 7 11 
SORTED: 2 4 7 10 11 32 45 78
```

### Merge Sort  
* **Merge** sort is a sorting algorithm that divides a list into two halves, recursively sorts each half, and then merges the sorted halves to produce a sorted list. The recursive partitioning continues until a list of 1 element is reached, as list of 1 element is already sorted.
* The merge sort algorithm uses three index variables to keep track of the elements to sort for each recursive method call. The index variable i is the index of first element in the list, and the index variable k is the index of the last element. The index variable j is used to divide the list into two halves. Elements from i to j are in the left half, and elements from j + 1 to k are in the right half.  
* Runtime is O(N log N)
	- Merge sort divides the input in half until a list of 1 element is reached, which requires log N partitioning levels. At each level, the algorithm does about N comparisons selecting and copying elements from the left and right partitions, yielding N * log N comparisons.  
	


```
public class MergeSort {
   public static void merge(int [] numbers, int i, int j, int k) {
      int mergedSize = k - i + 1;       // Size of merged partition
      int mergedNumbers [] = new int[mergedSize]; // Temporary array for merged numbers
      int mergePos;                     // Position to insert merged number
      int leftPos;                      // Position of elements in left partition
      int rightPos;                     // Position of elements in right partition

      mergePos = 0;
      leftPos = i;                      // Initialize left partition position
      rightPos = j + 1;                 // Initialize right partition position

      // Add smallest element from left or right partition to merged numbers
      while (leftPos <= j && rightPos <= k) {
         if (numbers[leftPos] < numbers[rightPos]) {
            mergedNumbers[mergePos] = numbers[leftPos];
            ++leftPos;
         } 
         else {
            mergedNumbers[mergePos] = numbers[rightPos];
            ++rightPos;
         }
         ++mergePos;
      }

      // If left partition is not empty, add remaining elements to merged numbers
      while (leftPos <= j) {
         mergedNumbers[mergePos] = numbers[leftPos];
         ++leftPos;
         ++mergePos;
      }

      // If right partition is not empty, add remaining elements to merged numbers
      while (rightPos <= k) {
         mergedNumbers[mergePos] = numbers[rightPos];
         ++rightPos;
         ++mergePos;
      }

      // Copy merge number back to numbers
      for (mergePos = 0; mergePos < mergedSize; ++mergePos) {
         numbers[i + mergePos] = mergedNumbers[mergePos];
      }
   }

   public static void mergeSort(int [] numbers, int i, int k) {
      int j;

      if (i < k) {
         j = (i + k) / 2;  // Find the midpoint in the partition

         // Recursively sort left and right partitions
         mergeSort(numbers, i, j);
         mergeSort(numbers, j + 1, k);

         // Merge left and right partition in sorted order
         merge(numbers, i, j, k);
      }
   }

   public static void main(String [] args) {
      int [] numbers = {10, 2, 78, 4, 45, 32, 7, 11};
      int i;

      System.out.print("UNSORTED: ");
      for (i = 0; i < numbers.length; ++i) {
         System.out.print(numbers[i] + " ");
      }
      System.out.println();

      /* initial call to merge sort with index */
      mergeSort(numbers, 0, numbers.length - 1);

      System.out.print("SORTED: ");
      for (i = 0; i < numbers.length; ++i) {
         System.out.print(numbers[i] + " ");
      }
      System.out.println();
   }
}
```
Output:
```
UNSORTED: 10 2 78 4 45 32 7 11 
SORTED: 2 4 7 10 11 32 45 78
```