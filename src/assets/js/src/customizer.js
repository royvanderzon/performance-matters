window.onload=function(){"use strict";function d(a,b){throw $('<div id="bsCustomizerAlert" class="bs-customizer-alert"><div class="container"><a href="#bsCustomizerAlert" data-dismiss="alert" class="close pull-right" aria-label="Close" role="button"><span aria-hidden="true">&times;</span></a><p class="bs-customizer-alert-text"><span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span><span class="sr-only">Warning:</span>'+a+"</p>"+(b.message?$("<p></p>").text("Error: "+b.message)[0].outerHTML:"")+(b.extract?$('<pre class="bs-customizer-alert-extract"></pre>').text(b.extract.join("\n"))[0].outerHTML:"")+"</div></div>").appendTo("body").alert(),b}function e(a){$('<div class="bs-callout bs-callout-info"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+a+"</div>").insertAfter(".bs-customize-download")}function f(a,b){var c=$('<div class="bs-callout bs-callout-danger"><h4>Attention!</h4><p>'+a+"</p></div>");b?c.appendTo(".bs-docs-container"):c.insertAfter(".bs-customize-download")}function g(a,b,c){$('<div class="alert alert-'+a+'">'+b+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>').insertAfter(c)}function h(a){a=a.replace(/[*+?^$.\[\]{}()|\\\/]/g,"\\$&");var b=location.search.match(new RegExp("[?&]"+a+"=([^&]+)(&|$)"));return b&&decodeURIComponent(b[1].replace(/\+/g," "))}function i(a,b){var c={description:"Bootstrap Customizer Config",public:!0,files:{"config.json":{content:a}}};$.ajax({url:"https://api.github.com/gists",type:"POST",contentType:"application/json; charset=UTF-8",dataType:"json",data:JSON.stringify(c)}).success(function(a){var c=a.html_url,d=window.location.protocol+"//"+window.location.host,f=d+window.location.pathname+"?id="+a.id;e('<strong>Success!</strong> Your configuration has been saved to <a href="'+c+'">'+c+'</a> and can be revisited here at <a href="'+f+'">'+f+"</a> for further customization."),history.replaceState(!1,document.title,f),b(c,f)}).error(function(a){try{d("<strong>Ruh roh!</strong> Could not save gist file, configuration not saved.",a)}catch(a){}b("<none>","<none>")})}function j(){var a={};$("#less-variables-section input").each(function(){$(this).val()&&(a[$(this).prev().text()]=$(this).val())});var b={vars:a,css:$("#less-section input:checked").map(function(){return this.value}).toArray(),js:$("#plugin-section input:checked").map(function(){return this.value}).toArray()};return!$.isEmptyObject(b.vars)||b.css.length||b.js.length?b:null}function k(a){if(a.js&&$("#plugin-section input").each(function(){$(this).prop("checked",~$.inArray(this.value,a.js))}),a.css&&$("#less-section input").each(function(){$(this).prop("checked",~$.inArray(this.value,a.css))}),a.vars)for(var b in a.vars)$('input[data-var="'+b+'"]').val(a.vars[b])}function l(){var a=h("id");a&&$.ajax({url:"https://api.github.com/gists/"+a,type:"GET",dataType:"json"}).success(function(a){var b=JSON.parse(a.files["config.json"].content);k(b)}).error(function(a){d("Error fetching bootstrap config file",a)})}function m(a,b,c,e,f){if(!a&&!b)return d("<strong>Ruh roh!</strong> No Bootstrap files selected.",new Error("no Bootstrap"));var g=new JSZip;if(a){var h=g.folder("css");for(var i in a)h.file(i,a[i])}if(b){var j=g.folder("js");for(var k in b)j.file(k,b[k])}if(c){var l=g.folder("fonts");for(var m in c)l.file(m,c[m],{base64:!0})}e&&g.file("config.json",e);var n=g.generate({type:"blob"});f(n)}function n(a){var b="";for(var c in a)b+=c+": "+a[c]+";\n";return b+"\n\n"}function o(){var a=$('#less-section [value="glyphicons.less"]:checked');if(a.length)return __fonts}function p(a){var b=/^@import \"(.*?)\";$/,c=__less[a].split("\n"),d=[];return $.each(c,function(a,c){var e=b.exec(c);if(e){var f=e[1],g=p(f);$.each(g,function(a,b){$.inArray(b,d)===-1&&d.push(b)}),d.push(f)}}),d}function q(a,b,c){var d=__less[a],e=p(a);return $.each(e,function(a,e){var f=b[e];(f||null==f)&&(d+=__less[e]),"variables.less"===e&&c&&(d+=n(c))}),d=d.replace(/@import[^\n]*/gi,"")}function r(b,c,d){var e=$.Deferred(),f=new less.Parser({paths:["variables.less","mixins.less"],optimization:0,filename:c+".css"});return f.parse(b,function(b,f){if(b)return e.reject(b);try{d[c+".css"]=a+f.toCSS(),d[c+".min.css"]=a+f.toCSS({compress:!0})}catch(a){return e.reject(a)}e.resolve()}),e.promise()}function s(a){var b=$.Deferred(),c=!1,e={};if($("#less-section input").each(function(){var a=$(this),b=a.is(":checked");e[a.val()]=b,c=c||b}),!c)return!1;var f={},g={};$("#less-variables-section input").each(function(){$(this).val()&&(g[$(this).prev().text()]=$(this).val())});var h=a+q("bootstrap.less",e,g),i=a+q("theme.less",e,g),j=autoprefixer({browsers:__configBridge.autoprefixerBrowsers});return $.when(r(h,"bootstrap",f),r(i,"bootstrap-theme",f)).done(function(){for(var a in f)f[a]=j.process(f[a]).css;b.resolve(f)}).fail(function(a){d("<strong>Ruh roh!</strong> Problem parsing or compiling Less files.",a),b.reject()}),b.promise()}function t(a){var b=UglifyJS.parse(a);b.figure_out_scope();var c=UglifyJS.Compressor(),d=b.transform(c);d.figure_out_scope(),d.compute_char_frequency(),d.mangle_names();var e=UglifyJS.OutputStream();return d.print(e),e.toString()}function u(b){var c=$("#plugin-section input:checked"),d=__configBridge.jqueryCheck.join("\n"),e=__configBridge.jqueryVersionCheck.join("\n");if(!c.length)return!1;var f=c.map(function(){return __js[this.value]}).toArray().join("\n");return b=a+b,f=d+e+f,{"bootstrap.js":b+f,"bootstrap.min.js":b+t(f)}}function v(){c.nextAll(".alert").remove()}function w(a){a.stopPropagation(),a.preventDefault();var b=a.originalEvent.hasOwnProperty("dataTransfer")?a.originalEvent.dataTransfer.files[0]:a.originalEvent.target.files[0],d=new FileReader;d.onload=function(a){var b=a.target.result;try{var d=JSON.parse(b);if(!$.isPlainObject(d))throw new Error("JSON data from config file is not an object.");k(d),g("success","<strong>Woohoo!</strong> Your configuration was successfully uploaded. Tweak your settings, then hit Download.",c)}catch(a){return g("danger","<strong>Shucks.</strong> We can only read valid <code>.json</code> files. Please try again.",c)}},d.readAsText(b,"utf-8")}function x(a){a.stopPropagation(),a.preventDefault(),a.originalEvent.dataTransfer.dropEffect="copy",v()}var a="/*!\n * Bootstrap v3.3.7 (http://getbootstrap.com)\n * Copyright 2011-"+(new Date).getFullYear()+" Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n\n",b=window.File&&window.FileReader&&window.FileList&&window.Blob,c=$("#import-drop-target");b&&c.on("dragover",x).on("drop",w),$("#import-file-select").on("change",w),$("#import-manual-trigger").on("click",v);var y=$("#less-section input"),z=$("#plugin-section input"),A=$("#less-variables-section input");$("#less-section .toggle").on("click",function(a){a.preventDefault(),y.prop("checked",!y.is(":checked"))}),$("#plugin-section .toggle").on("click",function(a){a.preventDefault(),z.prop("checked",!z.is(":checked"))}),$("#less-variables-section .toggle").on("click",function(a){a.preventDefault(),A.val("")}),$("[data-dependencies]").on("click",function(){if($(this).is(":checked")){var a=this.getAttribute("data-dependencies");if(a){a=a.split(",");for(var b=0;b<a.length;b++){var c=$('[value="'+a[b]+'"]');c&&c.prop("checked",!0)}}}}),$("[data-dependents]").on("click",function(){if(!$(this).is(":checked")){var a=this.getAttribute("data-dependents");if(a){a=a.split(",");for(var b=0;b<a.length;b++){var c=$('[value="'+a[b]+'"]');c&&c.prop("checked",!1)}}}});var B=$("#btn-compile");B.on("click",function(a){var b=j(),c=JSON.stringify(b,null,2);a.preventDefault(),B.attr("disabled","disabled"),i(c,function(a,d){b.customizerUrl=d,c=JSON.stringify(b,null,2);var e="/*!\n * Generated using the Bootstrap Customizer ("+d+")\n * Config saved to config.json and "+a+"\n */\n";$.when(s(e),u(e),o()).done(function(a,b,d){m(a,b,d,c,function(a){B.removeAttr("disabled"),setTimeout(function(){saveAs(a,"bootstrap.zip")},0)})})})}),function(){function a(){$(".bs-docs-section, .bs-docs-sidebar").css("display","none"),f('Looks like your current browser doesn\'t support the Bootstrap Customizer. Please take a second to <a href="http://browsehappy.com/">upgrade to a more modern browser</a> (other than Safari).',!0)}var c=window.webkitURL||window.URL,d=new Blob(["<svg xmlns='http://www.w3.org/2000/svg'></svg>"],{type:"image/svg+xml;charset=utf-8"}),e=c.createObjectURL(d);null!==/^blob:/.exec(e)&&b?$("<img>").on("load",function(){B.prop("disabled",!1)}).on("error",a).attr("src",e):a()}(),l()};