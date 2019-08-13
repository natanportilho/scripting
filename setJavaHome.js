
/* Simple script to set JAVA_HOME - This will replace the JAVA_HOME in the .zshrc file. 

To run type: node setJavaHome.js 12 (to set java 12)
*/
function setJavaHome() {
    var javaVersion = process.argv[2];
    var versions = createPossibleVersions();
    if (versions[javaVersion] === undefined) {
        console.log('\x1b[33m%s\x1b[0m', 'Java version ' + javaVersion + ' does not exist.');
        return;
    }

    var fs = require('fs')
    fs.readFile('/Users/i857789/.zshrc', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        var result = data.replace('jdk1.8.0_162.jdk', versions[javaVersion]);
        result = result.replace('jdk-11.0.2.jdk', versions[javaVersion]);
        result = result.replace('jdk-12.0.1.jdk', versions[javaVersion]);

        fs.writeFile('/Users/i857789/.zshrc', result, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            else {
                console.log('\nJAVA_HOME set to ' + versions[javaVersion]);
                console.log('\x1b[36m%s\x1b[0m', 'YOU STILL HAVE TO RESTART THE DAMN TERMINAL\n');
            }
        });
    });
}

function createPossibleVersions() {
    var versions = {}
    versions[8] = 'jdk1.8.0_162.jdk';
    versions[11] = 'jdk-11.0.2.jdk';
    versions[12] = 'jdk-12.0.1.jdk';
    return versions;
}

setJavaHome();