/**
 * @file index.js
 * @author mengke(kekee000@gmail.com)
 */

const path = require('path');
const fs = require('fs');
const {Font, woff2} = require('fonteditor-core');
const ejs = require('ejs');

function readFile(fontFile, fontType) {
    return new Promise((resolve, reject) => {
        const readBuffer = () => {
            fs.readFile(fontFile, function (err, buffer) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buffer);
            });
        };

        if (fontType === 'woff2') {
            woff2.init().then(readBuffer, reject);
        }
        else {
            readBuffer();
        }
    });
}


function getIconData(font, options) {
    if (options.names || options.unicodes) {
        let names = [];
        if (Array.isArray(options.names)) {
            names = options.names;
        }
        else if (typeof options.names === 'string') {
            names = options.names.split(/\s|,|\|/g).map(n => n.trim());
        }

        let unicodes = [];
        if (Array.isArray(options.unicodes)) {
            unicodes = options.unicodes;
        }
        else if (typeof options.unicodes === 'number') {
            unicodes = [options.unicodes];
        }
        else if (typeof options.unicodes === 'string') {
            unicodes = options.unicodes.split(/\s|,|\|/g).map(n => +n);
        }

        let glyfList = font.find({
            filter: function (glyf) {
                return glyf.name && names.includes(glyf.name) 
                    || glyf.unicode && unicodes.includes(glyf.unicode[0]);
            }
        });
        if (!glyfList.length) {
            throw new Error('no glyph found');
        }

        font.data.glyf = [font.data.glyf[0], ...glyfList];
    }

    const svgText = font.write({
        type: 'symbol'
    });

    let unitsPerEm = font.data.head.unitsPerEm;
    let descent = font.data.hhea.descent;
    const iconData = {
        viewBox: `0 ${descent} ${unitsPerEm} ${unitsPerEm}`,
        icons: []
    };
    let match = null;
    let glyphReg = /<symbol\s+id="([^"]*)"\s+viewBox="([-.\d\s]+)">\s*<path\s+d="([^"]*)"/g;
    while ((match = glyphReg.exec(svgText))) {
        if (match[1] && match[3]) {
            iconData.icons.push({
                name: match[1],
                viewBox: match[2],
                d: match[3]
            });
        }
    }

    return iconData;
}

function getIconTpl(options) {
    let tplPath = options.platform === 'react'
        ? './tpl/Icon.js.react.tpl'
        : './tpl/Icon.js.react-native.tpl';
    return path.resolve(__dirname, tplPath);
}

module.exports = function (fontFile, options = {}) {
    const fontType = (path.extname(fontFile).slice(1) || 'ttf').toLowerCase();
    let promise = readFile(fontFile, fontType).then(buffer => {
        const fontOptions = {
            type: fontType,
            compound2simple: true,
            inflate: null, // inflate function for woff
            combinePath: false, // for svg path
        };
        // woff inflate function
        if (fontType === 'woff') {
            fontOptions.inflate = require('pako').inflate;
        }

        let font = Font.create(buffer, fontOptions);
        let iconData = getIconData(font, options);
        let iconJsStr = ejs.render(fs.readFileSync(getIconTpl(options), 'utf-8'), iconData);

        // has dest directory
        if (options.dest) {
            if (fs.existsSync(options.dest) && fs.statSync(options.dest).isDirectory()) {
                let outputIconJs = path.resolve(options.dest, 'Icon.js');
                fs.writeFileSync(outputIconJs, iconJsStr);
            }
            else {
                throw new Error('`' + options.dest + '` is not a directory.');
            }
        }
        return {'Icon': iconJsStr};
    });

    // cli mode should output icon text
    if (options.isCLI) {
        promise
            .then(data => {
                if (!options.dest) {
                    console.log(data.Icon);
                }
            }).catch(e => {
                console.error(e);
                process.exit(1);
            });
    }
    else {
        return promise;
    }
};