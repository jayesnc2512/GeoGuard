const alerts = ((alertId) => {
    switch (alertId) {
        case 0: return "Camera BlackOut";
        case 1: return "camera Switch off";
        case 2: return "camera Displaced";
        case 3: return "large no. of people congregation";
        case 4: return "camera is Active again";
        default: return "Error";
    }
})

export default alerts;
