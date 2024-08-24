/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		screens: {
			'sm': '640px',
			'md': '768px',
			'mdlg': '800px', // Custom breakpoint between md and lg
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px'
		},
		colors: {
			primaryYellow: '#FABD22',
			altTextGray: '#999999',
			altTextBrown: '#A98D36',
			tagYellow: '#FFE6A6',
			placeholderGray: "#F5F5F5",
			darkGray: '#373737',
			blue: {
			  500: '#3B82F6'
			},
			red: {
			  500: '#CC3333'
			}
		}
	},
	plugins: []
};
