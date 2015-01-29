DEBUG=microsvc-slave*

test:
	$(MAKE) DEBUG= \
	test-debug

test-debug:
	DEBUG=$(DEBUG) ./node_modules/.bin/mocha test -R spec -t 5000

.PHONY: test
