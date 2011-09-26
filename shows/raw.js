function(doc, req) {
   if (doc.content && doc.tags && doc.title) {
      start({
         "Content-Type": "text/plain; charset=utf-8",
         "X-Document-Title": JSON.stringify(doc.title),
         "X-Document-Tags": JSON.stringify(doc.tags.join(', '))
      });
      send(doc.content);
   }
}
