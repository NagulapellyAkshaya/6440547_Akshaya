import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();

        numbers.add(5);
        numbers.add(10);
        numbers.add(7);
        numbers.add(12);
        numbers.add(3);
        numbers.add(8);

        
        List<Integer> evenNumbers = numbers.stream()
                                           .filter(n -> n % 2 == 0)
                                           .collect(Collectors.toList());

        System.out.println("Even Numbers:");
        for (int num : evenNumbers) {
            System.out.println(num);
        }
    }
}
