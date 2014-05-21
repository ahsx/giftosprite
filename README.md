giftosprite
===========

Transform animated gif to sprite for enhanced performance


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

```bash
giftosprite.sh file.gif file.jpg

```