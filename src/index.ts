/**
 * Проверяет, что переданный объект является "плоским" (т.е. созданным с помощью "{}"
 * или "new Object").
 */
function isPlainObject(obj: Object): boolean {
    const toString = Object.prototype.toString;

    if (toString.call(obj) !== '[object Object]') {
        return false;
    }

    const prototype = Object.getPrototypeOf(obj);
    return prototype === null ||
        prototype === Object.prototype;
}

export function extend<T extends object, S extends object>(deep: boolean, target: T, source: S): T & S;
export function extend<T extends object, S1 extends object, S2 extends object>(deep: boolean, target: T, source1: S1, source2: S2): T & S1 & S2;
export function extend<T extends object, S1 extends object, S2 extends object, S3 extends object>(deep: boolean, target: T, source1: S1, source2: S2, source3: S3): T & S1 & S2 & S3;
export function extend<T extends object, S1 extends object, S2 extends object, S3 extends object, S4 extends object>(deep: boolean, target: T, source1: S1, source2: S2, source3: S3, source4: S4): T & S1 & S2 & S3 & S4;
export function extend<T extends object, S extends object>(target: T, source: S): T & S;
export function extend<T extends object, S1 extends object, S2 extends object>(target: T, source1: S1, source2: S2): T & S1 & S2;
export function extend<T extends object, S1 extends object, S2 extends object, S3 extends object>(target: T, source1: S1, source2: S2, source3: S3): T & S1 & S2 & S3;
export function extend<T extends object, S1 extends object, S2 extends object, S3 extends object, S4 extends object>(target: T, source1: S1, source2: S2, source3: S3, source4: S4): T & S1 & S2 & S3 & S4;
export function extend(...args: any[]): any {
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    let target = args[0];
    let deep;
    let i;

    // Обрабатываем ситуацию глубокого копирования.
    if (typeof target === 'boolean') {
        deep = target;
        target = args[1];
        i = 2;
    } else {
        deep = false;
        i = 1;
    }

    for (; i < args.length; i++) {
        const obj = args[i];
        if (!obj) {
            continue;
        }

        for (const key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                const val = obj[key];
                const isArray = val && Array.isArray(val);

                // Копируем "плоские" объекты и массивы рекурсивно.
                if (deep && val && (isPlainObject(val) || isArray)) {
                    const src = target[key];
                    let clone;
                    if (isArray) {
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }
                    target[key] = extend(deep, clone, val);
                } else {
                    target[key] = val;
                }
            }
        }
    }

    return target;
};
