var exec = require('child_process').execSync

var str = exec(`scp -r ./docs/vuepress/ root@${process.env.host}:/data/wwwroot/vue-dialog-x/homepage`)

console.log(str.toString("utf8").trim());

console.log('上传成功')

var str = exec(`scp -r ./docs/demo/ root@${process.env.host}:/data/wwwroot/vue-dialog-x/docs`)

console.log(str.toString("utf8").trim());

console.log('上传成功')
