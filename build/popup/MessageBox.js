/*! 2019-12-28 */

KISSY.add(function(s,t,n,e){var o=['<div class="popup-container popup-showing active">','\t<div class="popup">','\t\t<div class="popup-head">','\t\t\t<h3 class="popup-title"></h3>',"\t\t</div>",'\t\t<div class="popup-body">',"\t\t\t<span></span>","\t\t</div>",'\t\t<div class="popup-buttons">',"\t\t</div>","\t</div>","</div>"].join(""),i=document.body;function u(t){t.buttonText=s.mix({ok:"确定",yes:"是",no:"否",cancel:"取消"},t.buttonText,!0,void 0,!0),this.buttonIds=["ok","yes","no","cancel"],t.buttons=t.buttons||1,u.superclass.constructor.call(this,t)}return s.extend(u,e),u.ERROR="error",u.INFO="info",u.QUESTION="question",u.WARNING="warning",u.OK=1,u.YES=2,u.NO=4,u.CANCEL=8,u.YESNO=6,u.OKCANCEL=9,u.YESNOCANCEL=14,UFO.augment(u,{alias:"messagebox",initComponent:function(){this.el=s.one(o),this.backdrop=s.one('<div class="backdrop visible active"></div>'),this.setTitle(this.title),this.setMessage(this.msg),this.setButtons(this.buttons),u.superclass.initComponent.apply(this,arguments)},setTitle:function(t){this.title=t,this.el.one(".popup-title").html(t)},setMessage:function(t){s.isObject(t)&&(t=JSON.stringify(t)),this.msg=t,this.el.one(".popup-body span").html(t)},setButtons:function(t){this.buttons=t;for(var n,e=this.el.one(".popup-buttons"),o=3;0<=o;o--)this.buttons&Math.pow(2,o)&&(n=s.one('<button name="button-'+this.buttonIds[o]+'" class="button button-default">'+this.buttonText[this.buttonIds[o]]+"</button>"),e.append(n))},handleClickOk:function(){var t=this;t.buttonListeners&&t.buttonListeners.ok&&t.buttonListeners.ok(),t.fire("ok"),t.hide()},handleClickCancel:function(){var t=this;t.buttonListeners&&t.buttonListeners.cancel&&t.buttonListeners.cancel(),t.fire("cancel"),t.hide()},handleClickYes:function(){var t=this;t.buttonListeners&&t.buttonListeners.yes&&t.buttonListeners.yes(),t.fire("yes"),t.hide()},handleClickNo:function(){var t=this;t.buttonListeners&&t.buttonListeners.no&&t.buttonListeners.no(),t.fire("no"),t.hide()},getBodyContianer:function(){return this.el.one(".popup-body")},show:function(t){if(!1!==this.fire("beforeshow")){var n=s.one(i);n.append(this.backdrop),n.append(this.el),this.fire("show")}},hide:function(t){var n=this;!1!==this.fire("beforehide")&&(this.backdrop.remove(),n.el.remove(),n.fire("hide"),delete n)},addCmpEvents:function(){var n=this;this.on("hide",function(){s.one(i).removeClass("modal-open"),s.one("html").removeClass("modal-open"),i.scrollTop=n.origScrollTop}),this.on("beforeshow",function(){n.origScrollTop=i.scrollTop,s.one(i).addClass("modal-open"),s.one("html").addClass("modal-open")}),this.el.delegate("click","button[name=button-ok]",function(t){return n.handleClickOk(t),!1}),this.el.delegate("click","button[name=button-cancel]",function(t){return n.handleClickCancel(t),!1}),this.el.delegate("click","button[name=button-yes]",function(t){return n.handleClickYes(t),!1}),this.el.delegate("click","button[name=button-no]",function(t){return n.handleClickNo(t),!1}),u.superclass.addCmpEvents.apply(this,arguments)}}),u.show=function(t){var n=new u(t),e=s.Defer();return n.show(),n.on("ok",function(){e.resolve(u.OK)}),n.on("yes",function(){e.resolve(u.YES)}),n.on("no",function(){e.resolve(u.NO)}),n.on("cancel",function(){e.resolve(u.OKCANCEL)}),e.promise},u.confirm=function(t,n,e,o){return u.show({title:t,icon:u.QUESTION,msg:n,buttons:u.OKCANCEL,buttonText:e,buttonListeners:{ok:o}})},u.alert=function(t,n,e,o){return s.isFunction(e)&&(o=e,e=void 0),u.show({title:t||"",msg:n||"",buttons:u.OK,icon:e,buttonListeners:{ok:o}})},u},{requires:["node","promise","../container/Container"]});