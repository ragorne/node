const fs = require('fs');

console.log('Hello World');
fs.access('files', (err, data)=>{
	if(err){
		console.error(err)
	}else {
	console.log(data);
	fs.readfile('file2', 'utf8', (err2, data2)=>{
		if(err){
			console.error(err)
		}
		console.log(data2);
	})
	}
})