
import _ from 'lodash';
export const jsToScssMap = (obj: object | null, isChild: boolean = false): string | null => {
    if (!obj) {
        return null
    }
    const entries = Object.entries(obj).map(([key, value]) => {
        if (typeof value === 'object') {
            return `${_.kebabCase(key)}: (${jsToScssMap(value, true)})`;
        }
        if (typeof value === 'number') {
            value = `${value}px`;
        }
        return `${_.kebabCase(key)} : ${value}`;
    });
    const map = entries.join(', ');
    if (isChild) {
        return `(${map})`;
    }
    return `${map};`;
};

const Utils = {
    jsToScssMap
}

export default Utils;