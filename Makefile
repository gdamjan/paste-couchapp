SCRIPT="_attachments/script/"
VENDOR="vendor/"
all:
	@echo 'Usage:'
	@echo '   make get-deps'
	@echo
	@echo 'Then run:'
	@echo '  couchapp init'
	@echo '  couchapp push http://127.0.0.1:5984/paste'


get-deps:
	mkdir -p ${VENDOR}
	mkdir -p ${SCRIPT}
	cd ${SCRIPT} && wget -qN http://code.jquery.com/jquery.min.js
	cd ${SCRIPT} && wget -q -O - http://google-code-prettify.googlecode.com/files/prettify-small-1-Jun-2011.tar.bz2 | tar xvjf -
	cd ${SCRIPT} && wget -qN https://raw.github.com/defunkt/jquery-pjax/master/jquery.pjax.js
	cd ${VENDOR} && wget -qN https://raw.github.com/janl/mustache.js/master/mustache.js
