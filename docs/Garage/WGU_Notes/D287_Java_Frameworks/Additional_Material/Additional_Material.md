

## Command-Line Arguments
```
public class ArgTest {
   public static void main(String[] args) {
      int i;
      int argc;

      argc = args.length;
      System.out.println("args.length: " + argc);

      for (i = 0; i < argc; ++i) {
         System.out.println("args[" + i + "]: " + args[i]);
      }
   }
}
```
Output:
```
> java ArgTest
args.length: 0

> java ArgTest Hello
args.length: 1
args[0]: Hello

> java ArgTest Hey ABC 99 -5
args.length: 4
args[0]: Hey
args[1]: ABC
args[2]: 99
args[3]: -5
```
