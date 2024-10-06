import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
const Layout = ({ attributes, setAttributes, name }) => {
    const { BoilerplatePanelBody, BoilerplateSpacingSizes } = window?.boilerplateBlocks?.components;
    const layoutMarginExcludes = applyFilters('boilerplateBlocks.advancedControl.layout.margin.exclude', new Set([]));
    const layoutPaddingExcludes = applyFilters('boilerplateBlocks.advancedControl.layout.padding.exclude', new Set([]));
    return (
        <BoilerplatePanelBody title={__('Layout', 'boilerplate-blocks')}>
            {
                !layoutPaddingExcludes.has(name) && (
                    <BoilerplateSpacingSizes
                        label={__('Padding', 'boilerplate-blocks')}
                        value={attributes?.padding}
                        onChange={(value) => setAttributes({ padding: value })}
                    />
                )
            }
            {
                !layoutMarginExcludes.has(name) && (
                    <BoilerplateSpacingSizes
                        label={__('Margin', 'boilerplate-blocks')}
                        value={attributes?.margin}
                        onChange={(value) => setAttributes({ margin: value })}
                    />
                )
            }
        </BoilerplatePanelBody>
    );
}
export default Layout;