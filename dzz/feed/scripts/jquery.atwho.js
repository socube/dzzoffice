/*
  Copyright (c) 2013 chord.luo@gmail.com
  Licensed under the MIT license.
*/

(function(){var n=[].slice;(function(n){return typeof define=="function"&&define.amd?define(["jquery"],n):n(window.jQuery)})(function(t){var f,r,s,h,c,u,i,o,e;return s=function(){function n(n){this.current_flag=null,this.controllers={},this.$inputor=t(n),this.listen()}return n.prototype.controller=function(n){return this.controllers[n||this.current_flag]},n.prototype.set_context_for=function(n){return this.current_flag=n,this},n.prototype.reg=function(n,t){var i,r;return i=(r=this.controllers)[n]||(r[n]=new c(this,n)),t.alias&&(this.controllers[t.alias]=i),i.init(t),this},n.prototype.listen=function(){var n=this;return this.$inputor.on("keyup.atwho",function(t){return n.on_keyup(t)}).on("keydown.atwho",function(t){return n.on_keydown(t)}).on("scroll.atwho",function(){var i;if((i=n.controller())!=null)return i.view.hide()}).on("blur.atwho",function(){var i;if(i=n.controller())return i.view.hide(i.get_opt("display_timeout"))})},n.prototype.dispatch=function(){var n=this;return t.map(this.controllers,function(t){if(t.look_up())return n.set_context_for(t.at)})},n.prototype.on_keyup=function(n){var r;switch(n.keyCode){case i.ESC:n.preventDefault(),(r=this.controller())!=null&&r.view.hide();break;case i.DOWN:case i.UP:t.noop();break;default:this.dispatch()}},n.prototype.on_keydown=function(n){var r,u;r=(u=this.controller())!=null?u.view:void 0;if(!(r&&r.visible()))return;switch(n.keyCode){case i.ESC:n.preventDefault(),r.hide();break;case i.UP:n.preventDefault(),r.prev();break;case i.DOWN:n.preventDefault(),r.next();break;case i.TAB:case i.ENTER:if(!r.visible())return;n.preventDefault(),r.choose();break;default:t.noop()}},n}(),c=function(){function i(n,i){this.app=n,this.at=i,this.$inputor=this.app.$inputor,this.id=this.$inputor[0].id||r(),this.setting=null,this.query=null,this.pos=0,this.cur_rect=null,this.range=null,f.append(this.$el=t("<div id='atwho-ground-"+this.id+"'></div>")),this.model=new o(this),this.view=new e(this)}var r,s;return s=0,r=function(){return s+=1},i.prototype.init=function(n){return this.setting=t.extend({},this.setting||t.fn.atwho["default"],n),this.view.init(),this.model.reload(this.setting.data)},i.prototype.call_default=function(){var r,i;i=arguments[0],r=2<=arguments.length?n.call(arguments,1):[];try{return u[i].apply(this,r)}catch(f){return t.error(""+f+" Or maybe At.js doesn't have function "+i)}},i.prototype.trigger=function(n,t){var i,r;return t.push(this),i=this.get_opt("alias"),r=i?""+n+"-"+i+".atwho":""+n+".atwho",this.$inputor.trigger(r,t)},i.prototype.callbacks=function(n){return this.get_opt("callbacks")[n]||u[n]},i.prototype.get_opt=function(n){try{return this.setting[n]}catch(i){return null}},i.prototype.content=function(){return this.$inputor.is("textarea, input")?this.$inputor.val():this.$inputor.text()},i.prototype.catch_query=function(){var i,u,f,n,t,r;return u=this.content(),i=this.$inputor.caret("pos"),r=u.slice(0,i),n=this.callbacks("matcher").call(this,this.at,r,this.get_opt("start_with_space")),typeof n=="string"&&n.length<=this.get_opt("max_len",20)?(t=i-n.length,f=t+n.length,this.pos=t,n={text:n.toLowerCase(),head_pos:t,end_pos:f},this.trigger("matched",[this.at,n.text])):this.view.hide(),this.query=n},i.prototype.rect=function(){var n,t;if(n=this.$inputor.caret("offset",this.pos-1))return this.$inputor.attr("contentEditable")==="true"&&(n=this.cur_rect||(this.cur_rect=n)||n),t=document.selection?0:2,{left:n.left,top:n.top,bottom:n.top+n.height+t}},i.prototype.reset_rect=function(){if(this.$inputor.attr("contentEditable")==="true")return this.cur_rect=null},i.prototype.mark_range=function(){return this.range=this.get_range()||this.get_ie_range()},i.prototype.clear_range=function(){return this.range=null},i.prototype.get_range=function(){return this.range||(window.getSelection?window.getSelection().getRangeAt(0):void 0)},i.prototype.get_ie_range=function(){return this.range||(document.selection?document.selection.createRange():void 0)},i.prototype.insert_content_for=function(n){var u,i,r;return i=n.data("value"),r=this.get_opt("insert_tpl"),this.$inputor.is("textarea, input")||!r?i:(u=t.extend({},n.data("item-data"),{"atwho-data-value":i,"atwho-at":this.at}),this.callbacks("tpl_eval").call(this,r,u))},i.prototype.insert=function(n,i){var u,f,l,c,v,a,r,e,o,s,h;return u=this.$inputor,u.attr("contentEditable")==="true"&&(l="atwho-view-flag atwho-view-flag-"+(this.get_opt("alias")||this.at),c=""+n+"<span contenteditable='false'>&nbsp;<span>",v="<span contenteditable='false' class='"+l+"'>"+c+"</span>",f=t(v).data("atwho-data-item",i.data("item-data")),document.selection&&(f=t("<span contenteditable='true'></span>").html(f))),u.is("textarea, input")?(n=""+n,o=u.val(),s=o.slice(0,Math.max(this.query.head_pos-this.at.length,0)),h=""+s+n+" "+o.slice(this.query.end_pos||0),u.val(h),u.caret("pos",s.length+n.length+1)):(r=this.get_range())?(a=r.startOffset-(this.query.end_pos-this.query.head_pos)-this.at.length,r.setStart(r.endContainer,Math.max(a,0)),r.setEnd(r.endContainer,r.endOffset),r.deleteContents(),r.insertNode(f[0]),r.collapse(!1),e=window.getSelection(),e.removeAllRanges(),e.addRange(r)):(r=this.get_ie_range())&&(r.moveStart("character",this.query.end_pos-this.query.head_pos-this.at.length),r.pasteHTML(f[0]),r.collapse(!1),r.select()),u.focus(),u.change()},i.prototype.render_view=function(n){var t;return t=this.get_opt("search_key"),n=this.callbacks("sorter").call(this,this.query.text,n.slice(0,1001),t),this.view.render(n.slice(0,this.get_opt("limit")))},i.prototype.look_up=function(){var n,i;if(n=this.catch_query())return i=function(n){return n&&n.length>0?this.render_view(n):this.view.hide()},this.model.query(n.text,t.proxy(i,this)),n},i}(),o=function(){function n(n){this.context=n,this.at=this.context.at}var i;return i={},n.prototype.saved=function(){return this.fetch()>0},n.prototype.query=function(n,t){var i,u,r;return i=this.fetch(),u=this.context.get_opt("search_key"),t(i=this.context.callbacks("filter").call(this.context,n,i,u)),i&&i.length>0?void 0:(r=this.context.callbacks("remote_filter"))!=null?r.call(this.context,n,t):void 0},n.prototype.fetch=function(){return i[this.at]||[]},n.prototype.save=function(n){return i[this.at]=this.context.callbacks("before_save").call(this.context,n||[])},n.prototype.load=function(n){if(!(this.saved()||!n))return this._load(n)},n.prototype.reload=function(n){return this._load(n)},n.prototype._load=function(n){var i=this;return typeof n=="string"?t.ajax(n,{dataType:"json"}).done(function(n){return i.save(n)}):this.save(n)},n}(),e=function(){function n(n){this.context=n,this.$el=t("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>"),this.timeout_id=null,this.context.$el.append(this.$el),this.bind_event()}return n.prototype.init=function(){var n;return n=this.context.get_opt("alias")||this.context.at.charCodeAt(0),this.$el.attr({id:"at-view-"+n})},n.prototype.bind_event=function(){var i,n=this;i=this.$el.find("ul");i.on("mouseenter.atwho-view","li",function(n){return i.find(".cur").removeClass("cur"),t(n.currentTarget).addClass("cur")}).on("click",function(t){return n.choose(),t.preventDefault()});return this.$el.on("mouseenter.atwho-view","ul",function(){return n.context.mark_range()}).on("mouseleave.atwho-view","ul",function(){return n.context.clear_range()})},n.prototype.visible=function(){return this.$el.is(":visible")},n.prototype.choose=function(){var n,t;return n=this.$el.find(".cur"),t=this.context.insert_content_for(n),this.context.insert(this.context.callbacks("before_insert").call(this.context,t,n),n),this.context.trigger("inserted",[n]),this.hide()},n.prototype.reposition=function(n){var i;return n.bottom+this.$el.height()-t(window).scrollTop()>t(window).height()&&(n.bottom=n.top-this.$el.height()),i={left:n.left,top:n.bottom},this.$el.offset(i),this.context.trigger("reposition",[i])},n.prototype.next=function(){var t,n;return t=this.$el.find(".cur").removeClass("cur"),n=t.next(),n.length||(n=this.$el.find("li:first")),n.addClass("cur")},n.prototype.prev=function(){var t,n;return t=this.$el.find(".cur").removeClass("cur"),n=t.prev(),n.length||(n=this.$el.find("li:last")),n.addClass("cur")},n.prototype.show=function(){var n;return this.visible()||this.$el.show(),(n=this.context.rect())?this.reposition(n):void 0},n.prototype.hide=function(n){var t,i=this;return isNaN(n&&this.visible())?(this.context.reset_rect(),this.$el.hide()):(t=function(){return i.hide()},clearTimeout(this.timeout_id),this.timeout_id=setTimeout(t,n))},n.prototype.render=function(n){var f,u,i,o,s,r,e;if(!t.isArray(n||n.length<=0)){this.hide();return}for(this.$el.find("ul").empty(),u=this.$el.find("ul"),s=this.context.get_opt("tpl"),r=0,e=n.length;r<e;r++)i=n[r],i=t.extend({},i,{"atwho-at":this.context.at}),o=this.context.callbacks("tpl_eval").call(this.context,s,i),f=t(this.context.callbacks("highlighter").call(this.context,o,this.context.query.text)),f.data("item-data",i),u.append(f);return this.show(),u.find("li:first").addClass("cur")},n}(),i={DOWN:40,UP:38,ESC:27,TAB:9,ENTER:13},u={before_save:function(n){var u,r,f,i;if(!t.isArray(n))return n;for(i=[],r=0,f=n.length;r<f;r++)u=n[r],t.isPlainObject(u)?i.push(u):i.push({name:u});return i},matcher:function(n,t,i){var r,u;return n=n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),i&&(n="(?:^|\\s)"+n),u=new RegExp(n+"([A-Za-z0-9_+-]*)$|"+n+"([^\\x00-\\xff]*)$","gi"),r=u.exec(t),r?r[2]||r[1]:null},filter:function(n,t,i){for(var f,u=[],r=0,e=t.length;r<e;r++)f=t[r],~f[i].toLowerCase().indexOf(n)&&u.push(f);return u},remote_filter:null,sorter:function(n,t,i){var r,u,e,f;if(!n)return t;for(f=[],u=0,e=t.length;u<e;u++)r=t[u],r.atwho_order=r[i].toLowerCase().indexOf(n),r.atwho_order>-1&&f.push(r);return f.sort(function(n,t){return n.atwho_order-t.atwho_order})},tpl_eval:function(n,t){try{return n.replace(/\$\{([^\}]*)\}/g,function(n,i){return t[i]})}catch(i){return""}},highlighter:function(n,t){var i;return t?(i=new RegExp(">\\s*(\\w*)("+t.replace("+","\\+")+")(\\w*)\\s*<","ig"),n.replace(i,function(n,t,i,r){return"> "+t+"<strong>"+i+"</strong>"+r+" <"})):n},before_insert:function(n){return n}},r={load:function(n,t){var i;if(i=this.controller(n))return i.model.load(t)},getInsertedItemsWithIDs:function(n){var r,i,u;return(r=this.controller(n))?(n&&(n="-"+(r.get_opt("alias")||r.at)),i=[],u=t.map(this.$inputor.find("span.atwho-view-flag"+(n||"")),function(n){var r;return r=t(n).data("atwho-data-item"),i.indexOf(r.id)>-1?void 0:(r.id&&(i.push=r.id),r)}),[i,u]):[null,null]},getInsertedItems:function(n){return r.getInsertedItemsWithIDs.apply(this,[n])[1]},getInsertedIDs:function(n){return r.getInsertedItemsWithIDs.apply(this,[n])[0]},run:function(){return this.dispatch()}},h={init:function(n){var r,i;return i=(r=t(this)).data("atwho"),i||r.data("atwho",i=new s(this)),i.reg(n.at,n),this}},f=t("<div id='atwho-container'></div>"),t.fn.atwho=function(n){var u,i;return i=arguments,t("body").append(f),u=null,this.filter("textarea, input, [contenteditable=true]").each(function(){var f;if(typeof n=="object"||!n)return h.init.apply(this,i);if(r[n]){if(f=t(this).data("atwho"))return u=r[n].apply(f,Array.prototype.slice.call(i,1))}else return t.error("Method "+n+" does not exist on jQuery.caret")}),u||this},t.fn.atwho["default"]={at:void 0,alias:void 0,data:null,tpl:"<li data-value='${atwho-at}${name}'>${name}</li>",insert_tpl:"<span>${atwho-data-value}</span>",callbacks:u,search_key:"name",start_with_space:!0,limit:5,max_len:20,display_timeout:300}})}).call(this);