#!/usr/bin/env node

var repo = require('./')
var args = require('minimist')(process.argv.slice(2))
var util = require('util')
var path = require('path')

var data = {
  username: args._[0],
  repoName: args._[1],
  repoDesc: args._[2]
}

var dest = args._[3] || '.'

repo(dest, data, function(err){
  dest = path.resolve(dest)
  var msgErr = util.format('Repo %s/%s at %s fails\n',
      data.username, data.repoName, dest)
  var msgSucc = util.format('Repo %s/%s sets up at %s\n',
    data.username, data.repoName, dest)

  if (err) {
    return process.stdout.write(msgErr)
  }
  process.stdout.write(msgSucc)
})