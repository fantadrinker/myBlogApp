---

title: 'HTML5 study note'

date: '2023-07-04'

---

Today I am reading a book that I borrowed from library last weekend.

"Introducing HTML5"

< insert reason I got it >

## the \<head\>
```
<!doctype html>
<meta charset=utf-8>
```

These two lines does not have strict syntax, just 
pick one and stick to it.
What's more, this following code is valid despite missing 
`html`, `body` or `head` tags

```
<!doctype html>
<meta charset=utf-8>
<p>hello mom</p>
```

the reason is that html parser in browser assumes those fields 
anyways. But to make the code more readable it is suggested
to include them.

Then I went through the header, footer, nav, and article
elements, I think it's a good idea to style them instead 
of divs with class tags.

This is the stackblitz example I tried

https://stackblitz.com/edit/web-platform-ebqfd7?file=index.html