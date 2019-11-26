/**
 * @file Icon.js
 * @author 
 */

import React from "react";

// icon glyphs
const glyphs = {
<%for (var i = 0, last = icons.length - 1; i < last; i++) {-%>
    <%-`'${icons[i].name}':'${icons[i].d}', `%>
<%};-%>
    <%-`'${icons[last].name}':'${icons[last].d}' `%>
};

const Icon = props => (
    <svg width={props.width || 120} height={props.height || 120} viewBox={props.viewBox || "<%=viewBox%>"}>
        <path fill={props.color || '#000'} d={glyphs[props.name] || ''}></path>
    </svg>
);

export default Icon;