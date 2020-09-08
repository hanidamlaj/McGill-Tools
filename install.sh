#!/bin/bash

# save current working directory
cwd=$(pwd)

# install server dependencies
npminstall_serv () {
    npm install --prefix "${cwd}/server"
}

# install client dependencies
npminstall_client () {
    npm install --prefix "${cwd}/client"
}

# run both concurrently
npminstall_serv & npminstall_client