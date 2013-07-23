#! /usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;
var child;

var args = process.argv.splice(2);
if (args.length < 2) {
  console.log('\nUsage: remind <time> <task>');
  console.log('Example: remind 5s Update Node.js\n');
  return;
}

var time = args.shift();
var task = args.join(' ');

var remind_at = Date.now();

// time format can be like 12:30pm, 5:25am, :10 (10 mins from now), :30 (30 mins from now)
if (time.indexOf(':') > -1) {
  console.log('Not supported yet');
}
// time format can also be like 1h30m, 45m5s, 59s etc. 
else {
  time = time.split('h');
  if (time.length > 1) {
    remind_at += time.shift() * 3600000;
  }

  time = time.join('').split('m');
  if (time.length > 1) {
    remind_at += time.shift() * 60000;
  }

  time = time.join('').split('s');
  if (time.length > 1) {
    remind_at += time.shift() * 1000;
  }
}

// we will keep the tasks reminder in the tmp dir, for now
var tmp_dir = '/tmp/';
var remind_dir = 'remind-js/';
var remind_dir_path = tmp_dir + remind_dir;
var task_file_path = remind_dir_path + Date.now() + '.txt';

//create remind dir if it does not exist yet
if (!fs.existsSync(remind_dir_path)) {
  process.chdir(tmp_dir);
  fs.mkdirSync(remind_dir);
}

var d = new Date(remind_at);
var date = d.toDateString() + ', ' + d.toLocaleTimeString();
var task_details = '-------------------------\n' + date + '\n-------------------------\n' + task;
fs.writeFileSync(task_file_path, task_details);

console.log(task_details);

var check = setInterval(function() {
  if (Date.now() >= remind_at) {
    
    var command = 'open ' + task_file_path;
    child = exec(command, function(error, stdout, stderr) {
      if (error) { console.log(error); }
      // we need delay the file delete a bit, else the file does not open
      setTimeout(function() {
        fs.unlinkSync(task_file_path);
        console.log('REMINDER: ' + task.toUpperCase() + '!\n');
        clearInterval(check);
      }, 500);
      
    });
  }
}, 1000);
