function(doc, req) {
   start({
      "Content-type": "text/html; charset='utf-8'"
   });
   var Mustache = require("vendor/mustache");
   Mustache.to_html(this.templates.paste, doc, null, send);
}
