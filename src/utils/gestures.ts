import { GestureRecognizerResult } from "@mediapipe/tasks-vision";

export type SimplifiedGestures = {
	left: string | null;
	right: string | null;
};

export function simplifyGestures(
	result: GestureRecognizerResult
): SimplifiedGestures {
	let left: string | null = null;
	let right: string | null = null;

	result.gestures.forEach((gestureSet, index) => {
		const handInfo = result.handedness?.[index]?.[0];
		const label = handInfo?.displayName;

		const topGesture = gestureSet?.[0]?.categoryName ?? null;

		if (label === "Left") {
			left = topGesture;
		} else if (label === "Right") {
			right = topGesture;
		}
	});

	return { left, right };
}
