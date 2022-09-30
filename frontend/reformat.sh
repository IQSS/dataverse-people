#!/bin/sh
prettier --parser html --write *.html
prettier --parser babel --write js/*.js
prettier --parser html --write react/public/*.html
prettier --parser babel --write react/src/*.js
