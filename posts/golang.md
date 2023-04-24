---
title: 'Daily blog - Golang Learning'
date: '2023-04-23'
---

## background

Today I started learning about golang, because I wanted to build a server that handles chatroom logic. Concurrency will be a major challenge for me to build this.

## Google cloud platform

I have $400 credits to spend in 44 days on GCP, so I provisioned a VM on GCP to experiment with. Hopefully I can use this to grow the app to not only handle/route chat logic, but also video chat using webRTC.

## Golang

Why did I choose golang? I like it for the following reasons:

- it's more modern.
- simpler syntaxes, not restrained to existing enterprise users like C# and Java
- less boilerplate (similar reason as above)
- more function oriented, and c-like
- easier to use/learn concurrency concepts

## Learning notes

### Building/Tooling

- `go build ...` builds go code/module into executable binaries, but only compatible for the building environment to execute, so if you want to build for your linux server with a different cpu architecture or instruction set, you will need to modify a few flags/env variables like this 
```
$ env GOOS=linux GOARCH=amd64 go build ...
```

- if just `go build ` is run, it won't produce any executable, but tries to build to see if theres any error and save the build result locally.

- `go install ...` builds and installs the module into `GOBIN` environment varaible, so you are able to run it from terminal later on.


### Language syntaxes

- Modulizing - to export a method/function in a `.go` file, just capitalize the first letter

- Go seems to use pass-by-value by default except slices, channel, maps some built-in complex data types. I don't know why, but the following code seem to work fine without passing by reference for the `MTMap` (Multi-Thread-Map) instance.

```
package main

import (
	"fmt"
	"sync"
)

type Fetcher interface {
	// Fetch returns the body of URL and
	// a slice of URLs found on that page.
	Fetch(url string) (body string, urls []string, err error)
}

type MTMap struct {
	mu sync.Mutex
	v  map[string]int
}

func (m MTMap) contains_string(s string) bool {
	m.mu.Lock()
	defer m.mu.Unlock()
	return m.v[s] == 1
}

func (m MTMap) add_string(s string) bool {
	m.mu.Lock()
	if m.v[s] != 1 {
		m.v[s] = 1
	} else {
		m.mu.Unlock()
		return false
	}
	m.mu.Unlock()
	return true
}

// Crawl uses fetcher to recursively crawl
// pages starting with url, to a maximum of depth.
func Crawl(url string, depth int, fetcher Fetcher, m MTMap, buf_ch chan int) {
	// TODO: Fetch URLs in parallel.
	// TODO: Don't fetch the same URL twice.
	// This implementation doesn't do either:
	defer func() {
		// fmt.Println("debug: finishing visiting url %s", url)
		buf_ch <- 1
	} ()
	if m.contains_string(url) {
		return
	}
	if depth <= 0 {
		return
	}
	m.add_string(url)
	body, urls, err := fetcher.Fetch(url)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("found: %s %q\n", url, body)
	buf_chan_loc := make(chan int, 100)
	for _, u := range urls {
		// fmt.Println("debug: visiting url %s", u)
		go Crawl(u, depth-1, fetcher, m, buf_chan_loc)
	}
	for range urls {
		<- buf_chan_loc
	}
	return
}

func main() {
	m := MTMap{v: make(map[string]int)}
	// do not block on input
	buf_ch := make(chan int, 100)
	go Crawl("https://golang.org/", 4, fetcher, m, buf_ch)
	<-buf_ch
}

/*
should output these
found: https://golang.org/ "The Go Programming Language"
found: https://golang.org/pkg/ "Packages"
not found: https://golang.org/cmd/
found: https://golang.org/pkg/fmt/ "Package fmt"
found: https://golang.org/pkg/os/ "Package os"
*/

// fakeFetcher is Fetcher that returns canned results.
type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	if res, ok := f[url]; ok {
		return res.body, res.urls, nil
	}
	return "", nil, fmt.Errorf("not found: %s", url)
}

// fetcher is a populated fakeFetcher.
var fetcher = fakeFetcher{
	"https://golang.org/": &fakeResult{
		"The Go Programming Language",
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &fakeResult{
		"Packages",
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &fakeResult{
		"Package fmt",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &fakeResult{
		"Package os",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}

```
