function parseToProto(obj, proto) {
    return Object.assign(JSON.parse(obj), proto);
  }
  
  /*const { parseToProto } = require('../../index');
  
  describe('ParseToProto', function () {
    console.log(parseToProto);
    let proto;
  
    beforeEach(function () {
      proto = { category: 'animal' };
    });
  
    it('should be able to parse the example', function () {
      let obj = parseToProto('{"type":"cat","name":"Mimi","age":3}', proto);
      expect(obj.category).toEqual('animal');
      expect(obj.age).toEqual(3);
    });
  
    it('values of obj should be overwritten by proto', function () {
      let obj = parseToProto(
        '{"type":"cat","name":"Mimi","age":3, "category":"yomoma"}',
        proto
      );
      expect(obj.category).toEqual('animal');
    });
  
    it('case sensitivity should be correct', function () {
      let obj = parseToProto(
        '{"type":"cat","name":"Mimi","age":3, "Category":"yomoma"}',
        proto
      );
      expect(obj.category).toEqual('animal');
      expect(obj.Category).toEqual('yomoma');
    });
  
    it('case sensitivity should be correct', function () {
      let obj = parseToProto('{"type":"cat","name":"Mimi","age":3}', proto);
      expect(Object.keys(obj).length).toEqual(4);
    });
  
    it('should detect wrong type of object', function () {
      expect(function () {
        parseToProto({ type: 'cat', name: 'Mimi', age: 3 }, proto);
      }).toThrow();
    });
  
    it('should work with numbers', function () {
      let obj = parseToProto(1, proto);
      expect(obj.category).toEqual('animal');
    });
  });*/
  
  module.exports = { parseToProto };
  