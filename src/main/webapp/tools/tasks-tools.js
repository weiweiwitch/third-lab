var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var join = require('path').join;
var fs = require('fs');
var readdirSync = fs.readdirSync;
var existsSync = fs.existsSync;
var lstatSync = fs.lstatSync;
var PATH = require('./config').PATH;

var TASKS_PATH = join(PATH.tools, 'tasks');

// 自动注册任务
function autoRegisterTasks() {
    scanDir(TASKS_PATH, (taskname) => {
        registerTask(taskname);
    });
}

function task(taskname, option) {
    // 获取目标任务构造
    var taskPath = join('..', 'tools', 'tasks', taskname);
    var t = require(taskPath);

    // 执行任务构造，返回任务执行对象。
    return t(gulp, plugins(), option);
}


// private

// 注册任务
function registerTask(taskname, filename, option) {
    console.log('register task ' + taskname);
    gulp.task(taskname, task(filename || taskname, option));
}

// 遍历任务目录，对任务定义文件做相关处理。
function scanDir(root, cb) {
    if (!existsSync(root))
        return;

    walk(root);

    function walk(path) {
        readdirSync(path).forEach(function (file) {
            var curPath = join(path, file);
            if (lstatSync(curPath).isDirectory()) {
                path = file;
                walk(curPath);
            }
            if (lstatSync(curPath).isFile() && file.endsWith('.js')) {
                var taskname = file.replace(/(\.js)/, '');
                cb(taskname);
            }
        })
    }
}

module.exports = {
    autoRegisterTasks: autoRegisterTasks,
    task: task
};
