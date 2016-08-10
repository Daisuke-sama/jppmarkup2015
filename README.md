# [Markup of japan-partner.com](http://japan-partner.com)

Here some notes about a project, which describes how to edit and compile it.

## Dependecies
For building and changing you have to install:
1. [NodeJS](http://nodejs.org) - npm shell commands are used.
2. [gulp](http://gulpjs.com) - js task runner for auto processing source code.
3. Plugins for gulp.

All after the first point you can install with command from a shell or terminal from the project directory like _npm install_.

## Tools
The project was written with PhpStorm IDE. You can install recover developer's settings for the IDE from the file _settings_backup_.

## Frameworks, engines, preprocessors
1. Using [Jade/Pug](http://jade-lang.com) templater for generation html markup.
2. Using [SASS](http://sass-lang.com/) preprocessor for CSS generation.
3. Using vanilla javascript and jQuery for client-side scripts.
4. CSS grid based on [Semantic UI](http://semantic-ui.com) framework.

## Project structure
**[node_modules]** is folder with a dependencies from package.json, which installing with NodeJS and running with gulp.

**[public]** is folder with results

**[src]** is folder with source files

**[src/jade] [src/pug] [src/js]** are folders accordingly to names of used technologies. 

**[gulpfile.js]** is settings for gulp.
**[package.json]** is settings for NodeJS.