(function() {
  var createUFO = function() {
    var UFO = {};
    UFO.aliasMap = {};
    var global = this;
    UFO.apply = function(receiver, supplier) {
      if (receiver && supplier && typeof supplier === 'object') {
        for (var p in supplier) {
          receiver[p] = supplier[p];
        }
      }
    };

    UFO.apply(UFO, {

      /**
      * 获取构造函数
      * @param className
      * @returns
      */
      getConstructor: function(className) {
        var constructor = this.aliasMap[className];
        if (constructor) {
          return constructor;
        }

        var nameList = className.split('.'),
          i, len;

        constructor = global;
        for (i = 0, len = nameList.length; i < len; i++) {
          constructor = constructor[nameList[i]];
        }
        return constructor;
      },

      /**
      * @demo create('button', {
        *  text: 'ok'
        * });
      * @param className
      * @param config
      * @returns {constructor}
      */
      create: function(className, config) {
        var constructor;
        if (KISSY.isPlainObject(className)) {
          if (!className.type) {
            console.error('error in function UFO.create,you mast define a type name');
            return;
          }
          config = className;
          className = config.type;
        }

        if (KISSY.isString(className)) {
          constructor = this.getConstructor(className);

        } else if (KISSY.isFunction(className)) {
          constructor = className;
        }

        if (!constructor) {
          console.error('error in function UFO.create, className=', className);
          return;
        }
        return new constructor(config);
      },

      /**
      * @demo createItem{
        *  type: 'button',
          *  text: 'ok'
          * }
      * @param item
      * @param defaults
      * @returns
      */
      createItem: function(item, defaults) {
        var me = this;
        if (KISSY.isFunction(item)) {
          item = item();
        }

        if (KISSY.isEmptyObject(item)) {
          return undefined;
        } else if (!KISSY.isPlainObject(item)) {
          return item;
        }

        if (defaults && KISSY.isPlainObject(item)) {
          KISSY.mix(item, defaults, false, undefined, true);
        }
        return UFO.create(item);
      },

      augment: function(Class, object) {
        if (object.alias) {
          if (!KISSY.isArray(object.alias)) {
            object.alias = [object.alias];
          }
          for (var i = 0, len = object.alias.length; i < len; i++) {
            this.aliasMap[object.alias[i]] = Class;
          }
        }
        KISSY.augment(Class, object);
      },

      isType: function(cmp, type) {
        if (cmp.type == type) {
          return true;
        }
        return cmp instanceof UFO.getConstructor(type);
      }
    });
    return UFO;
  };


  //避免该文件被加载两次的情况下，UFO被重新实例化
  if(!window.UFO) {
    window.UFO = createUFO();
  }

})();

KISSY.add(function(S){
  return window.UFO;
});

