# OVAS Import file parse checker

Scans an OVAS XML file for errors. This script is by no means perfect, but it might be helpful when running OVAS import batches.

The validation api can be found in `./validation.js`.

## How to use?

First, install the script:

```
$ npm install
```

Then, start the script (and do so again for each XML file):

```
$ npm start
```

Lastly, enter the XML file path. For example:

```
prompt: file:  /Users/MyUserName/Downloads/1855_2021-2022.xml
```

The script will then check the XML in a very basic way. If any errors are found, it will tell you which student (by its student number) has the error.
