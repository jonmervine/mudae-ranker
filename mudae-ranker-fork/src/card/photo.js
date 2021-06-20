import React, {forwardRef} from "react";

export const Photo = forwardRef(({character, index, faded, style, ...props}, ref) => {
    console.log("character is: " + JSON.stringify(character) + " index is: " + index + " style is: " + JSON.stringify(style) + " inside photo: " + JSON.stringify(props));
    const inlineStyles = {
        opacity: faded ? '0.2' : '1',
        transformOrigin: '0 0',
        height: 200,
        gridRowStart: null,
        gridColumnStart: null,
        backgroundImage: `url("${character}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'grey',
        ...style,
    };

    return <div ref={ref} style={inlineStyles} {...props} />;
});