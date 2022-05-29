const tailwindColors = require('tailwindcss/colors');

const colors = {
	brand: '#277bfa',
	white: '#ffffff',
	transparent: 'rgba(0,0,0,0)',
	primary: {
		50: '#ecf4ff',
		100: '#d4e5fd',
		200: '#a9cafa',
		300: '#7db0f9',
		400: '#5295f7',
		500: '#277bfa',
		600: '#1f57d4',
		700: '#123a8d',
		800: '#061d47',
		900: '#03112c'
	},
	dark: {
		50: '#f5f7fc',
		100: '#e4e8ef',
		200: '#c9d2de',
		300: '#afbbce',
		400: '#94a4be',
		500: '#798dad',
		600: '#5f779c',
		700: '#435470',
		800: '#303b4e',
		900: '#181e27'
	},
	success: {
		50: '#ddf9f0',
		100: '#bcf3e0',
		200: '#9aecd1',
		300: '#78e6c2',
		400: '#67e0b2',
		500: '#64daa3',
		600: '#24c38e',
		700: '#1a8b65',
		800: '#115d44',
		900: '#093c2b'
	},
	attention: tailwindColors.yellow,
	warning: tailwindColors.red,
	gray: tailwindColors.gray,
	orange: tailwindColors.orange,
	green: tailwindColors.green,
	teal: tailwindColors.teal,
	cyan: tailwindColors.cyan,
	sky: tailwindColors.sky,
	blue: tailwindColors.blue,
	indigo: tailwindColors.indigo,
	purple: tailwindColors.purple,
	pink: tailwindColors.pink,
	rose: tailwindColors.rose
};

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [],
	theme: {
		colors,
		screens: {
			'vw-480': '480px',
			sm: '600px',
			'vw-700': '700px',
			md: '960px',
			lg: '1264px',
			xl: '1904px'
		},
		extend: {
			backgroundImage: {
				gradient: 'linear-gradient(123deg, #428CFB 6.87%, #0537DB 90.53%)',
				'gradient-dark':
					'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(123deg, #428CFB 6.87%, #0537DB 90.53%)'
			},
			letterSpacing: {
				tight: '-.0125rem'
			},
			spacing: {
				7.5: '1.875rem',
				'3px': '3px',
				'14px': '14px'
			}
		}
	},
	safelist: [
		{ pattern: /^w-.*/ },
		{ pattern: /^h-.*/ },
		{ pattern: /^text-.*/ },
		{ pattern: /^bg-.*/ }
	]
};
