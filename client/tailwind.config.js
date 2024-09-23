/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				'desktop': '550px', // "not mobile"
				// ex: class="text-center desktop:text-left" centers on mobile only
				// OR: class="max-desktop:text-center" does same
				'mdlg': '896px' // Custom breakpoint between md and lg
			},
			colors: {
				primaryYellow: '#FABD22',
				altTextGray: '#999999',
				altTextBrown: '#A98D36',
				tagYellow: '#FFE6A6',
				placeholderGray: "#F5F5F5",
				placeholderGrayText: "#7A7A7A",
				darkGray: '#373737',
				dimBlack: '#646464'
			}
		},
	},
	plugins: []
};
