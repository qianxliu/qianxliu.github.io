```
tags: top
```

> https://leetcode.cn/problems/longest-common-prefix/description/
> What's the "sort"?
> A kind of overresearched cheating methods
> Loosely speaking, it is similar to calculus in mathematics

```cpp
class Solution {

public:
    string longestCommonPrefix(vector<string> &strs) {
        if (strs.size() == 1)   return strs[0];
        sort(strs.begin(), strs.end());

        string &front = strs.front();
        string &back = strs.back();

        for (int i = 0; i < front.size(); ++i)
        {
            if (front[i] != back[i]) return front.substr(0, i);
        }
        return front;
    }
};
```