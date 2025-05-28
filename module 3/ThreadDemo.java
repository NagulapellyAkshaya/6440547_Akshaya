
class MessagePrinter implements Runnable {
    String message;

    public MessagePrinter(String message) {
        this.message = message;
    }

    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(message + " - " + i);
        }
    }
}

public class ThreadDemo {
    public static void main(String[] args) {
        
        MessagePrinter printer1 = new MessagePrinter("Hello from Thread 1");
        MessagePrinter printer2 = new MessagePrinter("Hello from Thread 2");

        
        Thread thread1 = new Thread(printer1);
        Thread thread2 = new Thread(printer2);

        thread1.start();
        thread2.start();
    }
}
