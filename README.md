giftosprite
===========

Transform an animated gif to a jpeg sprite. Some metadata are stored at the end of the file to help the parser to reproduce the animation. Currently the framerate is deduced from the first frame.

The script has been tested only on osx 10.9.2 but should work on previous version of the os. 

## Dependencies

- `ImageMagick 6.8.x+`  
For an easy install on osx use [Homebrew](http://brew.sh/):  

```bash
brew install ImageMagick
```

- `gifsicle 1.+`  
You'll find the installation instruction on the [official website](http://www.lcdf.org/gifsicle/)


## Usage

```bash
giftosprite.sh [source] [destination]
```

**Source:** The source file must exists and be a image/gif file.   
**Destination:** Can be either a relative or an absolute path. The script will output a jpeg file so name 

## Example

Convert file.gif to a spritesheet named file.jpg

```bash
giftosprite.sh file.gif file.jpg
```

## TODO

Possible enhancement for the script. 

- Add an option for the output format
- Handle multiple framerate