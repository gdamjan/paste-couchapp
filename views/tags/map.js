function(doc) {
   if (doc.tags && doc.title && doc.content) {
      for(var i=0; i<doc.tags.length; i++) {
         emit(doc.tags[i], doc.title)
      }
   }
}
