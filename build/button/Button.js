/*! 2024-03-08 */
KISSY.add(function(e,t,s,i,n){function l(t){e.mix(t,{tooltip:""},!1),l.superclass.constructor.apply(this,arguments)}return e.extend(l,i),UFO.augment(l,{alias:"button",initComponent:function(){n=this.tpl||n,this.el=e.one(new s(n).render(this.config)),this.iconEl=this.el.one(".icon"),this.textEl=this.el.one("[name=text]"),this.disabled&&this.setDisabled(this.disabled),this.iconStyle&&this.setIconStyle(this.iconStyle),this.relayEvents(this.el,["keydown"]),l.superclass.initComponent.apply(this,arguments)},setIconStyle:function(t){this.iconEl.css(t)},setDisabled:function(t){(this.disabled=t)?(this.el.attr("disabled","disabled"),this.el.addClass("button-disabled")):(this.el.removeAttr("disabled"),this.el.removeClass("button-disabled"))},setText:function(t){this.textEl.html(t)},isDisabled:function(){return"disabled"==this.el.attr("disabled")},addCmpEvents:function(){var s=this;this.el.on("mouseenter",function(t){s.isDisabled()||s.el.addClass("hover")}),this.el.on("mouseover",function(t){s.isDisabled()||s.el.addClass("hover")}),this.el.on("mouseout",function(t){s.isDisabled()||s.el.removeClass("hover")}),this.el.on("mousedown",function(t){return s.isDisabled()||s.el.addClass("active"),!1}),this.el.on("mouseup",function(t){return s.isDisabled()||s.el.removeClass("active"),!1}),this.el.on("tap click",function(t){var e=!0;if(s.handler&&(e=s.handler(s,t)),t=s.fire("click",s,t),!1===e||!1===t)return!1})}}),l},{requires:["node","xtemplate","../Component","./tpl/button-tpl"]});