# Javascript-LazyForm-Module
A simple module to collect the data from the form. Built as a fluent pattern so its easy to use.

## How to use

say we have following HTML.
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Demo</title>
  </head>
  <body>
    <form id="form" action="" method="">
      <input type="hidden" name="_token" value="somerandomtoken">
      <input type="text" name="keywords">
      <select name="category">
        <option selected readonly>Select..</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
      <input type="radio" name="option">
      <input type="submit" value"Submit Form"> 
    </form>
  </body>
</html>
```

Now we can use it like so:
```javascript
  var form = document.getElementById('#form');
  
  form.onsubmit = function() {
    var data = LazyForm.select(this)
                       .get(['inputs', 'selects', 'hidden'])
                       .toJson(); // or you can use toQueryString()
                       
     // send the ajax with the data
  }
  
```

You also can use it outside of the event and pass the right selector like so(which is not so commonly used):
```javascript
  LazyForm.select('#form')
          .get(['inputs', 'selects', 'hidden'])
          .toJson();
```

## Options
 - LazyForm.select() // accepts form object or a selector 
 - LazyForm.get(['inputs', 'selects', 'hidden', 'radioboxs', 'checkboxs']) // will query only the ones needed.
 - LazyForm.toJson() // turns the data into a json object
 - LazyForm.toQueryString // turns the data into a key-value pairs

## Notes
This still does not support multiple forms instances on a single request. You are welcome to send pull request to improve it.
