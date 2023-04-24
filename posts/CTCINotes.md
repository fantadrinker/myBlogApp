---
title: 'Daily blog - Interview Prep'
date: '2023-03-01'
---

Interview Prep



## Is Unique

implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?

---
### Notes

unique characters -> yes, duplicate -> no

"a" -> yes
"b" -> no
"abc" -> yes
"aba" -> no
"" -> yes?

### Solution

with additional data structure

    def isSuperString(str):
        occurances = new Set()
        for ch in str:
            if occurances.contains(str):
                return false
            else:
                occurances.add(ch)
        return true

Runtime: O(n), because set lookup is O(1) ??? 
Space: O(n)

without additional ds:

    def isSuperString(str):
        # use recurrence, idea: borrow stack
        if len(str) == 1:
            return true
        if !isSuperStringAcc(str[1:]):
            return false
        for ch in str[1:]:
            if str[0] == ch:
                return false
        return true

Runtime: O(n^2)
Space: O(1) ??? but uses O(n) spaces of stacks

---
### Check Permutation:

Given two strings, write a method to decide if one is a permutation of the other

### Notes

"a", "b" => false
"a", "a" => true
"aba", "baa" => true
"aba", "ab" => false

easy check: same length

main check: for each character, same number of occurances

idea: construct hashmap for each character of the first string. dictionary of (char, occurances)

### Code

initial solution

    def arePerm(str1, str2):
        if len(str1) != len(str2):
            return false

        charOccs = new HashMap()
        for ch in str1: # m times
            if ch is in charOccs: # O(1)
                charOccs[ch] += 1
            else:
                charOccs[ch] = 1

        for ch in str2: # n times
            if ch is not in charOccs or charOccs[ch] == 0: # O(1)
                return false
            else:
                charOccs[ch] -= 1
        
        for value in charOccs.values: # max(n, m)
            if value != 0:
                return false
        return true

time: O(n) (m = n)

space: O(n)

Option 2: O(1) space, in-place check

    def arePerm(str1, str2):
        # good to have this here so we can assume the two string is of same length
        if len(str1) != len(str2):
            return false

        # sort str2 to be the same as str1
        ptr1 = 0
        for ch in str1: # O(n)
            # or do a inner loop here
            index2 = find(ch, str2[ptr1:]) # O(n)
            if index2 == -1:
                return false
            str2.swapInPlace(ptr1, index2)
            ptr1 += 1


---

### URLify

Write a method to replace all spaces in a string with '%20'

Example:

input: "Mr 3ohn Smith" 13

output: "Mr%203ohn%20Smith"

### Solution

use pointer

    def urlify(str, len):
        i = 0
        newStr = ""
        while i < len:
            if str[i] == " ":
                newStr += "%20"
            else:
                newStr += str[i] 
            i++
        return newStr

Better solution with O(1) space, O(n) runtime

    def urlifyBetter(str, len):
        # first pass determine size of the end array
        spaces = countOccurances(" ", str) # need to count until last non-ws character

        newLen = len + spaces * 2 # each space to %20 replacement increment length by 2

        ptr1 = len - 1
        ptr2 = newLen - 1
        while ptr1 >= 0:
            if str[ptr1] == " ":
                str[ptr2] = '0'
                str[ptr2-1] = '2'
                str[ptr2-2] = '%'
                ptr2 -= 3
            else:
                str[ptr2] = str[ptr1]
            ptr1 --
        return str

---

### Palindrome Perm

check if string is a permutation of a palindrome.

1. remove spaces, make everything lower case
2. check if all characters except 1 have even # of occurances

---
### One Away

