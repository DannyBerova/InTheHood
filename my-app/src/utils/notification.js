function show(style) {
    return function(message) {
        window.M.toast({
            html: message,
            classes: `${style} lighten-1 white`,
            displayLength: 3000,
            border: 'solid 1 px'
        });
    }
}

const notify = {
    success: show('green lighten-2'),
    error: show('red'),
    info: show('light-blue'),
    warn: show('orange'),
}

export default { ...notify}