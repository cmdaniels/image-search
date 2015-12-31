# image-search

A simple API service to search Flickr for images

### Example usage:

    https://cmd-image-search.herokuapp.com/lolcats%20funny?offset=10

#### OR

    https://cmd-image-search.herokuapp.com/recentQueries

### Example output:

    [{"url": "((image URL))", "snippet": "((desc))", "thumbnail": "((thumbnail URL))", "context": "((image origin))"}, ... ]

#### OR

    [{"term": "((search term))", "when": "((timestamp))"}, ... ]
