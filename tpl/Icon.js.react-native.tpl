/**
 * @file Icon.js
 * @author 
 */

import React from "react";
import Svg, {Path} from 'react-native-svg';

// icon glyphs
const glyphs = {
<%for (var i = 0, last = icons.length - 1; i < last; i++) {-%>
    <%-`'${icons[i].name}':'${icons[i].d}', `%>
<%};-%>
    <%-`'${icons[last].name}':'${icons[last].d}' `%>
};

const Icon = props => (
    <Svg width={props.width || 120} height={props.height || 120} viewBox={props.viewBox || "<%=viewBox%>"}>
        <Path fill={props.color || '#000'} d={glyphs[props.name] || ''}></Path>
    </Svg>
);

export default Icon;