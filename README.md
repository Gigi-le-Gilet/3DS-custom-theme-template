# repo-template

A template for project repository

## Usage

### CLI Tool

```
$ repo <username> <repoName> <repoDesc> [dest]
```

```
$ cd foo-bar
$ repo fritx foo-bar "Bla bla bla.."
>>> Repo fritx/foo-bar sets up at /home/fritx/repo/foo-bar
```

### Node Module

```js
var repo = require('repo-template')
repo('./foo-bar', {
  username: 'fritx',
  repoName: 'foo-bar',
  repoDesc: 'Bla bla bla..'
}, function(err){
  // repo template sets up
})
```