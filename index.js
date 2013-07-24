#! /usr/bin/env node

var fs = require('fs');
var os = require('os');
var exec = require('child_process').exec;
var child;
var EOL = os.EOL;

var args = process.argv.splice(2);
if (args.length < 2) {
  console.log(EOL + 'Usage: remind <time> <task>');
  console.log('Example: remind 5s Update Node.js', EOL);
  return;
}

var time = args.shift();
var task = args.join(' ');

var remind_at = Date.now();

// time format can be like 12:30pm, 5:25am, :10 (10 mins from now), :30 (30 mins from now)
if (time.indexOf(':') > -1) {
  console.log('Not supported yet');
  console.log(EOL + 'Usage: remind <time> <task>');
  console.log('Example: remind 5s Update Node.js', EOL);
  return;
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
var tmp_dir = os.tmpdir();
var remind_dir = 'remind-js/';

// having to do this because mac os x leopard is having some issues
if (os.platform() == 'darwin' || os.platform() == 'linux') {
  tmp_dir = '/tmp/';
}

var remind_dir_path = tmp_dir + remind_dir;
var task_file_path = remind_dir_path + Date.now() + '.txt';

//create remind dir if it does not exist yet
if (!fs.existsSync(remind_dir_path)) {
  process.chdir(tmp_dir);
  fs.mkdirSync(remind_dir);
}

var d = new Date(remind_at);
var date = d.toDateString() + ', ' + d.toLocaleTimeString();
var task_details = '-------------------------' + EOL + date + EOL + '-------------------------' + EOL + task;
fs.writeFileSync(task_file_path, task_details);

// display reminder details on the commandline
console.log(task_details);

// the file runner command to be executed
var command;
if (os.platform() == 'darwin') { command = 'open ' + task_file_path; }
else if (os.platform() == 'linux') { command = 'xdg-open ' + task_file_path; }
else { command = 'start ' + task_file_path; }

var check = setInterval(function() {
  if (Date.now() >= remind_at) {
    
    child = exec(command, function(error, stdout, stderr) {
      if (error) { console.log(error); }
      // stop the time checker
      clearInterval(check);
      // we need to delay the file delete a bit, else the file does not open sometimes
      setTimeout(function() {
        if (fs.existsSync(task_file_path)) { fs.unlinkSync(task_file_path); }
        console.log(EOL);
      }, 500);
      
    });
  }
}, 1000);
