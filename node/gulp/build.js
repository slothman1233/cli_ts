var path = require("path");
var paths = {
    jspages: [
        getSrc("./dev/test/file1.ts"),
    ]
};
//获取文件的绝对地址
function getSrc(src) {
    return path.resolve(__dirname, '../../Scripts', src);
}

function isArrayFn(value) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}



exports.paths = paths;
exports.getSrc = getSrc;
exports.isArrayFn = isArrayFn;