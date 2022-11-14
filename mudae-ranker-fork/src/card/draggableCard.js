import React, {forwardRef} from 'react';
import './card.scss';

export const DraggableCard = forwardRef(({id, name, pictureUrl, skip, ...props}, ref) => {
    const propsStyle = {...props.style}
    // if ("transition" in propsStyle) {
    //     console.log("transition")
    //     delete propsStyle.transition
    // }
    const inlineStyles = {
        backgroundColor: skip?'crimson':'white',
        ...propsStyle,
    };

    const { style, ...newProps } = props;

    return (
        <div className={"CharacterThumbnail"} {...newProps} ref={ref} style={inlineStyles} >
            <img referrerPolicy="no-referrer" className={"Picture"} alt={name} src={pictureUrl} draggable={false}/>
        </div>
    )
});