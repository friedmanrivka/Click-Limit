//  import App from "./app";

// (async () => {
//    const app = new App();
//     await app.init();

//     // Only terminate when the process is interrupted
//     process.on('SIGINT', async () => {
//         await app.terminate();
//         process.exit(0);
//     });

//     process.on('SIGTERM', async () => {
//         await app.terminate();
//         process.exit(0);
//     });
// })();
import App from "./app";

(async () => {
    let app;
    try {
        app = new App();
        await app.init();
    } finally {
        await app?.terminate();
    }
})();