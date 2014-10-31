var fs = require('fs-extra')
var path = require('path')
var async = require('async')

module.exports = function(dest, data, cb){
  var src = f('./template')

  try {
    fs.mkdirpSync(dest)
    fs.copySync(src, dest)
  } catch(err) {
    if (err) return cb(err)
  }

  async.waterfall([
    renameFiles,
    fillFiles
  ], cb)


  function fillFiles(cb){
    async.each([
      'package.json',
      'README.md'
    ], function(file, cb){
      file = path.resolve(dest, file)
      replace(file, data, cb)
    }, cb)
  }

  function renameFiles(cb){
    async.each([
      '0.gitignore',
      '0.npmignore'
    ], function(file, cb){
      file = path.resolve(dest, file)
      file_ = path.join(
        path.dirname(file),
        path.basename(file).slice(1)
      )
      fs.rename(file, file_, cb)
    }, cb)
  }
}


function replace(file, data, cb){
  fs.readFile(file, function(err, buf){
    if (err) return cb(err)
    var txt = buf.toString()
    txt = txt.replace(/\{\{([^\}]+)\}\}/g, function($0, $1){
      return data[$1]
    })
    fs.writeFile(file, txt, cb)
  })
}

function f(file){
  return path.resolve(__dirname, file)
}