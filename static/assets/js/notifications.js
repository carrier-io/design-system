const popup = Notification({
    duration: 3000,
});

const showNotify = (type, title = '') => {
    switch (type) {
        case 'ERROR':
            popup.error({
                title: 'Message error',
            });
            break;
        case 'WARNING':
            popup.warning({
                title: 'Message warning',
            });
            break;
        case 'INFO':
            popup.info({
                title: 'Message info',
            });
            break;
        case 'SUCCESS':
            popup.success({
                title,
            });
            break;
        default:
            popup.basic({
                title: 'Message basic',
                iconUrl: "/design-system/static/assets/ico/success_purple_icon.svg"
            });
            break;
    }
}