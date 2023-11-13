```
tags: LeetCode,AppliedComputer
```

# Memo Pack

Source code: 
git.suckless.org/sbase
I don't know if it's the standard implementation for Linux bash command, but it's a good material.
An example: 
```bash
diff $(strace -c find) $(strace -c grep)
diff <(strace -c find) <(strace -c grep)
```
The <( expression: https://stackoverflow.com/questions/31703243/what-is-the-name-for-operator-in-bash
We can see the "find" is a more complex(stat, ..., and so on) implementation than the "grep"

## Rigorous LeetCode 3
```cpp
class Solution {
public:
    //You need to memo the count of characters
    int lengthOfLongestSubstring(string s) {
        unordered_map<char,int> window;
        int left = 0, right = 0;
        int maxLen = 0;
        while(right < s.size())
        {
            char c = s[right];
            ++right;
            ++window[c];
            while(window[c] > 1)
            {
                ++left;
                --window[c];
            }
            maxLen = max(maxLen, right - left);
        }
        return maxLen;
    }
};
```
Unfortunately, it's wrong. **Everyone** could be wrong.
```cpp
class Solution {
public:
    //You need to memo the count of characters
    int lengthOfLongestSubstring(string s) {
        unordered_map<char,int> window;
        int left = 0, right = 0;
        int maxLen = 0;
        while(right < s.size())
        {
            char c = s[right];
            ++window[c];
            ++right;
            while(window[c] > 1)
            {
                char d = s[left];
                --window[d];
                ++left;
            }
            maxLen = max(maxLen, right - left);
        }
        return maxLen;
    }
};
```
"pww", and "w" will not be first. And if "wabbw", the "abbw" still has the same pattern.
The left window has no relation with the right.
