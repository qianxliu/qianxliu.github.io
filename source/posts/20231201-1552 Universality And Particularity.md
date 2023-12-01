```
tags: LeetCode,AppliedComputer
```

# Universality And Particularity

Today let me talk about "philosophy". A complex issue, has a bigger influence on the complex reality.

Just because the math is a little too simple in real world, I couldn't deal with that at the moment.

## Rigorous LeetCode 5

<https://leetcode.cn/problems/longest-palindromic-substring/description/>

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        string ans;
        for (int i = 0; i < s.size(); ++i)
        {
            string s1 = palindrome(s, i, i);
            string s2 = palindrome(s, i, i+1);
            ans = ans.size() > s1.size() ? ans : s1;
            ans = ans.size() > s2.size() ? ans : s2;
        }
        return ans;
    }
    string palindrome(string s, int l, int r)
    {
        while(l >= 0 && r < s.size() && s[l] == s[r])
        {
            --l;
            ++r;
        }
        return s.substr(l+1, r-l-1);
    }
};
```

If it is this:

```cpp
    ans = s1.size() > ans.size() ? s1 : ans;
    ans = s2.size() > ans.size() ? s2 : ans;
```

The algorithm will be a little slower than previous.

So programmer who pursues extreme performance always care about

```bash
the distribution of inputs.
```

However, in reality, mathematicians(or others) are originally very few(exceptional).
