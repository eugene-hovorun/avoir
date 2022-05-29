const categories = [
	{
		id: 1,
		name: 'Interior',
		slug: 'interior',
		image: ''
	},
	{
		id: 2,
		name: 'Exterior',
		slug: 'exterior',
		image: ''
	},
	{
		id: 3,
		name: 'Performance',
		slug: 'performance',
		image: ''
	},
	{
		id: 4,
		name: 'Lighting',
		slug: 'lighting',
		image: ''
	},
	{
		id: 5,
		name: 'Wheels and Tires',
		slug: 'wheels-and-tires',
		image: ''
	},
	{
		id: 6,
		name: 'Parts',
		slug: 'parts',
		image: ''
	},
	{
		id: 7,
		name: 'Body',
		slug: 'body',
		image: ''
	},
	{
		id: 8,
		name: 'Audio',
		slug: 'audio',
		image: ''
	},
	{
		id: 9,
		name: 'Automotive tools',
		slug: 'automotive_tools',
		image: ''
	}
];

export const get = async () => {
	return {
		body: {
			categories
		}
	};
};
