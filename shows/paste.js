/*
 * Use the mustache template in templates/paste.html to create
 * the web page showing a single paste
 *
 */

function (doc, req) {
   if (!(doc && doc.title && doc.content))
      return {"code": 404, "body": "Not found"};

   start({
      "Content-type": "text/html; charset='utf-8'"
   });

   var Mustache = require("vendor/mustache");
   Mustache.to_html(this.templates.paste, doc, null, send);
}
