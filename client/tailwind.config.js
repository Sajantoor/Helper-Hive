/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				'mdlg': '800px', // Custom breakpoint between md and lg
			},
			colors: {
				primaryYellow: '#FABD22',
				altTextGray: '#999999',
				altTextBrown: '#A98D36',
				tagYellow: '#FFE6A6',
				placeholderGray: "#F5F5F5",
				placeholderGrayText: "#7A7A7A",
				darkGray: '#373737',
			}
		},
	},
	plugins: []
};
