---
title: 'Converting .mov to .gif on Mac'
tags: ['mac', 'gif', 'mov']
excerpt: 'A guide for writing a shell function to convert a .mov to a .gif'
---

# Creating Gifs from Movs on Mac

I've recently been asked to put screen recordings on tickets/PRs. Github and JIRA both make this simple enough as they both accept video formats. However sometimes you just want a smaller, looped image, hence the transformation to gifs. I found a great, albeit dated, [gist][gist] on github and wanted to document how I've used it.

## Installation

In order to use the following instructions you will need to be on MacOS (I'm using Catalina 10.15.5) and have homebrew installed. Confirm you have the following dependencies installed `ffmpeg` and `gifsicle`; otherwise run the following:

```sh
brew install ffmpeg gifsicle
```

## Usage

TL;DR use the following command to convert {MOV_FILENAME}.mov to {GIF_FILENAME}.gif

```sh
ffmpeg -i {MOV_FILENAME}.mov -r 10 -f gif - |
gifsicle --delay=10 --optimize=3 > {GIF_FILENAME}.gif
```

Basically the ffmpeg binary takes the input (`-i {MOV_FILENAME}.mov`) sets the framerate (`-r 10`) and the format (`-f gif`). The resulting stream is then piped to the gifsicle binary. The optimization level is set to the highest level (`--optimize=3`) and the delay between frames is set to better match our framerate (`--delay=10`). The higher level will take longer but may produce better quality results. The stream is combined and returned with the given filename (`> {GIF_FILENAME}.gif`).

## One step further

You can take this one step further with an alias/function in your zsh profile.

```sh
movToGif(){
  ffmpeg -i "$1" -r 25 -f gif - | 
  gifsicle --optimize=3 > ~/Documents/Screenshots/gifs/"$2".gif && rm "$1"
}
```

Here I've chosen to set the framerate to 25 and to set my input and output into arguments. I've also set it so that the generated gifs will always be created within the directory that I'm already storing my screenshots. After re-sourcing my zsh profile I can then call it from my terminal like this `movToGif in.mov out` which will generate `~/Documents/Screenshots/gifs/out.gif` from `in.mov`.

[gist]: https://gist.github.com/dergachev/4627207
