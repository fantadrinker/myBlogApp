


`<source>` can be nested inside `<video>` tags to include different source options 
(different codecs, resolutions, etc.)

```html
<video controls>
  <source src=hi-res.ogv ... media="min-device-width: 800px">
  <source src=lo-res.ogv>
</video>
```

the way of captioning introduced is interesting, 
first it brought up `<track kind=captions src=captions.srt>`

but it's not implemented yet according to the book, but an alternative is to use javascript to overlay caption on to the video.