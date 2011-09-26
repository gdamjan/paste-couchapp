SCRIPT="_attachments/script/"

all:
	@echo Usage:
	@echo "   make get-deps"
	@echo
	@echo 'Then run:'
	@echo '  couchapp init'
	@echo '  couchapp push http://127.0.0.1:5984/paste'


get-deps:
	mkdir -p ${SCRIPT}
	cd ${SCRIPT} && wget -q -N http://code.jquery.com/jquery.min.js
	cd ${SCRIPT} && wget -q -O - http://google-code-prettify.googlecode.com/files/prettify-small-1-Jun-2011.tar.bz2 | tar xvjf -
	cd ${SCRIPT}/google-code-prettify && wget -q http://code.google.com/p/google-code-prettify/source/browse/trunk/styles/desert.css
