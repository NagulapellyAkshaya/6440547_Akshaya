import java.util.concurrent.*;
import java.util.*;

public class ExecutorCallableDemo {
    public static void main(String[] args) throws InterruptedException, ExecutionException {
        // Create a fixed thread pool of 5 threads
        ExecutorService executor = Executors.newFixedThreadPool(5);

        // Prepare list of tasks
        List<Callable<String>> taskList = new ArrayList<>();

        for (int i = 1; i <= 10; i++) {
            taskList.add(new MyTask(i));
        }

        // Submit all tasks and get a list of Futures
        List<Future<String>> futures = executor.invokeAll(taskList);

        // Iterate over Futures and get results
        for (Future<String> future : futures) {
            System.out.println(future.get());
        }

        // Shutdown executor
        executor.shutdown();
    }
}

