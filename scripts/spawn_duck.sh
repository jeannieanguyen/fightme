#!/bin/bash

# First argument is duck name
if [ "$1" != "" ]; then
	duck_name=$1
else
	# Prompt for duck name if not provided
	echo "What is your duck's name?" 
	read duck_name
fi

# Copy template duck into duck folder
cd ./src/ducks
cp -r template $duck_name