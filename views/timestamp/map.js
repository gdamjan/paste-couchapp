function(doc) {
   if (doc.created_at && doc.title && doc.content) {
      emit(doc.created_at, doc.title)
   }
}
