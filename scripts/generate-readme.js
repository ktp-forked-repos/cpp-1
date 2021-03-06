#!/usr/bin/env node
'use strict';

/**
 * Usage: node generate-readme.js
 *
 * Author: Carlos Abraham Hernandez
 * https://abranhe.com (abraham@abranhe.com)
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

const getFiles = (src, callback) => {
  glob(src + '/**', callback);
};

const categories = [
  'artificial-intelligence',
  'backtracking',
  'bit-manipulation',
  'cellular-automaton',
  'computational-geometry',
  'cryptography',
  'data-structures',
  'divide-and-conquer',
  'dynamic-programming',
  'gaming-theory',
  'graphs',
  'greedy-algorithms',
  'math',
  'networking',
  'numerical-analysis',
  'online-challenges',
  'randomized-algorithms',
  'serches',
  'selections',
  'sorting',
  'strings',
  'no-category'
];

const readme = [
  `
<!-- Please do not edit this file | This file is authomatically generated by ~/scripts/formatter.js -->
<div align="center">
<br>
<br>
<br>
<br>
<img width="400" height="270" src="https://cdn.jsdelivr.net/npm/@programming-languages-logos/cpp@0.0.2/cpp.svg">
<br>
<br>
<br>
<br>
<br>
<br>
<img src="https://cdn.abranhe.com/projects/algorithms/algorithms.svg" width="400px">
<br>
<br>
<p>All ▲lgorithms implemented in C++</p>
<a href="https://allalgorithms.com"><img src="https://cdn.abranhe.com/projects/algorithms/badge.svg"></a>
<a href="https://github.com/abranhe/algorithms/blob/master/license"><img src="https://img.shields.io/github/license/abranhe/algorithms.svg" /></a>
<a href="https://cash.me/$abranhe"><img src="https://cdn.abranhe.com/badges/cash-me.svg"></a>
<a href="https://patreon.com/abranhe"><img src="https://cdn.abranhe.com/badges/patreon.svg" /></a>
<a href="https://paypal.me/abranhe/10"><img src="https://cdn.abranhe.com/badges/paypal.svg" /></a>
<a href="https://travis-ci.org/AllAlgorithms/cpp"><img src="https://img.shields.io/travis/AllAlgorithms/cpp.svg?label=%E2%96%B2%20style" /></a>
<br>
<br>
<a href="https://allalgorithms.com"><code>allalgorithms.com</code></a>
</div>

<!-- Please do not edit this file | This file is authomatically generated by ~/scripts/formatter.js -->

## Contents

You can find the All ▲lgorithms categories at [algorithms.com/categories](https://algorithms.com/categories)
`
];

categories.forEach((category) => {
  readme.push(` - [${category.charAt(0).toUpperCase() + category.slice(1).replace(/\-/g, ' ')}](#${category})`);
});

getFiles('../', (err, res) => {
  let printedCategories = [];

  if (err) {
    console.log('Error', err);
  } else {
    res.map((file) => {
      if (path.extname(file) !== '.cpp') {
        return;
      }
      let algorithmName = path.basename(file).replace('.cpp', '').replace('_', ' ');
      let currentCategory = path.parse(file).dir.split(path.sep)[1];

      if (!printedCategories.includes(currentCategory)) {
        printedCategories.push(currentCategory);
        readme.push(`\n## ${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1).replace(/\-/g, ' ')}\n`);
      }

      readme.push(
        ` - [${algorithmName.charAt(0).toUpperCase() + algorithmName.slice(1).replace(/\_/g, ' ')}](${file.replace(
          '../',
          ''
        )})`
      );
    });

    readme.push(`
<!-- Please do not edit this file | This file is authomatically generated by ~/scripts/formatter.js -->

## Maintainers

|[![1][1-avatar]][1]|[![2][2-avatar]][2]|
| :-: | :-: |
| [Carlos Abraham][1] | [Christian Bender][2] |

## License

This work is released under [MIT License][MIT]

[![MIT IMG][MIT-logo]][MIT]

To the extent possible under law, [Carlos Abraham](https://go.abranhe.com/github) has waived all copyright and related or neighboring rights to this work.

<div align="center">
	<a href="https://github.com/abranhe/algorithms">
		<img src="https://cdn.abranhe.com/projects/algorithms/logo.svg" width="50px">
	</a>
  <br>
</div>

[MIT]: https://github.com/abranhe/algorithms/blob/master/license
[MIT-logo]: https://cdn.abranhe.com/projects/algorithms/mit-license.png

<!-- Maintainers -->
[1]: https://github.com/abranhe
[1-avatar]: https://avatars3.githubusercontent.com/u/21347264?s=50
[2]: https://github.com/christianbender
[2-avatar]: https://avatars3.githubusercontent.com/u/23243382?s=50
`);

    fs.writeFile(`../readme.md`, readme.join('\n'), (err) => {
      if (err) throw err;
      console.log(chalk.green('The file was succesfully saved!'));
    });
  }
});