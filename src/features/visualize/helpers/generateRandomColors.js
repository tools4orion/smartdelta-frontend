export function generateRandomColor() {
	const hue = Math.random() * 360;
	const saturation = 75 + Math.random() * 25;
	const lightness = 40 + Math.random() * 30;
	return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  