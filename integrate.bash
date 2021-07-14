
if [ -z $1 ]; then
	echo "No target directory. Pass in target directory as an argument"
else
	rsync -av --progress . $1 --exclude node_modules --exclude .git --exclude benchmark.bash --exclude README.md
fi
