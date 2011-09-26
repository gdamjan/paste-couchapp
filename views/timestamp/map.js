/*
 * make an index of valid documents
 *
 * make the index by the timestamp, so we can use the index to scroll
 * list the history
 *
 */


function(doc) {
   if (doc.created_at && doc.title && doc.content) {
      emit(doc.created_at, doc.title)
   }
}
