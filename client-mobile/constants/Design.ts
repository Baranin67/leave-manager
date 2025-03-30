export const Design = {
	font: {
		label: {
			family: 'NotoSans',
			size: {
				small: 12,
				medium: 14,
				large: 16,
			},
			weight: {
				regular: '400',
				semiBold: '600',
				bold: '800',
			},
		},
		body: {
			family: 'NotoSans',
			size: {
				small: 14,
				medium: 16,
				large: 20,
			},
			weight: {
				regular: '400',
				semiBold: '600',
				bold: '800',
			},
		},
		heading: {
			family: 'NotoSans',
			size: {
				small: 20,
				medium: 24,
				large: 32,
			},
			weight: {
				regular: '400',
				semiBold: '600',
				bold: '800',
			},
		},
	},
	border: {
		small: 1,
		medium: 2,
		large: 4,
	},
	radius: {
		small: 4,
		medium: 8,
		large: 16,
		full: 999,
	},
	space: {
		xxsmall: 4,
		xsmall: 8,
		small: 16,
		medium: 24,
		large: 32,
		xlarge: 48,
		xxlarge: 64,
	},
	icon: {
		small: 16,
		medium: 24,
		large: 32,
	},
	profile: {
		small: 48,
		medium: 64,
		large: 128,
	},
} as const;
