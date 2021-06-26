import React, {forwardRef} from "react";

export const Photo = forwardRef(({character, index, style, ...props}, ref) => {
    // console.log("character: " + JSON.stringify(character) + " inside photo props: " + JSON.stringify(props));
    const inlineStyles = {
        opacity: '1',
        transformOrigin: '0 0',
        height: 200,
        gridRowStart: null,
        gridColumnStart: null,
        backgroundImage: `url("${character.pictureUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'grey',
        ...style,
    };

    return <div ref={ref} style={inlineStyles} {...props} />;
});

/*
const WrappedComponent = React.forwardRef(
function Photo({character, index, style, ...props}, ref) => {
    // console.log("character: " + JSON.stringify(character) + " inside photo props: " + JSON.stringify(props));
    const inlineStyles = {
        opacity: '1',
        transformOrigin: '0 0',
        height: 200,
        gridRowStart: null,
        gridColumnStart: null,
        backgroundImage: `url("${character.pictureUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'grey',
        ...style,
    };

    return <div ref={ref} style={inlineStyles} {...props} />;
});

export default Photo
*/