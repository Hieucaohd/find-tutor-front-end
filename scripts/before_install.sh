#!/bin/bash

shopt -s extglob
cd /home/ubuntu/findTutorFrontEnd/
rm -v !("node_modules")
rm -R !("node_modules")
shopt -u extglob
