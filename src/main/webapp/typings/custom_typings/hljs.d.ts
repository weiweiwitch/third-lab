interface Hljs {
	highlightAuto(
		value: string,
		languageSubset?: string[]): any;
}

declare var hljs: Hljs;
