/*
 * A show function displaying plain paste content with a "text/plain"
 * content-type.
 *
 */

function (doc, req) {
   if (!(doc && doc.title && doc.content)) {
      return {"code": 404, "body": "Not found"};
   }

   var tags = '';
   if (doc.tags) {
      tags = JSON.stringify(doc.tags.join(', '));
   }

   start({
      "Content-Type": "text/plain; charset=utf-8",
      "X-Document-Title": JSON.stringify(doc.title),
      "X-Document-Tags": tags
   });

   send(doc.content);
}
