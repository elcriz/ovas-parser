# OVAS Import file parse checker

Scans an OVAS XML file for errors. This script might be helpful when running OVAS import batches.

The validation api can be found in `./validation.js`.

## How to use?

First, start the script:

```
$ npm start
```

Then, enter the XML file path. For example:

```
prompt: file:  /Users/MyUserName/Downloads/1855_2021-2022.xml
```

The script will then check the XML in a very basic way. If any errors are found, it will tell you which student (by its student number) has the error.
