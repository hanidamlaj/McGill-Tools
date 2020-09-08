#!/bin/bash

# save current working directory
cwd=$(pwd)

run_server () {
    npm run build --prefix "${cwd}/server"
    npm start --prefix "${cwd}/server"
}

run_server
