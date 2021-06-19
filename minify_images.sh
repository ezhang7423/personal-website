#!/bin/bash
cd img/real-portfolio
sudo apt install optipng -y
## Keep file system permission and make a backup of original PNG (see options below)  ##
for i in *.png; do optipng -o5 -clobber -quiet -preserve -dir . "$i"; done