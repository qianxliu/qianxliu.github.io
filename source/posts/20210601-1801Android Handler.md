> 关于Handler，Google官方给予了以下解释

# Looper

Looper类用于为线程运行消息循环。默认情况下，线程没有与之关联的消息循环；要创建一个，请在要运行循环的线程中调用prepare（），然后调用loop（），让它处理消息，直到循环停止。
Class used to run a message loop for a thread. Threads by default do not have a message loop associated with them; to create one, call prepare() in the thread that is to run the loop, and then loop() to have it process messages until the loop is stopped.

大多数与消息循环的交互都是通过Handler类进行的。
Most interaction with a message loop is through the Handler class.

这是一个典型的Looper线程实现示例，使用prepare（）和loop（）的分离来创建一个初始处理程序来与Looper通信。
This is a typical example of the implementation of a Looper thread, using the separation of prepare() and loop() to create an initial Handler to communicate with the Looper.

```java
  class LooperThread extends Thread {
      public Handler mHandler;

      public void run() {
          Looper.prepare();

          mHandler = new Handler(Looper.myLooper()) {
              public void handleMessage(Message msg) {
                  // process incoming messages here
              }
          };

          Looper.loop();
      }
  }
```