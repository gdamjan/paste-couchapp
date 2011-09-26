function(doc, req) {
   start({
      "headers" : {
          "Content-type": "text/html"
      }
   });
   var Mustache = require("vendor/mustache");
   var x = Mustache.to_html(this.templates.paste, doc);
   return x;
}
