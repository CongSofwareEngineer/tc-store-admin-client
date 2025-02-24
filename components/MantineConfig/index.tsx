'use client';
import React from 'react';
import { Button, Checkbox, createTheme, Drawer, Input, MantineProvider, Modal, RangeSlider, Select, Textarea, TextInput } from '@mantine/core';

export const theme = createTheme({
	/* Put your mantine theme override here */
	components: {
		Modal: Modal.extend({
			defaultProps: {
				w: 500,
			},
			styles: {
				content: {
					width: 500,
					padding: 5,
					borderRadius: 8,
				},
			},
		}),
		Button: Button.extend({
			defaultProps: {
				radius: 8,
			},
			vars: (_, props) => {
				if (props.variant === 'filled') {
					return {
						root: {
							'--button-bg': '#fcd34d',
							'--button-color': 'black',
							'--button-bd': '#fcd34d',
							'--button-hover': '#fbdf88',
						},
					};
				}
				return {
					root: {
						'--button-bg': '#29a200',
						'--button-hover': '#70bd56',
					},
				};
			},
		}),
		Input: Input.extend({
			defaultProps: {
				radius: 6,
			},
		}),
		TextInput: TextInput.extend({
			defaultProps: {
				radius: 6,
				height: 30,
				pos: 'relative',
				pb: 20,
				mb: 0,
			},
			styles: {
				input: {
					minHeight: 30,
					height: 30,
					marginBottom: 0,
				},
				error: {
					position: 'absolute',
					bottom: 0,
				},
				wrapper: {
					marginBottom: 0,
				},
				label: {
					marginBottom: 4,
				},
			},
		}),
		Textarea: Textarea.extend({
			defaultProps: {
				radius: 6,
				mih: 30,
			},
			styles: {
				input: {
					minHeight: 30,
				},
				label: {
					marginBottom: 4,
				},
			},
		}),
		RangeSlider: RangeSlider.extend({
			defaultProps: {
				color: '#03a92182',
				size: 'sm',
			},
			styles: {
				label: {
					marginBottom: 4,
				},
			},
		}),
		Select: Select.extend({
			defaultProps: {
				radius: 6,
				height: 30,
			},
			styles: {
				input: {
					cursor: 'pointer',
					minHeight: 30,
					height: 30,
				},
				label: {
					marginBottom: 4,
				},
			},
		}),
		Checkbox: Checkbox.extend({
			defaultProps: {
				color: 'green',
			},
			styles: {
				input: {
					cursor: 'pointer',
				},
				error: {
					position: 'absolute',
					bottom: -10,
				},
				label: {
					marginBottom: 4,
				},
			},
		}),
		Drawer: Drawer.extend({
			styles: {
				header: {
					borderBottom: `1px solid black`,
				},
				content: {
					maxHeight: 'calc(100dvh - 60px)',
				},
			},
		}),
	},
	fontSizes: {
		// sm: '13px',
		// lg: '15px',
		// xl: '15px',
		// md: '15px',
		// xs: '15px',
	},
	breakpoints: {
		sm: '568px',
		md: '768px',
	},
});

const MantineConfig = ({ children }: { children: React.ReactNode }) => {
	return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export default MantineConfig;
