import { useEffect, useRef, useMemo, useCallback } from '@wordpress/element';

const BoilerplateStyleTag = ({
    attributes, // The attributes object that contains dynamic values.
    styles, // The current styles to be saved or rendered.
    setAttributes, // The function to update attributes.
    attributeKey = 'styles', // The key in attributes where styles should be saved.
    triggerSelector = '.editor-post-publish-button__button', // The selector for the trigger element.
    eventName = 'mouseover', // The event name to trigger saving the styles.
}) => {
    const oldStyles = useRef(attributes?.[attributeKey]);

    // Memoize the styles to avoid unnecessary recalculations if they don't change
    const memoizedStyles = useMemo(() => styles || attributes?.[attributeKey], [styles, attributes, attributeKey]);

    // Memoize the function to update the attribute (saving the styles)
    const setStyles = useCallback((newStyles, oldStylesRef) => {
        if (JSON.stringify(newStyles) !== JSON.stringify(oldStylesRef.current)) {
            setAttributes({ [attributeKey]: newStyles });
            oldStylesRef.current = newStyles;
        }
    }, [setAttributes, attributeKey]);

    useEffect(() => {
        const triggerElement = document.querySelector(triggerSelector);
        if (triggerElement && JSON.stringify(styles) !== JSON.stringify(oldStyles.current)) {
            const handleEvent = () => {
                setStyles(styles, oldStyles);
            };

            // Add the event listener for the specified event
            triggerElement.addEventListener(eventName, handleEvent);

            // Cleanup the event listener properly
            return () => {
                triggerElement.removeEventListener(eventName, handleEvent);
            };
        }
    }, [styles, setStyles, triggerSelector, eventName]); // Added dependencies

    return (
        <style>{memoizedStyles}</style>
    );
};

export default BoilerplateStyleTag;
