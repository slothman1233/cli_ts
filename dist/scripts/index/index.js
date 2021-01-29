(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __exportStar = (target, module, desc) => {
    __markAsModule(target);
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", {value: module, enumerable: true}), module);
  };

  // node_modules/@stl/httpRequest/dist/index.js
  var require_dist = __commonJS((exports, module) => {
    !function(e, t) {
      typeof exports == "object" && typeof module != "undefined" ? t(exports) : typeof define == "function" && define.amd ? define(["exports"], t) : t((e = typeof globalThis != "undefined" ? globalThis : e || self).indexjs = {});
    }(exports, function(e) {
      "use strict";
      function t(e2) {
        return !!e2 && typeof e2 == "object";
      }
      function r(e2) {
        return t(e2) && Object.prototype.toString.call(e2) === "[object Object]" && e2.constructor === Object;
      }
      var o = function(e2) {
        return t(e2) ? Object.keys(e2) : [];
      };
      function a(t2, n2) {
        o(t2).forEach(function(e2) {
          return n2(t2[e2], e2);
        });
      }
      function p() {
        for (var e2 = [], t2 = 0; t2 < arguments.length; t2++)
          e2[t2] = arguments[t2];
        var n2 = {};
        return e2.forEach(function(e3) {
          e3 && a(e3, function(e4, t3) {
            r(e4) ? (r(n2[t3]) || (n2[t3] = {}), n2[t3] = p(n2[t3], e4)) : n2[t3] = e4;
          });
        }), n2;
      }
      var y = {timeOut: "\u8BF7\u6C42\u8D85\u65F6", noAuthority: "\u6CA1\u6709\u6743\u9650", parameterError: "\u53C2\u6570\u6709\u8BEF"}, i = window, l = {ajax: function(e2, o2, a2) {
        var t2;
        if (e2 === void 0 && (e2 = {}), (t2 = p({url: "", type: "GET", dataType: "json", async: true, data: null, headers: {}, timeout: 1e4, isFromdata: false, beforeSend: function(e3) {
        }, complete: function(e3, t3) {
        }}, e2)).url && t2.type && t2.data && t2.dataType) {
          var i2 = new XMLHttpRequest();
          i2.addEventListener("loadstart", function(e3) {
            t2.beforeSend(i2);
          }), i2.addEventListener("load", function(e3) {
            var t3 = i2.status;
            if (200 <= t3 && t3 <= 300 || t3 === 304) {
              var n3 = void 0;
              if (i2.responseType === "text")
                n3 = i2.responseText;
              else if (i2.responseType === "document")
                n3 = i2.responseXML;
              else if (i2.response) {
                n3 = "";
                try {
                  n3 = Object.prototype.toString.call(i2.response) === "[object String]" ? JSON.parse(i2.response) : i2.response;
                } catch (e4) {
                  n3 = i2.response;
                }
              } else {
                n3 = "";
                try {
                  n3 = Object.prototype.toString.call(i2.responseText) === "[object String]" ? JSON.parse(i2.responseText) : i2.responseText;
                } catch (e4) {
                  n3 = i2.responseText;
                }
              }
              o2(n3);
            } else {
              var r3 = l.getErrorObj("\u8BF7\u6C42\u9519\u8BEF", "ERR0003", t3);
              a2(r3);
            }
          }), i2.addEventListener("loadend", function(e3) {
            t2.complete(i2, i2.status);
          }), i2.addEventListener("error", function(e3) {
            var t3 = l.getErrorObj("\u8BF7\u6C42\u9519\u8BEF", "ERR0003", i2.status);
            a2(t3);
          }), i2.addEventListener("timeout", function(e3) {
            var t3 = l.getErrorObj("\u8BF7\u6C42\u8D85\u65F6", "ERR0002", 408);
            a2(t3);
          });
          var n2, r2 = false, s3 = t2.type.toUpperCase();
          s3 !== "GET" && s3 !== "DELETE" || (r2 = true, t2.url += l.getUrlParam(t2.url, t2.data));
          try {
            i2.open(t2.type, t2.url, t2.async);
          } catch (e3) {
            var u = l.getErrorObj("\u521D\u59CB\u5316\u8BF7\u6C42\u9519\u8BEF", "ERR0001", i2.status);
            return void a2(u);
          }
          if (i2.responseType = t2.dataType, t2.headers)
            for (var c = 0, f = Object.keys(t2.headers); c < f.length; c++) {
              var d = f[c];
              i2.setRequestHeader(d, t2.headers[d]);
            }
          t2.async && t2.timeout && (i2.timeout = t2.timeout), n2 = t2.isFromdata ? t2.data : r2 ? null : t2.headers["Content-Type"] && 0 <= t2.headers["Content-Type"].indexOf("application/json") ? JSON.stringify(t2.data) : l.getQueryString(t2.data), i2.send(n2);
        } else
          y.parameterError;
      }, getErrorObj: function(e2, t2, n2) {
        return {bodyMessage: null, code: "-1", message: e2, subCode: t2, status: n2};
      }, getUrlParam: function(e2, t2) {
        if (!t2)
          return "";
        var n2 = t2 instanceof Object ? l.getQueryString(t2) : t2;
        return e2.indexOf("?") !== -1 ? n2 : "?" + n2;
      }, getQueryString: function(e2) {
        var r2 = [];
        return e2 instanceof Object && a(e2, function(e3, t2) {
          var n2 = e3;
          r2.push(encodeURIComponent(t2) + "=" + encodeURIComponent(n2));
        }), r2.join("&");
      }, request: function(e2) {
        e2 === void 0 && (e2 = {});
        function r2(e3, t2) {
          t2 === 401 ? y.noAuthority : t2 === 408 && y.timeOut;
        }
        e2.beforeSend = (e2.beforeSend || function() {
        }).before(function(e3) {
        });
        var o2 = e2.success;
        e2.success = function(e3, t2, n2) {
          e3 && e3 instanceof Object && e3.code !== 1 ? r2(0, t2) : o2 && o2(e3, t2, n2);
        }, e2.error = (e2.error || function() {
        }).before(function(e3, t2, n2) {
          r2(0, t2);
        }), e2.complete = (e2.complete || function() {
        }).after(function(e3, t2) {
        }), l.ajax.before(l.addAuthorizationHeader)(e2);
      }, addAuthorizationHeader: function(e2) {
        e2.headers = e2.headers || {};
        var t2 = "Authorization";
        Object.keys(e2.headers).some(function(e3) {
          return e3 === t2;
        }) || (e2.headers[t2] = "test");
      }};
      Function.prototype.before = function(n2) {
        var r2 = i;
        return function() {
          for (var e2 = [], t2 = 0; t2 < arguments.length; t2++)
            e2[t2] = arguments[t2];
          n2.apply(i, e2), r2.apply(i, e2);
        };
      }, Function.prototype.after = function(n2) {
        var r2 = i;
        return function() {
          for (var e2 = [], t2 = 0; t2 < arguments.length; t2++)
            e2[t2] = arguments[t2];
          r2.apply(i, e2), n2.apply(i, e2);
        };
      };
      var s2 = function(e2) {
        this.dataType = "json", this.data = {}, this.headers = {}, this.beforeSend = function() {
        }, this.complete = function() {
        }, this.headers = e2.headers, this.type = e2.type, this.isFromdata = e2.isFromdata || false;
      }, n = {get: function(e2) {
        var n2 = p(new s2({headers: {}, type: "GET"}), e2);
        return new Promise(function(e3, t2) {
          l.ajax(n2, e3, t2);
        });
      }, delete: function(e2) {
        var n2 = p(new s2({headers: {}, type: "DELETE"}), e2);
        return new Promise(function(e3, t2) {
          l.ajax(n2, e3, t2);
        });
      }, post: function(e2) {
        var n2 = p(new s2({headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}, type: "POST"}), e2);
        return new Promise(function(e3, t2) {
          l.ajax(n2, e3, t2);
        });
      }, put: function(e2) {
        var n2 = p(new s2({headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-HTTP-Method-Override": "put"}, type: "POST"}), e2);
        return new Promise(function(e3, t2) {
          l.ajax(n2, e3, t2);
        });
      }, postbody: function(e2) {
        var n2 = p(new s2({headers: {"Content-Type": "application/json; charset=UTF-8"}, type: "POST"}), e2);
        return new Promise(function(e3, t2) {
          l.ajax(n2, e3, t2);
        });
      }, fromData: function(e2) {
        var n2 = p(new s2({headers: {}, type: "POST", isFromdata: true}), e2);
        return new Promise(function(e3, t2) {
          l.ajax(n2, e3, t2);
        });
      }};
      e.http = n, Object.defineProperty(e, "__esModule", {value: true});
    });
  });

  // work/common/service/http.ts
  var import_httpRequest = __toModule(require_dist());
  var http_default = import_httpRequest.http;

  // work/common/service/LoginService/LoginService.ts
  var login = (info) => http_default.post({
    url: "/login/loginByAccount"
  });

  // work/page/index/index.ts
  login({username: "ss", password: "s"});
  function s() {
    let a = 122;
  }
  s();
})();
