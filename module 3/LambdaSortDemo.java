import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LambdaSortDemo {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();

        names.add("Akshaya");
        names.add("Ravi");
        names.add("Meera");
        names.add("Karthik");

        
        Collections.sort(names, (a, b) -> a.compareTo(b));

        System.out.println("Sorted List:");
        for (String name : names) {
            System.out.println(name);
        }
    }
}
