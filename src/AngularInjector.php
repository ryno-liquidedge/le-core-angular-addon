<?php

namespace LiquidEdge\LeCoreAngular;

class AngularInjector {
	protected array $manifest = [];
	protected string $jsBasePath = '/js/le-core-angular/';

	public function __construct(string $manifestPath) {
		if (!file_exists($manifestPath)) {
			throw new \Exception("Manifest file not found: {$manifestPath}");
		}

		$this->manifest = include $manifestPath;
	}

	/**
	 * Render a component by its key in the manifest.
	 */
	public function render(string $componentName): string {
		if (!isset($this->manifest[$componentName])) {
			throw new \Exception("Component '{$componentName}' not found in manifest.");
		}

		$jsFile = $this->manifest[$componentName];
		$componentTag = $componentName;

		return <<<HTML
<script src="{$this->jsBasePath}{$jsFile}"></script>
<{$componentTag}></{$componentTag}>
HTML;
	}
}

