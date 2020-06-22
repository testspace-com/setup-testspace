const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const path = require('path');
const execSync = require('child_process').execSync;

async function run() {

    try {
          
        var domain = core.getInput('domain');
        if (!domain.includes('.')) {
            domain = domain+'.testspace.com';
        }

        var token = core.getInput('token');
        if (token && !token.includes(':'))
            token += ':';

        if (process.platform === 'win32') {
            const compressedFiles = await tc.downloadTool('https://testspace-client.s3.amazonaws.com/testspace-windows.zip');
            const tsFolder = await tc.extractZip(compressedFiles, path.join(process.env.LOCALAPPDATA, 'Programs', 'testspace'));
            core.addPath(tsFolder);
        } 
        else if (process.platform === 'linux' || process.platform === 'darwin') {
            const compressedFiles = await tc.downloadTool(`https://testspace-client.s3.amazonaws.com/testspace-${process.platform}.tgz`);
            const tsFolder = await tc.extractTar(compressedFiles, path.join(process.env.HOME, 'bin'));
            core.addPath(tsFolder);
        }
        else {
            throw new Error('Not supported platform.');
        }

        const version = execSync('testspace --version');
        console.log(version.toString());

        const stdout = execSync(`testspace config url ${token}@${domain}`);
        console.log(stdout.toString());

    } catch (error) {
        core.setFailed(`Testspace client setup failed: ${error.message}`);
    }
}

run();
