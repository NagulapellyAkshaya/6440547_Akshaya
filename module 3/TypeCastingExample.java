public class TypeCastingExample {
    public static void main(String[] args) {
        double decimalValue = 45.67;
        int intValue = (int) decimalValue;
        System.out.println("Double to Int: " + intValue);

        int wholeNumber = 20;
        double doubleValue = (double) wholeNumber;
        System.out.println("Int to Double: " + doubleValue);
    }
}
