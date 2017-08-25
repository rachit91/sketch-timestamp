# Timestamp

A Sketch plugin to add or toggle timestamps (last updated date) to the artboards on a page.

<img src = "https://github.com/rachit91/sketch-timestamp/blob/master/resources/assets/timestamp_main_gif.gif"/>

<br>

# Installation

<a href="https://sketchpacks.com/YOUR_NAME/PLUGIN_NAME/install">
  <img width="160" height="41" src="http://sketchpacks-com.s3.amazonaws.com/assets/badges/sketchpacks-badge-install.png" >
</a><br>

1. Download latest .zip file via Github or 
<a href="https://github.com/rachit91/sketch-timestamp/blob/master/versions/timestamp-V1.sketchplugin.zip/">**here**</a>.
2. Unzip and double click to install it.

<br>

# Introduction

Designs keeps changing; versions and versions of artboards/files keep coming in. I often find myself dating these different versions manually in the form of a text layer on an artboard which I change whenever I update the design. And then update the overall version of the design by renaming the sketch file and adding a date to it. 

<b>What if this date updated on its own whenever I made changes to the designs?</b>

This is what 'Timestamp' is trying to achieve. A plugin to add and toggle the timestamps on the artboards in your sketch file. Once you add a timestamp, don't worry about editing it manually. It will automatically update when you change your designs (it is a locked layer - see the gifs below).

Specifically, this is what this plugin can do:

### Features

| Timestamp can                                  | Notes                                                             |
| ----------------------------------------       | ----------------------------------------                          |
| Add a timestamp to a single artboard           | Select the artboard or a layer on the artboard and run the plugin |
| Add a timestamp to multiple artboards at once  | Select multiple artboards and run the plugin                      |
| Add a timestamp to all the artboards on a page | Without selecting anything, run the plugin while on the page      |
| Toggle timestamps on a page                    | Select 'Toggle timestamps' from the menu to hide or show timestamps |

### Usage and shortcuts

- <b>[CTRL + SHIFT + T]</b> or access from 'Plugins' menu to add timestamps to the selected artboard or all the artboards on this page

<br>

<img src = "https://github.com/rachit91/sketch-timestamp/blob/master/resources/assets/timestamp_1_gif.gif"/>

<br><br>

- Timestamp gets updated as the design is updated

<br>

<img src = "https://github.com/rachit91/sketch-timestamp/blob/master/resources/assets/timestamp_gif_2.gif"/>

<br><br>

- <b>[CTRL + SHIFT + Y]</b> or access from 'Plugins' menu to toggle timestamps on a page

<br>

<img src = "https://github.com/rachit91/sketch-timestamp/blob/master/resources/assets/timestamp_gif_3.gif"/>

<br><br>

### Errors

A message informing the user will be shown at the bottom of the screen if:
- There are no artboards on the page
- The artboards do not have any timestamps

<br>

### Constraints

#### V1
- Timestamp is added with pre-defined x,y co-ordinates for an artboard. If your artboards are small, sometimes the layer might end up getting added outside or misplaced -- I'm working on it.
- If you change the name of the layer from 'timestamp' to anything else, it will not update anymore. If you make any changes, remember to name it back to 'timestamp'.
- The timestamp layer is single style, 'Helvetica', 12px and Black color. In future, I will either open it to the user to select the style of the layer or copy the styles from your design.

<br>

# Have suggestions?

If you have any questions, feedback or suggestions, please feel free to reach out to me at 
<a href="mailto:rachitgupta75@gmail.com">rachitgupta75@gmail.com</a>.



