---

title: 'html5 learning - forms'

date: '2023-07-05'

---

## HTML learning part 2

### Form element outside of form tag
this magically work, by linking form id with a input element 
outside of form tags, in this case the textarea element is linked with the form

```html
<form id=test-form>
  <label for="name">Name </label>
  <input type="text" name="name" id="name" />
  ...
</form>
<textarea form=test-form></textarea>