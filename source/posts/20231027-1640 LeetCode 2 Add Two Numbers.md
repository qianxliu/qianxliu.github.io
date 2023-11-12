```
tags: LeetCode
```

> https://leetcode.cn/problems/add-two-numbers/description/

# Add Two Numbers
```cpp
#include<iostream>

using namespace std;

struct ListNode
{
	int val;
	ListNode* next;
	ListNode() : val(0), next(nullptr){};
	ListNode(int x) : val(x), next(nullptr){};
	ListNode(int x, ListNode *next) : val(x), next(next){};
};

ListNode* list(vector<int> v)
{
	ListNode* dummy = new ListNode(), *p = dummy;
	for (auto i : v)
	{
		p->next = new ListNode(i);
		p = p->next;
	}
	return dummy->next;
}

ListNode* addTwoNumbers(ListNode* l1, ListNode* l2)
{
	ListNode* dummy = new ListNode(), *p = dummy;
	int carry = 0;
	while(l1 || l2 || carry)
	{
		if (l1)
		{
			carry += l1->val;
			l1 = l1->next;
		}
		if (l2)
		{
			carry += l2->val;
			l2 = l2->next;
		}
		p->next = new ListNode(carry%10);
		carry /= 10;
		p = p->next;

	}
	return dummy->next;
}

int main()
{
	ListNode* l1 = list({9,9,9,9,9,9,9});
	ListNode* l2 = list({9,9,9,9});

	ListNode* res = addTwoNumbers(l1, l2);
	while(res)
	{
		cout << res->val << '\n';
		res = res->next;
	}
}
```

```bash
g++ leetcode2.cpp -std=c++11
```

-std=c++11 for list initialization {}.