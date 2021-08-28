export class MappingHelper {
  static mapObject(obj: any): any {
    for (let [key, value] of Object.entries(obj)) {
      const splitKey = key.split('_');
      if (splitKey.length > 1) {
        let newKey = splitKey.map((c, i) => i == 0 ? c : c[0].toUpperCase() + c.slice(1)).join('');
        Object.defineProperty(obj, newKey, {
          value: value,
          writable: true
        });
        delete obj.key;
      }
    }
    
    return obj;
  }
}
