#include <condition_variable>
#include <mutex>
#include <future>
#include <iostream>
#include <chrono>
#include <queue>
 
bool isReady;
std::mutex mutex;
std::condition_variable condvar;
 
std::queue<int> messageQ;
 
void Producer()
{
    std::cout << "=== Producer ===" << std::endl;
    for (auto x = 0; x < 10; x++)
    {
        {
            std::lock_guard<std::mutex> guard(mutex);
            std::cout << "Producing message: " << x << " th" << std::endl;
            messageQ.push(x);
            isReady = true;
            condvar.notify_all();
        }
        std::this_thread::sleep_for(std::chrono::seconds(1));

    }
    std::cout << "=== Producer has completed ===" << std::endl;
 
}
 
void Consumer()
{
    std::cout << "\n\n=== Consumer started ===" << std::endl;

    for(;;) {
    std::unique_lock<std::mutex> ulock(mutex);
    std::cout << "\n\n=== Consumer is waiting ===" << std::endl;
    //std::lock_guard<std::mutex> ulock(mutex);
    condvar.wait(ulock, [] {
            return isReady; }
        );
    isReady = false;
 
    std::cout << "\n\n=== Consumer is ready to get message ===" << std::endl;
 
    while(!messageQ.empty())
    {
        int i = messageQ.front();
        std::cout << "Consuming message: " << i << " th" << std::endl;
        messageQ.pop();
    }
 
    if(!messageQ.empty())
        std::cout << "There are still messages remained from producer" << std::endl;
    else
        std::cout << "All messages from producer has been processed" << std::endl;
    }
 
 
}
 
 
int main()
{
    auto t1 = std::async(std::launch::async, Producer);
 
    auto t2 = std::async(std::launch::async, Consumer);
 
    //t1.get();
 
    //t2.get();
    std::cout << "\n\n=== Main done ===" << std::endl;
}
