# 多线程Multithreading

```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
bool isOdd = true;

void printOdd() {
    for (int i = 1; i <= 100; i += 2) {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, [] { return isOdd; });
        std::cout << i << std::endl;
        isOdd = false;
        cv.notify_all();
    }
}

void printEven() {
    for (int i = 2; i <= 100; i += 2) {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, [] { return !isOdd; });
        std::cout << i << std::endl;
        isOdd = true;
        cv.notify_all();
    }
}

int main() {
    std::thread t1(printOdd);
    std::thread t2(printEven);
    
    t1.join();
    t2.join();
    
    return 0;
}
```

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx;
int num = 1;

void printNumbers(bool isOdd) {
    while (num <= 100) {
        if ((num % 2 == 1) == isOdd) {
            std::unique_lock<std::mutex> lock(mtx);
            std::cout << num << std::endl;
            num++;
        }
    }
}

int main() {
    std::thread t1(printNumbers, true);  // 打印奇数
    std::thread t2(printNumbers, false); // 打印偶数

    t1.join();
    t2.join();

    return 0;
}
```
```cpp
#include <iostream>
#include <thread>
#include <mutex>
#include <condition_variable>

std::mutex mtx;
std::condition_variable cv;
int num = 1;

void printNumbers(bool isOdd) {
    while (num <= 100) {
        std::unique_lock<std::mutex> lock(mtx);
        // Wait for the condition to be met (isOdd for t1, !isOdd for t2)
        cv.wait(lock, [isOdd] { return (num % 2 == 1) == isOdd; });
        std::cout << num << std::endl;
        num++;
        cv.notify_all(); // Notify other thread to proceed
    }
}

int main() {
    std::thread t1(printNumbers, true);  // Print odd numbers
    std::thread t2(printNumbers, false); // Print even numbers

    t1.join();
    t2.join();

    return 0;
}
```
