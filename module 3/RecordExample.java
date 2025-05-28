import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


record Person(String name, int age) {}

public class RecordExample {
    public static void main(String[] args) {
    
        Person p1 = new Person("Akshaya", 22);
        Person p2 = new Person("Ravi", 17);
        Person p3 = new Person("Meera", 25);

       
        System.out.println(p1);
        System.out.println(p2);
        System.out.println(p3);

        List<Person> people = new ArrayList<>();
        people.add(p1);
        people.add(p2);
        people.add(p3);

        
        List<Person> adults = people.stream()
                                    .filter(person -> person.age() >= 18)
                                    .collect(Collectors.toList());

        System.out.println("\nPeople aged 18 and above:");
        for (Person person : adults) {
            System.out.println(person);
        }
    }
}
