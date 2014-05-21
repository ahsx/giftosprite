#!/bin/bash

set -o nounset
set -o errexit

#/////>//////////////
#
#		Properties
#
#/////>//////////////

TEMP=`mktemp -d -t gif`
SOURCE=''
DEST=''

count=''
dimension=''
width=0
height=0
speed=0
fps=60

#/////>//////////////
#
#		Functions
#
#/////>//////////////


# 
# 	Display the help message
# 
usage()
{
	echo "Gif to SpriteSheet converter"
	echo ""
	echo "Usage: `basename $0` [INPUT] [OUTPUT]"
	echo ""
	echo "Convert the [INPUT] git into a spritesheet at [OUTPUT]"
}

debug()
{
	echo '---------------------'
	echo "SOURCE: $SOURCE"
	echo "DEST: $DEST"
	echo "TEMP: $TEMP"
	echo '---------------------'
}

# 
# 	Prepare the stuff
# 
prepare()
{
	# copy the original to the temp folder
	filename=$(basename $SOURCE)
	cp $SOURCE $TEMP/$filename
	SOURCE="$TEMP/$filename"
}

# 
# 	Get file information
# 
getInfo()
{
	cd $TEMP;
	data=`gifsicle -I < $SOURCE`;

	count=`echo $data | grep -o "[0-9]* images" | cut -d ' ' -f 1`
	dimension=`echo $data | grep -Eoi "[0-9]*x[0-9]*" | head -n 1`
	width=`echo $dimension | cut -d 'x' -f 1`
	height=`echo $dimension | cut -d 'x' -f 2`
	speed=`echo $data | grep -o "delay [0-9\.]*" | cut -d ' ' -f 2 | head -n 1`
	framerate=`bc -l <<< "scale=10; ($fps/($speed/(1/$fps)))"`
}

# 
# 	Export the gif file to a set of frame
# 
exportFrames()
{
	cd $TEMP;
	gifsicle --explode $SOURCE;
}

# 
# 	Concat the frames into a spritesheet
# 
concatFrames()
{
	cd $TEMP;
	filename=$(basename $SOURCE)
	destfilename=$(basename $DEST)

	montage $filename.0* -geometry ${width}x${height} -tile 3 $destfilename
}

#
#	Add the informations into the jpeg
#
addInfo()
{
	cd $TEMP;

	destfilename=$(basename $DEST)
	text="--//gifdata//--count=$count&width=$width&height=$height&speed=$speed&framerate=$framerate"

	echo $text >> $TEMP/$destfilename
}

# 
#	Complete the operation
# 
complete()
{	
	cd $TEMP;
	destfilename=$(basename $DEST)

	mv $TEMP/$destfilename $DEST
	rm -Rf $TEMP
}

# 
# 	Run the script
# 
run()
{
	# debug
	prepare
	getInfo
	exportFrames
	concatFrames
	addInfo
	complete
}

#/////>//////////////
#
#		Validation
#
#/////>//////////////

# no value
if [ $# -eq 0 ]; then
	echo "Error: No value"
	usage
	exit 1
fi

# empty value
if [ -z "$1" ] || [ -z "$2" ]; then
	echo "Error: Emtpy value"
	usage
	exit 1
fi

# mimetype
if file --mime-type $1 | grep -q 'image/gif'$; then
	echo '' > /dev/null
else
	echo 'Error: The input file is not a gif'
fi

SOURCE=`echo $1`

# relative vs absolute path
if [[ "$2" = /* ]]; then
	DEST=`echo $2`
else
	DEST=`echo $(pwd)/$2`
fi

#/////>//////////////
#
#		Show must go on
#
#/////>//////////////
run