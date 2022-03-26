const fs = require('fs');
const request = require('request');
const links = require('./links');

// Downloads images from URLS
const download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
  console.log('done');
});

// Pass an array of links to download as image_x where x
// is the links index in the array.
const massDownload = () => {
    for (let i = 0; i < links.length; i++){
        download(links[i], `image_${i}.png`, function(){
            console.log(`downloaded image #${i}`)
        })
    }
}
massDownload();
console.log("running")