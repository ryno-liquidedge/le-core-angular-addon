<?php

namespace LiquidEdge\LeCoreAngular;

class AngularElementInjector {

	protected array $elements = [];

	//-------------------------------------------------------------------------------------
	public function register(string $name, array $scripts): void {
		$this->elements[$name] = $scripts;
	}

	//-------------------------------------------------------------------------------------
	public function render(string $name): string {
		if (!isset($this->elements[$name])) {
			return "<!-- Angular Element '$name' not registered -->";
		}

		$tags = array_map(fn($src) => "<script src=\"$src\"></script>", $this->elements[$name]);
		return implode("\n", $tags) . "\n<$name></$name>";
	}
	//-------------------------------------------------------------------------------------
}
