const commonOptions = {
	'--toastBackground': 'var(--vscode-layer2)',
	'--toastColor': 'var(--vscode-text)',
	'--toastBorderRadius': '6px',
	'--toastBoxShadow': '0 0 16px 0 rgba(0, 0, 0, 0.2)',
	'--toastPadding': '0 0.5rem'
};

const ToastTheme = {
	success: {
		...commonOptions,
		'--toastBarBackground': 'var(--success)'
	},
	neutral: {
		...commonOptions,
		'--toastBarBackground': 'var(--neutral)'
	},
	error: {
		...commonOptions,
		'--toastBarBackground': 'var(--error)'
	}
};
export default ToastTheme;
