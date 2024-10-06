const useStyle = (attributes = {}) => {
    const { useGenerateStyles } = window.boilerplateBlocks.helpers;
    const wrapper = `.${attributes?.blockClass}`;
    return useGenerateStyles(wrapper, () => {
        return {
            '--color': attributes?.textColor,
            '--font-size': attributes?.fontSize,
            '--align-desktop': attributes?.alignmentDesktop,
            '--align-tablet': attributes?.alignmentTablet,
            '--align-mobile': attributes?.alignmentMobile,
        };
    });
}

export default useStyle;
