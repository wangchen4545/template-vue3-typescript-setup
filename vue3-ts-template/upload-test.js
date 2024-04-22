var fs = require('fs');
var request = require('request');
const { projectName,projectPath } = require("./ask.js");
const dist = projectPath.substring(0,projectPath.indexOf(projectName))

function minner(source, dest) {
    var file = fs.createReadStream(source);
 
    var formData = {
        my_file: file,
        my_field: dest,
    };
 
    request.post(
        {
            url: 'http://cf-test.jd.com/deploy',
            formData: formData,
        },
        function optionalCallback(err) {
            if (err) {
                return console.error('jdf minner upload failed:', err);
            }
            console.log('jdf minner upload success!');
        }
    );
}
 
console.log(`${projectName}.zip 上传到 /export/data/cf-test.jd.com/ 目录`);
minner(`./dist/${projectName}.zip`, `/export/data${dist}`);