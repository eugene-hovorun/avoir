/**
 * Click Outside
 * @param {Node} node
 */
export const ClickOutside = (node: HTMLElement, _options = {}) => {
	const options = { include: [], ..._options };

	function detect(event: MouseEvent) {
		const target = event.target as HTMLElement;

		if (!node.contains(target) || options.include.some((i) => target.isSameNode(i))) {
			node.dispatchEvent(new CustomEvent('clickOutside'));
		}
	}

	document.addEventListener('click', detect, { passive: true, capture: true });

	return {
		destroy() {
			document.removeEventListener('click', detect);
		}
	};
};
