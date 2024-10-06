import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';
import Inspector from './inspector';
import useStyle from './style';

export default function Edit({ attributes, setAttributes, advancedControls }) {
	const { BoilerplateStyleTag } = window?.boilerplateBlocks?.components;
	const { useDeviceType } = window?.boilerplateBlocks?.helpers;
	const styles = useStyle(attributes);
	const device = useDeviceType();
	const blockProps = useBlockProps({
		className: 'sample-block',
	});
	
	return (
		<>
			<Inspector {...{ attributes, setAttributes, advancedControls, device }} />
			<BoilerplateStyleTag 
				attributes={attributes}
				setAttributes={setAttributes}
				styles={styles}
			/>
			<div {...blockProps}>
				<RichText
					className="sample-block__content"
					tagName={attributes?.tag}
					value={attributes?.content}
					onChange={(value) => setAttributes({ content: value })}
					placeholder={__('Heading...', 'boilerplate-blocks')}
				/>
			</div>
		</>
	);
}
