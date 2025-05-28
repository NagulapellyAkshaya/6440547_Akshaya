import java.lang.reflect.Method;

public class ReflectionDemo {
    public static void main(String[] args) throws Exception {
        // Load class dynamically
        Class<?> cls = Class.forName("MyClass");

        // Create an instance
        Object obj = cls.getDeclaredConstructor().newInstance();

        // Get all declared methods
        Method[] methods = cls.getDeclaredMethods();

        // Print method names and parameter count
        for (Method m : methods) {
            System.out.println("Method Name: " + m.getName());
            System.out.println("Parameter Count: " + m.getParameterCount());
        }

        // Call show() method
        Method showMethod = cls.getDeclaredMethod("show");
        showMethod.invoke(obj);

        // Call greet(String) method
        Method greetMethod = cls.getDeclaredMethod("greet", String.class);
        greetMethod.invoke(obj, "Buddy");
    }
}

