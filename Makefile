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
	cd ${VENDOR} && wget -qN https://raw.githubusercontent.com/janl/mustache.js/master/mustache.js
