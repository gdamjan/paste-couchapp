function(doc, req) {
   if (doc) {
      return [null, "already exists"];
   }
   _id = req.id ? req.id : req.uuid;
   if (!req.body) {
      return [null, "you must POST/PUT something"];
   }
   doc = JSON.parse(req.body);
   doc._id = _id;
   doc.created_at = new Date().getTime();
   var resp =  {
      "headers" : {
         "Content-Type" : "application/json"
      },
      "json" : doc
   };
   return [doc, resp];
}
