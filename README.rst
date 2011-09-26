Paste
=====

Main incentive: a paste service that notifies me in real time. Then I can
relay that info to IRC. CouchDB gives me _changes notifications for free,
so that's it.

A document is::

    {
      title: "Single line title, no html",
      content: "multi line, no html",
      tags: ["list", "of", "tags"],
      created_at: <timestamp>
    }


Some notes:
 * Will use google-code-prettify (http://code.google.com/p/google-code-prettify/)
 * toggle line numbers
 * raw pastes
 * tag-cloud
 * Tab-key inserts tabstops
 * Cookie for deleting(?)
