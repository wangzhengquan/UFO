/*! 2024-11-03 */
KISSY.add(function(i,t,n,e){var o=['<div class="popup-container popup-showing active">','\t<div class="popup">','\t\t<div class="popup-head">','\t\t\t<h3 class="popup-title"></h3>',"\t\t</div>",'\t\t<div class="popup-body">',"\t\t\t<span></span>","\t\t</div>",'\t\t<div class="popup-buttons">',"\t\t</div>","\t</div>","</div>"].join(""),s=document.body;function u(t){t.buttonText=i.mix({ok:"确定",yes:"是",no:"否",cancel:"取消"},t.buttonText,!0,void 0,!0),this.buttonIds=["ok","yes","no","cancel"],t.buttons=t.buttons||1,u.superclass.constructor.call(this,t)}return i.extend(u,e),u.ERROR="error",u.INFO="info",u.QUESTION="question",u.WARNING="warning",u.OK=1,u.YES=2,u.NO=4,u.CANCEL=8,u.YESNO=u.YES|u.NO,u.OKCANCEL=u.OK|u.CANCEL,u.YESNOCANCEL=u.YES|u.NO|u.CANCEL,UFO.augment(u,{alias:"messagebox",initComponent:function(){this.el=i.one(o),this.backdrop=i.one('<div class="backdrop visible active"></div>'),this.setTitle(this.title),this.setMessage(this.msg),this.setButtons(this.buttons),u.superclass.initComponent.apply(this,arguments)},setTitle:function(t){this.title=t,this.el.one(".popup-title").html(t)},setMessage:function(t){i.isObject(t)&&(t=JSON.stringify(t)),this.msg=t,this.el.one(".popup-body span").html(t)},setButtons:function(t){this.buttons=t;for(var n,e=this.el.one(".popup-buttons"),o=3;0<=o;o--)this.buttons&Math.pow(2,o)&&(n=i.one('<button name="button-'+this.buttonIds[o]+'" class="button button-default">'+this.buttonText[this.buttonIds[o]]+"</button>"),e.append(n))},handleClickOk:function(){var t=this;t.buttonListeners&&t.buttonListeners.ok&&t.buttonListeners.ok(),t.fire("ok"),t.hide()},handleClickCancel:function(){var t=this;t.buttonListeners&&t.buttonListeners.cancel&&t.buttonListeners.cancel(),t.fire("cancel"),t.hide()},handleClickYes:function(){var t=this;t.buttonListeners&&t.buttonListeners.yes&&t.buttonListeners.yes(),t.fire("yes"),t.hide()},handleClickNo:function(){var t=this;t.buttonListeners&&t.buttonListeners.no&&t.buttonListeners.no(),t.fire("no"),t.hide()},getBodyContianer:function(){return this.el.one(".popup-body")},show:function(t){var n;!1!==this.fire("beforeshow")&&((n=i.one(s)).append(this.backdrop),n.append(this.el),this.fire("show"))},hide:function(t){var n=this;!1!==this.fire("beforehide")&&(this.backdrop.remove(),n.el.remove(),n.fire("hide"),delete n)},addCmpEvents:function(){var n=this;this.on("hide",function(){i.one(s).removeClass("modal-open"),i.one("html").removeClass("modal-open"),s.scrollTop=n.origScrollTop}),this.on("beforeshow",function(){n.origScrollTop=s.scrollTop,i.one(s).addClass("modal-open"),i.one("html").addClass("modal-open")}),this.el.delegate("click","button[name=button-ok]",function(t){return n.handleClickOk(t),!1}),this.el.delegate("click","button[name=button-cancel]",function(t){return n.handleClickCancel(t),!1}),this.el.delegate("click","button[name=button-yes]",function(t){return n.handleClickYes(t),!1}),this.el.delegate("click","button[name=button-no]",function(t){return n.handleClickNo(t),!1}),u.superclass.addCmpEvents.apply(this,arguments)}}),u.show=function(t){var t=new u(t),n=i.Defer();return t.show(),t.on("ok",function(){n.resolve(u.OK)}),t.on("yes",function(){n.resolve(u.YES)}),t.on("no",function(){n.resolve(u.NO)}),t.on("cancel",function(){n.resolve(u.CANCEL)}),n.promise},u.confirm=function(t,n,e,o,s){return i.isFunction(e)&&(s=o,o=e,e=void 0),u.show({title:t,icon:u.QUESTION,msg:n,buttons:u.OKCANCEL,buttonText:e,buttonListeners:{ok:o,cancel:s}})},u.alert=function(t,n,e,o){return i.isFunction(e)&&(o=e,e=void 0),u.show({title:t||"",msg:n||"",buttons:u.OK,icon:e,buttonListeners:{ok:o}})},u},{requires:["node","promise","../container/Container"]});