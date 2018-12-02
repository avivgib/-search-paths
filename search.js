
var path = require('path');
var fs=require('fs');

var hasFiles = false;
var extFilter = process.argv[2];//add a extension
var strFilter = process.argv[3];//add a word

if (!extFilter || !strFilter) {
  console.log("USAGE: node search [EXT] [TEXT]");
}
else {
  fromDir("./", extFilter, strFilter);
  if (!hasFiles) {
    console.log("No file was found");
  }
}
function fromDir(startPath,extension,string){
  var files=fs.readdirSync(startPath);
  for(var i=0;i<files.length;i++){
    var filename = path.join(startPath,files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()){
      fromDir(filename,extension,string); //recurse
    }
    else if (filename.indexOf(extension)>=0) {
      var anyFile = fs.readFileSync(filename, "utf8");
      var regex = new RegExp("\\b(" + string + ")\\b",'i');//regex get word to search
      var results = regex.test(anyFile);
      if (results) {
        hasFiles = true;
        console.log("%s",path.resolve("./") + "\\"+ filename);
      }
    }
  }
}
