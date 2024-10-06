import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import BoilerplateBlocksWrapperProps from './blocks-wrapper-props';
import Layout from './components/layout';
import useStyle from './style';
import * as previews from './preview';

const BoilerplateBlocksAdvancedControls = createHigherOrderComponent(
    (BlockEdit) => (props) => {
        if(props?.name?.includes('boilerplate-blocks/')) {
            // Preview mode
            if(props?.attributes?.preview){
                const { blockNameCamelcase } = window?.boilerplateBlocks?.helpers;
                const name = blockNameCamelcase(props?.name);
                const Preview = previews[name];
                return Preview;
            }
            
            // Edit mode
            const { BoilerplateStyleTag } = window?.boilerplateBlocks?.components;
            const styles = useStyle(props?.attributes);
            const wrappedProps = {
                ...props,
                advancedControls: (
                    <>
                        <Layout {...props} />
                    </>
                )
            };
            return (
                <>
                    <BoilerplateStyleTag
                        attributes={props?.attributes}
                        setAttributes={props?.setAttributes}
                        styles={styles}
                        attributeKey="globalStyles"
                    />
                    <BlockEdit {...wrappedProps} />
                </>
            )
        }

        return <BlockEdit {...props} />;
    },
);

addFilter(
    'editor.BlockEdit',
    'boilerplate-blocks/addAdvancedControls',
    BoilerplateBlocksAdvancedControls
);

addFilter(
    'editor.BlockListBlock',
    'boilerplate-blocks/blockWrapper',
    BoilerplateBlocksWrapperProps
);