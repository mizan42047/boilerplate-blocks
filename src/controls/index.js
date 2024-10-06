import './scss/main.scss';
import BoilerplateTab from "./tab";
import BoilerplatePanelBody from "./panelbody";
import BoilerplateColor from "./color";
import BoilerplateFontSizePicker from './fontsize-picker';
import BoilerplateStyleTag from './style-tag';
import BoilerplateSpacingSizes from './spacing-sizes';
import BoilerplateResponsive from './responsive';
import BoilerplateToggleGroup from './toggle-group';

if( window?.boilerplateBlocks?.screen ){
    window.boilerplateBlocks.components = {
        BoilerplateTab,
        BoilerplatePanelBody,
        BoilerplateColor,
        BoilerplateFontSizePicker,
        BoilerplateStyleTag,
        BoilerplateSpacingSizes,
        BoilerplateResponsive,
        BoilerplateToggleGroup
    }
}