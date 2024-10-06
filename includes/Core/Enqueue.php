<?php
namespace BoilerplateBlocks\Core;

defined('ABSPATH') || exit;

use BoilerplateBlocks\Traits\SingletonTrait;

class Enqueue {

    use SingletonTrait;

    /**
     * Constructor.
     * Hooks into WordPress actions to enqueue assets for block editor.
     */
    private function __construct() {
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));
        add_action('enqueue_block_assets', array($this, 'enqueue_block_assets'));
    }

    /**
     * Enqueue block editor assets.
     * Calls the reusable method to register and enqueue the block editor script.
     *
     * @return void
     */
    public function enqueue_block_editor_assets() {
        $this->register_and_enqueue_script(
            'boilerplate-blocks-controls',
            BOILERPLATE_BLOCKS_PLUGIN_URL . 'build/controls/index.js',
            BOILERPLATE_BLOCKS_PLUGIN_DIR . 'build/controls/index.asset.php'
        );

        $this->register_and_enqueue_script(
            'boilerplate-blocks-helpers',
            BOILERPLATE_BLOCKS_PLUGIN_URL . 'build/helpers/index.js',
            BOILERPLATE_BLOCKS_PLUGIN_DIR . 'build/helpers/index.asset.php'
        );

        $this->register_and_enqueue_script(
            'boilerplate-blocks-global',
            BOILERPLATE_BLOCKS_PLUGIN_URL . 'build/global/index.js',
            BOILERPLATE_BLOCKS_PLUGIN_DIR . 'build/global/index.asset.php'
        );
        
        $this->register_and_enqueue_style(
            'boilerplate-blocks-controls',
            BOILERPLATE_BLOCKS_PLUGIN_URL . 'build/controls/index.css',
            BOILERPLATE_BLOCKS_PLUGIN_VERSION
        );
    }

    /**
     * Enqueue block assets.
     * Calls the reusable method to register and enqueue the block script.
     */
    public function enqueue_block_assets() {
        $this->register_and_enqueue_style(
            'boilerplate-blocks-global',
            BOILERPLATE_BLOCKS_PLUGIN_URL . 'build/global/style-index.css',
            BOILERPLATE_BLOCKS_PLUGIN_VERSION
        );
    }

    /**
     * Register and enqueue a script.
     * This method registers and enqueues a script based on asset file information.
     *
     * @param string $handle Script handle.
     * @param string $src Script URL.
     * @param string $asset_file Path to the asset file containing dependencies and version.
     * @param bool $in_footer Whether to enqueue the script in the footer.
     *
     * @return void
     */
    private function register_and_enqueue_script($handle, $src, $asset_file, $in_footer = true) {
        if (file_exists($asset_file)) {
            $asset_data = include $asset_file;
            
            wp_register_script(
                $handle,
                $src,
                isset($asset_data['dependencies']) ? $asset_data['dependencies'] : array(),
                isset($asset_data['version']) ? $asset_data['version'] : false,
                $in_footer
            );

            wp_enqueue_script($handle);
        }
    }

    /**
     * Register and enqueue a style.
     * This method registers and enqueues a style file.
     *
     * @param string $handle Style handle.
     * @param string $src Style URL.
     * @param string|null $version Style version.
     *
     * @return void
     */
    private function register_and_enqueue_style($handle, $src, $version = null) {
        wp_register_style($handle, $src, array(), $version);
        wp_enqueue_style($handle);
    }
}
