const { notarize } = require('electron-notarize');

module.exports = async function notarizing(notarizeOption) {
    const { appBundleId, appPath, appleId, appleIdPassword, teamId } = notarizeOption;
    const { NOTARIZE } = process.env;

    // noinspection EqualityComparisonWithCoercionJS
    if (NOTARIZE == 'false') {
        console.log('  • NOTARIZE flag is false. will be skipped this process');
        return;
    }

    if (!appleId || !appleIdPassword || !teamId) {
        console.log('  • APPLE_ID or APPLE_PASSWORD or TEAM_ID not found. will be skipped this process');
        return;
    }

    console.log('  • Apple Notarizing...');
    console.log(`  • appBundleId: ${appBundleId}
    appPath: ${appPath}
    appleId: ${appleId}`,
    );
    return await notarize({
        tool: 'notarytool',
        appBundleId,
        appPath,
        appleId,
        teamId,
        appleIdPassword,
    });
};
