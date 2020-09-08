#!/bin/bash

# save current working directory
cwd=$(pwd)

run_client () {
    npm start --prefix "${cwd}/client"
}

run_client
