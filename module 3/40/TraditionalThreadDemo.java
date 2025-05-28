public class TraditionalThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        long start = System.currentTimeMillis();

        Thread[] threads = new Thread[100_000];

        for (int i = 0; i < 100_000; i++) {
            threads[i] = new Thread(() -> {
                System.out.println("Hello from traditional thread: " + Thread.currentThread().getName());
            });
            threads[i].start();
        }

        // Wait for all threads to finish
        for (Thread t : threads) {
            t.join();
        }

        long end = System.currentTimeMillis();
        System.out.println("Traditional Threads took: " + (end - start) + " ms");
    }
}

