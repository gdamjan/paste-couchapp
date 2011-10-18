===================
Paste as a CouchApp
===================

Main incentive: a paste service that notifies me in real time. Then I can
relay that info to IRC (for ex). CouchDB gives me _changes notifications for
free, so that's how the decission was made to be a CouchApp.  Other requirements
were, code colouring, perfect utf-8 support, paste titles so there can be a nice
overview of what's there, and tags so you can filter the _changes feed based on
that.

A document looks like::

    {
      title: "Single line title, no html",
      content: "multi line, no html",
      tags: ["list", "of", "tags"],
      created_at: <timestamp>
    }

Getting started
===============

Use ``make get-deps`` to download jQuery and google-code-prettify_.
Then ``couchapp init`` and ``couchapp push http://127.0.0.1:5984/paste``.

Finally open http://127.0.0.1:5984/paste/_design/paste/_rewrite/


How does it work
================

The main page, ``_attachments/index.html`` is a static page served directly
by CouchDB. It uses ajax post to create the paste document in the
database via the update function ``updates/create.js``. The update function
makes sure the document is good enough and adds a timestamp field (created_at).

The main page also displays the 10 last pastes using the view defined in
``views/timestamp/map.js``.

All ajax requests happen through **relative urls** (relative to the _rewrite/ url),
so it will work both when accessed as vhost, directly from couchdbs rewriter or
prefixed behind a proxy.

Pastes are show by their document id, via the ``shows/paste.js`` function. This
function will use a mustache template ``templates/paste.html`` to create a html
around the document. There's also a ``shows/raw.js`` which just displays the
raw contents of the paste, and it will add the paste title and tags to the http
headers.


Setup vhosts
============

Go to the configuration page of CouchDB (it's right there on the right in Futon),
and then click on "Add a new section", set ``vhosts`` as section, your domain name
as option, and ``/paste/_design/paste/_rewrite`` as value. This thing in the config
file will look like::

    [vhosts]
    paste.example.tld = /paste/_design/paste/_rewrite

or with ``curl``::

    curl -X PUT http://localhost:5984/_config/vhosts/paste.example.tld \
        -d '"/paste/_design/paste/_rewrite"'


Read the documentation about `CouchDB Virtual Hosts`_ for
further info.


.. _google-code-prettify: http://code.google.com/p/google-code-prettify/
.. _CouchDB Virtual Hosts: http://wiki.apache.org/couchdb/Virtual_Hosts
