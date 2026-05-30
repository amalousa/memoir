#!/bin/bash
cd ~/Documents/projects/Amal-memoir
git add .
git commit -m "update $(date '+%Y-%m-%d %H:%M')"
git push origin main
echo ""
echo "✦ Done! Amal's site is updated."
echo "   https://amalousa.github.io/memoir/"
echo ""
read -p "Press enter to close..."
