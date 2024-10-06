<?php

namespace BoilerplateBlocks\Core;

use BoilerplateBlocks\Config\BlocksList;
use WP_Filesystem_Direct;

defined('ABSPATH') || exit;

class Blocks
{
    use \BoilerplateBlocks\Traits\SingletonTrait;

    /**
     * Constructor.
     * Initializes the BlockList and registers the blocks.
     */
    private function __construct()
    {
        add_action('init', [$this, 'register_blocks']);
        add_filter('block_type_metadata', [$this, 'setup_block_metadata'], 10);
        add_filter('render_block_data', [$this, 'render_block_data'], 10);
        add_filter('render_block', [$this, 'render_block'], 10, 2);
    }

    /**
     * Registers the active blocks from the BlockList.
     */
    public function register_blocks()
    {
        $active_blocks = BlocksList::get_instance()->get_list('active');

        if (empty($active_blocks)) {
            return;
        }

        foreach ($active_blocks as $slug => $block) {
            $path = BOILERPLATE_BLOCKS_BLOCKS_DIR . $slug;

            if (is_readable($path)) {
                register_block_type($path);
            }
        }
    }

    /**
     * Gets global attributes from a JSON file.
     *
     * @return array The global attributes defined in the JSON file.
     */
    public function get_global_attributes()
    {
        // Load necessary WordPress files
        require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-base.php';
        require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-direct.php';

        $global_metadata_path = BOILERPLATE_BLOCKS_PLUGIN_DIR . '/build/global/block.json';

        // Check if the file exists before trying to load it
        if (!is_readable($global_metadata_path)) {
            return [];
        }

        $filesystem = new WP_Filesystem_Direct(true);
        $metadata = $filesystem->get_contents($global_metadata_path);

        if (empty($metadata)) {
            return [];
        }

        $decoded_metadata = json_decode($metadata, true);

        if (empty($decoded_metadata['attributes'])) {
            return [];
        }

        return $decoded_metadata['attributes'];
    }

    /**
     * Set up block metadata by merging global attributes.
     *
     * @param array $metadata The metadata of the block.
     *
     * @return array The modified metadata.
     */
    public function setup_block_metadata($metadata)
    {
        if (!isset($metadata['name']) || !str_contains($metadata['name'], 'boilerplate-blocks')) {
            return $metadata;
        }

        $global_attributes = $this->get_global_attributes();

        if (!empty($global_attributes)) {
            $metadata['attributes'] = array_merge($metadata['attributes'], $global_attributes);
        }

        return $metadata;
    }

    /**
     * Modify block data during rendering to include global styles.
     *
     * @param array $parsed_block The parsed block data.
     *
     * @return array The modified block data.
     */
    public function render_block_data($parsed_block)
    {
        if (!isset($parsed_block['blockName']) || !str_contains($parsed_block['blockName'], 'boilerplate-blocks')) {
            return $parsed_block;
        }

        $global_styles = $parsed_block['attrs']['globalStyles'] ?? '';

        if (!empty($global_styles)) {
            // Ensure 'styles' is a string before appending
            $parsed_block['attrs']['styles'] = ($parsed_block['attrs']['styles'] ?? '') . $global_styles;

            unset($parsed_block['attrs']['globalStyles']);
        }

        return $parsed_block;
    }

    /**
     * Append block styles to the rendered block content.
     *
     * @param string $block_content The block's HTML content.
     * @param array  $block         The block data.
     *
     * @return string The modified block content with styles appended.
     */
    public function render_block($block_content, $block)
    {
        $styles = $block['attrs']['styles'] ?? '';
        $block_class = $block['attrs']['blockClass'] ?? '';

        if (!empty($styles) && !empty($block_class)) {
            $block_content = new \WP_HTML_Tag_Processor($block_content);
            $block_content->next_tag();
            $block_content->add_class($block_class);
            $block_content->get_updated_html();
            $block_content = '<style>' . esc_html($styles) . '</style>' . $block_content;
        }

        return $block_content;
    }
}
