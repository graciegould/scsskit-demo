import _ from 'lodash';
import { rgb } from 'scsskit/colors';

export default {
    breakpoints: {
        miniPortrait: {
            maxWidth: 500,
            maxHeight: 600,
            orientation: 'portrait'
        },
        miniLandscape: {
            maxWidth: 600,
            maxHeight: 500,
            orientation: 'landscape'
        },
        xxsH: {
            maxHeight: 290
        },
        xsH: {
            minHeight: 291,
            maxHeight: 499
        },
        smH: {
            minHeight: 500,
            maxHeight: 599
        },
        mdH: {
            minHeight: 600,
            maxHeight: 699
        },
        lgH: {
            minHeight: 700,
            maxHeight: 799
        },
        xlH: {
            minHeight: 800,
            maxHeight: 859
        },
        xxlH: {
            minHeight: 860
        },
        xxs: {
            minWidth: 500,
            maxWidth: 599
        },
        xs: {
            minWidth: 600,
            maxWidth: 767
        },
        sm: {
            minWidth: 768,
            maxWidth: 991
        },
        md: {
            minWidth: 992,
            maxWidth: 1199
        },
        lg: {
            minWidth: 1200,
            maxWidth: 1399
        },
        xl: {
            minWidth: 1400,
            maxWidth: 1699
        },
        xxl: {
            minWidth: 1700
        },
    },
    colors: {
        lightYellow: rgb(252, 226, 155),
        darkYellow: rgb(255, 195, 111),
        orange: rgb(255, 178, 0),
        darkOrange: rgb(255, 119, 0),
        red: rgb(255, 29, 104),
        darkRed: rgb(255, 0, 0),
        lightPink: rgb(247, 197, 226),
        magenta: rgb(247, 109, 229),
        purple: rgb(212, 122, 251),
    }
};
