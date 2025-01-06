# Collections

## Enhanced For Loop
* **Enhanced for loop** is a for loop that iterates throug each element in an array or Collection  
	- AKA **for each loop**
* Only allows elements to be accessed forward from the first element to the last element  

```
ArrayList<String> teamRoster = new ArrayList<String>();

// Adding player names
teamRoster.add("Mike");
teamRoster.add("Scottie");
teamRoster.add("Toni");

System.out.println("Current roster:");

for (String playerName : teamRoster) {
   System.out.println(playerName);
}
```

Output:
```
Current roster:
Mike  
Scottie  
Toni  
```


## LinkedList
* Uses the **List** interface, implements adding, modifying, and removing  
* LinkedList is an ADT (Abstract Data Type - generic) implemented as a generic   
class that supports different types of elements.  
* Can insert at a specified index ` authorList.add(3, "Butler")` or will add to the  
end of the list if no index is specified `authorList.add("Martin")`  

## Accessing items using ListIterator
* **ListIterator** is an object that points to a location in a List and provides methods  
to access an element and advance the ListIterator to the next position in the list  
* `import java.util.ListIterator;`
```
LinkedList<String> authorsList = new LinkedList<String>();  
String authorName;  
ListIterator<String> listIterator;

authorsList.add("Gamow");  
authorsList.add("Greene");  
authorsList.add("Penrose");
 
listIterator = authorsList.listIterator();

while (listIterator.hasNext()) {     
   authorName = listIterator.next();     
   System.out.println(authorName);  
}
```

## HashMap
* Used to iterate through to find an instance
* import java.util.HashMap  
* Declared as `HashMap<K, V> hasMap = new HashMap<K, V>();
	- K is the key and V is the value.

```
HashMap<String, Integer> statePopulation = new HashMap<String, Integer>();

// 2013 population data from census.gov
statePopulation.put("CA", 38332521);
statePopulation.put("AZ", 6626624);
statePopulation.put("MA", 6692824);

System.out.print("Population of Arizona in 2013 is ");
System.out.print(statePopulation.get("AZ"));
System.out.println(".");
```
* HashMap and TreeMap are ADTs implementing the Map interface. Although both HashMap and TreeMap implement a Map, a programmer should select the implementation that is appropriate for the intended task. A HashMap typically provides faster access but does not guarantee any ordering of the keys, whereas a TreeMap maintains the ordering of keys but with slightly slower access. This material uses the HashMap class, but the examples above can be modified to use TreeMap  

## HashSet
* HashSet and TreeSet are ADTs implementing the Set interface. Although both HashSet and TreeSet implement a Set, a programmer should select the implementation that is appropriate for the intended task. A HashSet typically provides faster access but does not guarantee any ordering of the elements, whereas a TreeSet maintains the ordering of elements but with slightly slower access.  
* Declared as `HashSet<T> hashSet - new HashSet<T>();`  
* `import java.util.HashSet;`
* The add() method does not add duplicate elements to a set. Trying to add a duplicate returns false.

 
```
import java.util.HashSet;

public class BookCollection {
   public static void main(String[] args) {
      HashSet<String> ownedBooks = new HashSet<String>();

      ownedBooks.add("A Tale of Two Cities");
      ownedBooks.add("The Lord of the Rings");

      System.out.println("Contains \"A Tale of Two Cities\": " +
                         ownedBooks.contains("A Tale of Two Cities"));

      ownedBooks.remove("The Lord of the Rings");

      System.out.println("Contains \"The Lord of the Rings\": " +
                         ownedBooks.contains("The Lord of the Rings"));
   }
}
```  




