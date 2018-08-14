# YAML Key Viewer for Visual Studio Code

[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/github/release/CYBAI/vscode-yaml-key-viewer.svg?style=flat-square)](https://github.com/CYBAI/vscode-yaml-key-viewer/releases)
[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/installs-short/cybai.yaml-key-viewer.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=cybai.yaml-key-viewer)
[![Travis](https://img.shields.io/travis/CYBAI/vscode-yaml-key-viewer.svg?style=flat-square)](https://travis-ci.org/CYBAI/vscode-yaml-key-viewer)
[![David](https://img.shields.io/david/dev/CYBAI/vscode-yaml-key-viewer.svg?style=flat-square)](https://david-dm.org/CYBAI/vscode-yaml-key-viewer?type=dev)

## Usage

You can use this extension to get the full path of the key where your cursor is on.

Use `Cmd-Shift-P` (Mac) or `Ctrl-Shift-P` (Windows/Linux).

There are two commands:
- `YAML: Get full key`: See the full key
- `YAML: Copy full key to clipboard`: Copy the full key to clipboard

Example:

Use `YAML: Get full key` like below

![command](https://raw.githubusercontent.com/CYBAI/vscode-yaml-key-viewer/master/screenshots/command.png)

Then, it will show the full path the key where your cursor is on.

![result](https://raw.githubusercontent.com/CYBAI/vscode-yaml-key-viewer/master/screenshots/result.png)

## Installation

1. Install *Visual Studio Code*
2. Launch *Code*
3. From the command palette `Ctrl-Shift-P` (Windows, Linux) or `Cmd-Shift-P` (OSX)
4. Select `Install Extension`
5. Choose the extension `YAML key viewer`
6. Reload *Visual Studio Code*

### Additional installation steps Linux
Xclip is required.

Install `xclip` on Debian/Ubuntu: ```sudo apt-get install xclip```

Install `xclip` on CentOS/RHEL/Fedora: ```sudo yum install xclip``` (You must have epel/3rd part repositories enabled)


## License
[MIT](LICENSE.md)

