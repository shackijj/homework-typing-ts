function isPlainObject(obj) {
    var toString = Object.prototype.toString;
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
        return false;
    }
    var prototype = Object.getPrototypeOf(obj);
    return prototype === null ||
        prototype === Object.prototype;
}
var extend = function extend() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var target = args[0];
    var deep;
    var i;
    if (typeof target === 'boolean') {
        deep = target;
        target = args[1];
        i = 2;
    }
    else {
        deep = false;
        i = 1;
    }
    for (; i < arguments.length; i++) {
        var obj = args[i];
        if (!obj) {
            continue;
        }
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                var val = obj[key];
                var isArray = val && Array.isArray(val);
                if (deep && val && (isPlainObject(val) || isArray)) {
                    var src = target[key];
                    var clone = void 0;
                    if (isArray) {
                        clone = src && Array.isArray(src) ? src : [];
                    }
                    else {
                        clone = src && isPlainObject(src) ? src : {};
                    }
                    target[key] = extend(deep, clone, val);
                }
                else {
                    target[key] = val;
                }
            }
        }
    }
    return target;
};
var test1_object1 = {
    p1: 1,
    p2: 'string',
    p3: true
};
var test1_object2 = {
    p4: [1, 2],
    p5: null,
    p6: undefined
};
var test1_result = extend(false, test1_object1, test1_object2);
//# sourceMappingURL=index.js.map