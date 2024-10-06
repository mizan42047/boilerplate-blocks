import { createHigherOrderComponent } from '@wordpress/compose';
import { applyFilters } from '@wordpress/hooks';
import clsx from 'clsx';
import { useEffect } from '@wordpress/element';

const BoilerplateBlocksWrapperProps = createHigherOrderComponent(
    (BlockListBlock) => (props) => {
        const { attributes, setAttributes, name, clientId } = props;

        if (name?.includes('boilerplate-blocks/')) {
            useEffect(() => {
                const hash = clientId?.slice(-6);
                setAttributes({ blockClass: `boilerplate${hash}` });
            }, [clientId]);

            const globalWrapperProps = {
                ...props.wrapperProps,
                className: clsx(
                    attributes?.blockClass
                )
            }

            const wrapperProps = applyFilters('boilerplateBlocks.blockWrapper.attributes', globalWrapperProps, attributes);
            return <BlockListBlock {...props} wrapperProps={wrapperProps} />
        }
        return (
            <BlockListBlock {...props} />
        )
    },
    'BoilerplateBlocksWrapperProps'
);
export default BoilerplateBlocksWrapperProps