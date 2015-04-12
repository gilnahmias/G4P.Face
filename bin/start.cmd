@echo on

echo compiling static content
call compile_static.cmd

echo starting server
node ./bin/www