/*
 * Use the mustache template in templates/paste.html to create
 * the web page showing a single paste
 *
 */

function (doc, req) {
   if (!(doc && doc.title && doc.content))
      return {"code": 404, "body": "Not found"};

   var Mustache = require("vendor/mustache");

   start({
      "Content-type": "text/html; charset='utf-8'"
   });

   if (req.headers['X-Pjax']) {
      return Mustache.to_html(this.templates.partials.content, doc);
   }
   return Mustache.to_html(this.templates.paste, doc, this.templates.partials);
   // Mustache.to_html(this.templates.paste, doc, this.templates.partials, function(data) { send(data + "\n")});
}
