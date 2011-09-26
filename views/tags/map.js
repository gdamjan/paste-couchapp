/*
 * Create an index of the tags
 *
 * with the _count reduce function it can be
 * used for a tag-cloud or a tag-list
 *
 */

function(doc) {
   if (doc.tags && doc.title && doc.content) {
      for(var i=0; i<doc.tags.length; i++) {
         emit(doc.tags[i], doc.title)
      }
   }
}
