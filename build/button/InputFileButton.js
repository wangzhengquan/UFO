/*! 2019-12-27 */

KISSY.add(function(e,t,i){function l(t){e.mix(t,{style:{position:"relative"}},!1,void 0,!0),l.superclass.constructor.call(this,t)}return e.extend(l,i),UFO.augment(l,{alias:"inputfilebutton",initComponent:function(){l.superclass.initComponent.apply(this,arguments),this.fileEl=e.one('<input type="file" style="position: absolute; display: block; top: 0; left: 0; right: 0; bottom: 0; width: 100%; opacity: 0; z-index:10;">'),this.el.append(this.fileEl),this.multiple&&this.setMultiple(this.multiple),this.readonly&&this.setReadonly(!0)},setMultiple:function(t){t?this.fileEl.attr("multiple","multiple"):this.fileEl.removeAttr("multiple")},setReadonly:function(t){(this.readonly=t)?(this.fileEl.attr("readonly","readonly").attr("disabled","disabled"),this.el.css("cursor","default")):(this.fileEl.removeAttr("readonly").removeAttr("disabled"),this.el.css("cursor","pointer"))},addCmpEvents:function(){var e=this;this.el.delegate("change","input[type=file]",function(t){return console.log("change",t),e.fire("change",t),e.change&&e.change(e,t),!1}),l.superclass.addCmpEvents.apply(this,arguments)},getValue:function(){this.fileEl.getDOMNode().files}}),l},{requires:["node","./Button"]});