#!/usr/bin/env node

/**
 * @file index.js
 * @author mengke(kekee000@gmail.com)
 */
const meow = require('meow');
const fs = require('fs');
const main = require('./index');


const cli = meow(
`Usage
  $ react-font-svg <file> [<output>]

Example
  $ react-font-svg ./src/font.ttf
  $ react-font-svg ./src/font.ttf -n 'music,search' -u '0xf00d,0xf00e' -d ./src/icons


Options,
  -n, --names                         glyph names to output eg. -n music,search
  -u, --unicodes                      unicode code points to output eg. -u 0xe001,0xe002
  -d, --dest                          output folder
  -p, --platform                      component template: react-native|react
`, {
    flags: {
        names: {type: 'string', alias: 'n'},
        unicodes: {type: 'string', alias: 'u'},
        separate: {type: 'boolean', alias: 's'},
        dest: {type: 'string', alias: 'd'},
        platform: {type: 'string', alias: 'p'}
    }
});

// version
if (cli.flags.version) {
    console.log(require('./package.json').version);
    process.exit(0);
}

if (cli.flags.h) {
    console.log(cli.help);
    process.exit(0);
}

if (!cli.input.length) {
    console.log('no font file selected.');
    process.exit(1);
}

if (!fs.existsSync(cli.input[0])) {
    console.log('font file not exists.');
    process.exit(1);
}

// console.log(cli.flags)
main(cli.input[0], {
    names: cli.flags.names,
    unicodes: cli.flags.unicodes,
    separate: cli.flags.separate,
    dest: cli.flags.dest,
    platform: cli.flags.platform,
    isCLI: true
});