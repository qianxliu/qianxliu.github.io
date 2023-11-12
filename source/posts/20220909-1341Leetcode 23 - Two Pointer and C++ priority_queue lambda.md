# Leetcode 23 - Two Pointer and C++ priority_queue lambda

```cpp
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        // struct must init correct
        ListNode* dummy = new ListNode(0);
        auto cmp = [](ListNode* &a, ListNode* &b)
        {
            return a->val > b->val;
        };

        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
        
        for (ListNode* &list : lists)
        {
            if (list != nullptr)    pq.push(list);
        }
        ListNode* node = dummy;
        while(!pq.empty())
        {
            node->next = pq.top();
            node = node->next;
            pq.pop();
            if (node->next != nullptr)   pq.push(node->next);
        }
        return dummy->next;
    }
};
```

编写时问题在于ListNode* dummy = new ListNode(0);
本来用ListNode* dummy，但是指针必须指向一个初始化的结构体