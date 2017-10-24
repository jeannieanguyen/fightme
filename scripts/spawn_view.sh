#!/bin/bash

# Prompt for folder names if not provided
echo "Enter page folder (new or existing):"
read folder_dest
echo "Enter file name (with .js extension):"
read file_dest

# Copy template view into dest
cd ./src/views/pages
mkdir -p $folder_dest
cd $folder_dest
cp ../template.js $file_dest