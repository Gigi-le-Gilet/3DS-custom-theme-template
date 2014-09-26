var fs = require('fs-extra')
var path  = require('path')
var repo = require('../')
var assert = require('assert')
var async = require('async')

describe('repo-template', function(){

  it('copies', function(done){

    var data = {
      username: 'fritx',
      repoName: 'foo-bar',
      repoDesc: 'Bla bla bla..'
    }

    repo(f('./tmp'), data, function(err){
      if (err) return done(err)

      async.each([
        'package.json',
        'README.md'
      ], function(file, cb){
        testFile(file, data, cb)
      }, function(err){
        done(err)
      })
    })

  })

})



function testFile(file, data, cb){
  var src = f(path.join('../template', file))
  var dest = f(path.join('./tmp', file))

  try {
    var txtSrc = fs.readFileSync(src).toString()
    var txtDest = fs.readFileSync(dest).toString()

    var txt = txtSrc.replace(/\{\{([^\}]+)\}\}/g, function($0, $1){
      return data[$1]
    })
    assert.equal(txtDest, txt)
    cb()
  } catch(err) {
    if (err) return cb(err)
  }
}


function f(file){
  return path.resolve(__dirname, file)
}