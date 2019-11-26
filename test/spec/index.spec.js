/**
 * @file index.spec.js
 * @author mengke(kekee000@gmail.com)
 */
const assert = require('assert');
const reactFontSvg = require('../../index');

function getFontFile(name) {
    return require('path').resolve(__dirname, '../fonts/', name);
}

describe('react-font-svg api', function () {

    describe('generate all', function () {
        it('ttf', async function () {
            const iconTexts = await reactFontSvg(getFontFile('fontawesome-webfont.ttf'));
            assert.ok(iconTexts.Icon.match(/glyphs/));
        });
        it('woff', async function () {
            const iconTexts = await reactFontSvg(getFontFile('fontawesome-webfont.woff'));
            assert.ok(iconTexts.Icon.match(/glyphs/));
        });
        it('woff2', async function () {
            const iconTexts = await reactFontSvg(getFontFile('fontawesome-webfont.woff2'));
            assert.ok(iconTexts.Icon.match(/glyphs/));
        });
        it('eot', async function () {
            const iconTexts = await reactFontSvg(getFontFile('fontawesome-webfont.eot'));
            assert.ok(iconTexts.Icon.match(/glyphs/));
        });

    });


    describe('generate by names', function () {
        it('ttf', async function () {
            const iconTexts = await reactFontSvg(getFontFile('fontawesome-webfont.ttf'),
            {names: ['search']});
            assert.ok(iconTexts.Icon.match(/\'search\'/));
        });
        it('woff', async function () {
            const iconTexts = await reactFontSvg(getFontFile('fontawesome-webfont.woff'),
            {names: ['search']});
            assert.ok(iconTexts.Icon.match(/\'search\'/));
        });
        it('woff2', async function () {
            const iconTexts = await reactFontSvg(getFontFile('fontawesome-webfont.woff2'),
            {names: ['search']});
            assert.ok(iconTexts.Icon.match(/\'search\'/));
        });
        it('eot', async function () {
            const iconTexts = await reactFontSvg(getFontFile('fontawesome-webfont.eot'),
            {names: ['search']});
            assert.ok(iconTexts.Icon.match(/\'search\'/));
        });
    });


    describe('generate by unicodes', function () {
        it('ttf', async function () {
            const iconTexts = await reactFontSvg(getFontFile('fontawesome-webfont.ttf'),
            {unicodes: [0xf2e0]});
            assert.ok(iconTexts.Icon.match(/\'uniF2E0\'/));
        });
        it('woff', async function () {
            const iconTexts = await reactFontSvg(getFontFile('fontawesome-webfont.woff'),
            {unicodes: [0xf2e0]});
            assert.ok(iconTexts.Icon.match(/\'uniF2E0\'/));
        });
        it('woff2', async function () {
            const iconTexts = await reactFontSvg(getFontFile('fontawesome-webfont.woff2'),
            {unicodes: [0xf2e0]});
            assert.ok(iconTexts.Icon.match(/\'uniF2E0\'/));
        });
        it('eot', async function () {
            const iconTexts = await reactFontSvg(getFontFile('fontawesome-webfont.eot'),
            {unicodes: [0xf2e0]});
            assert.ok(iconTexts.Icon.match(/\'uniF2E0\'/));
        });
    });
});