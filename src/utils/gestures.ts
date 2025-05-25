type Gesture = {
	categoryName: string;
	[key: string]: any;
};

type GestureResult = {
	gestures: Gesture[][];
	handedness: { displayName: "Left" | "Right" }[][];
};

export type SimplifiedGestures = {
	left: string | null;
	right: string | null;
};

export function simplifyGestures(result: GestureResult): SimplifiedGestures {
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

/*
{
    "gestures": [
        [
            {
                "score": 0.9812875390052795,
                "index": -1,
                "categoryName": "A",
                "displayName": ""
            }
        ],
        [
            {
                "score": 0.9793903827667236,
                "index": -1,
                "categoryName": "A",
                "displayName": ""
            }
        ]
    ],
    "handedness": [
        [
            {
                "score": 0.9953292608261108,
                "index": 0,
                "categoryName": "Right",
                "displayName": "Right"
            }
        ],
        [
            {
                "score": 0.9894075989723206,
                "index": 1,
                "categoryName": "Left",
                "displayName": "Left"
            }
        ]
    ],
}

    {gestureResult?.gestures.length ? (
        gestureResult.gestures.map((gestureSet, index) => {
            const handInfo =
                gestureResult.handedness?.[index]?.[0];
            const handLabel =
                handInfo?.displayName || `Hand ${index + 1}`;

            return (
                <div key={index} className='mb-3'>
                    <div className='font-semibold mb-1'>
                        {handLabel} Hand:
                    </div>
                    {gestureSet.map((g) => (
                        <div
                            key={g.categoryName || g.score}
                            className='mb-1 ml-2'
                        >
                            <strong>
                                {g.categoryName || "Unknown"}
                            </strong>
                        </div>
                    ))}
                </div>
            );
        })
*/
