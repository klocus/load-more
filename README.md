# Load More!
Simple jQuery plugin that downloads remote content by AJAX on scroll or on button click.

## Options
Name | Type | Default | Description
------------ | -------------
containerSelector | string | #posts | A container in which dynamic content appears
loadingSelector | string | #loading | Loading element
requestUrl | string | objects.php?page= | An address that will return dynamic HTML content
requestOnStart | boolean | true | Loads dynamic content as soon as the page loads
requestOnScroll | boolean | false | Loading dynamic content with page scrolling down
onComplete | function | null | A function that is performed after loading dynamic content

## Using
### Without options
```html
<script>
    $('#button-selector').loadMore();
</script>
```

### With options
<script>
    $('#load-more').loadMore({
        containerSelector: '#posts',
        requestUrl: 'objects.php?page=',
        requestOnStart: true,
        requestOnScroll: false,
        loadingSelector: '#loading',
        onComplete: function() {
            alert('Hello World!');
        }
    });
</script>
