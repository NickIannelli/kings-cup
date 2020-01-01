export const moveToNextField = () => {
	const allElements = document.querySelectorAll('input');
	//Find the current tab index.
	const currentIndex = [...allElements].findIndex(el => document.activeElement.isEqualNode(el));
	if (currentIndex + 1 < allElements.length) {
		allElements[currentIndex + 1].focus();
	} else {
		document.activeElement.blur();
	}
};
