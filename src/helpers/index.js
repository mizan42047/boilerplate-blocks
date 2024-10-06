import blockNameCamelcase from "./block-name-camelcase";
import generateStyles from "./generate-styles";
import { getSpacingValue } from "./get-css";
import getResponsiveValue from "./get-responsive-value";
import { setDeviceType } from "./set-device-type";
import setResponsiveValue from "./set-responsive-value";
import useDeviceList from "./use-device-list";
import useDeviceType from "./use-device-type";
import useGenerateStyles from "./use-generate-style";

if( window?.boilerplateBlocks?.screen ){
    window.boilerplateBlocks.helpers = {
        generateStyles,
        useGenerateStyles,
        getSpacingValue,
        blockNameCamelcase,
        useDeviceType,
        setDeviceType,
        useDeviceList,
        getResponsiveValue,
        setResponsiveValue
    }
}