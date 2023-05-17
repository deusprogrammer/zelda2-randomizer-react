export const randomSeed = (a) => {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export const merge = (list1, list2) => {
    list2.forEach(element => {
        if (!list1.includes(element)) {
            list1.push(element);
        }
    });
    return list1;
}

export const removeNode = (nodes, nodeName) => {
    return nodes.filter(node => node !== nodeName);
}

export const deepCopy = (object) => {
    return JSON.parse(JSON.stringify(object));
}