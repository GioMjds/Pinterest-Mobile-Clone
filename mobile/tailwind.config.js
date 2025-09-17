import { platformSelect } from "nativewind/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './index.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			fontFamily: {
				onest: ['Onest'],
				'onest-bold': ['Onest-Bold'],
				'onest-semibold': ['Onest-SemiBold'],
				system: platformSelect({
					android: 'Onest',
					ios: 'Onest',
					default: 'system-ui',
				})
			},
			colors: {
				red: {
					DEFAULT: '#E60023', // Pushpin 450 – main CTA & brand identifier :contentReference[oaicite:10]{index=10}
					50: '#FFF7F7', // very light tint – backgrounds, hover etc. :contentReference[oaicite:11]{index=11}
					100: '#FFEBEB',
					200: '#FFE0E0',
					300: '#FCBBBB',
					400: '#F47171',
					500: '#CC0000',
					600: '#B60000',
					700: '#9B0000',
					800: '#800000',
					900: '#660000',
				},
				pink: {
					DEFAULT: '#DE2C62', // Flaminglow 500 – for decorative / accent usages :contentReference[oaicite:12]{index=12}
					50: '#FFF8FA',
					100: '#FFEBF1',
					200: '#FFDFE9',
					300: '#FFBED2',
					400: '#FE8EB1',
					500: '#DE2C62',
					600: '#C31952',
					700: '#A30C4A',
					800: '#82053E',
					900: '#630233',
				},
				blue: {
					DEFAULT: '#0074E8', // Skycicle 500 – links, info-actions etc. :contentReference[oaicite:13]{index=13}
					50: '#F7FBFF',
					100: '#E6F4FF',
					200: '#D7EDFF',
					300: '#ABDBFF',
					400: '#75BFFF',
					500: '#0074E8',
					600: '#005FCB',
					700: '#004BA9',
					800: '#003C96',
					900: '#002966',
				},
				teal: {
					DEFAULT: '#00857C', // Spabattical 500 – secondary functional color (success / accent) :contentReference[oaicite:14]{index=14}
					50: '#F7FDFC',
					100: '#E6FAF5',
					200: '#CCF6EE',
					300: '#75E4D5',
					400: '#48D5C6',
					500: '#00857C',
					600: '#006B6C',
					700: '#005C62',
					800: '#005062',
					900: '#003440',
				},
				green: {
					DEFAULT: '#008753', // Matchacado 500 – status success etc. :contentReference[oaicite:15]{index=15}
					50: '#F6FDF5',
					100: '#E3FAE1',
					200: '#C3F9C2',
					300: '#A4F9AC',
					400: '#6BEC8C',
					500: '#39D377',
					600: '#008753',
					700: '#005F3E',
					800: '#00422C',
					900: '#00261A',
				},
				purple: {
					DEFAULT: '#812AE7', // Mysticool 500 – decorative / brand touches etc. :contentReference[oaicite:16]{index=16}
					50: '#F8F7FF',
					100: '#F0EDFF',
					200: '#E9E4FF',
					300: '#D5C7FF',
					400: '#B190FF',
					500: '#9E68FF',
					600: '#812AE7',
					700: '#6B16CA',
					800: '#400387',
					900: '#2C0066',
				},
				orange: {
					DEFAULT: '#DE3700', // Firetini 500 – warnings, alerts etc. :contentReference[oaicite:17]{index=17}
					50: '#FFF6EB',
					100: '#FFF0DB',
					200: '#FFE4C1',
					300: '#FFC58F',
					400: '#FDA161',
					500: '#DE3700',
					600: '#C32F00',
					700: '#A42700',
					800: '#842000',
					900: '#660E00',
				},
				yellow: {
					DEFAULT: '#BD5B00', // Caramellow 500 – warnings / status etc. :contentReference[oaicite:18]{index=18}
					50: '#FFFEDB',
					100: '#FFFEBB',
					200: '#FFFD92',
					300: '#FAE600',
					400: '#FDC900',
					500: '#E18D00',
					600: '#BD5B00',
					700: '#AA4900',
					800: '#943A00',
					900: '#7C2D00',
				},
			},
			// NEUTRALS (text, background, borders, etc.)
			neutral: {
				white: '#FFFFFF', // Mochimalist 0 – main backgrounds, text contrast, etc. :contentReference[oaicite:19]{index=19}
				gray: {
					50: '#F9F9F9',
					100: '#F1F1F1',
					200: '#E9E9E9', // Roboflow 200 – light backgrounds / separators :contentReference[oaicite:20]{index=20}
					300: '#CDCDCD',
					400: '#A5A5A5',
					500: '#767676', // Roboflow 500 – default secondary text, icons :contentReference[oaicite:21]{index=21}
					550: '#5F5F5F',
					600: '#4A4A4A',
					700: '#2B2B2B',
					800: '#191919',
					900: '#111111', // Cosmicore 900 – main text, strong contrast :contentReference[oaicite:22]{index=22}
				},
			},
		},
	},
	plugins: [],
};
