/*
 * Filter functions will allow you to select what documents you get
 * notifications about. In this case, we want to receive notifications
 * for specific tags only. The tags are provided in the query args of
 * the request.
 *
 * http://guide.couchdb.org/draft/notifications.html#filters
 *
 * in this case I filter out notifications about deleted documets too.
 */

function(doc, req) {
   if (doc._deleted) return false;

   return false;
}
