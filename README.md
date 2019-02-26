# @clysema/meteor

[![npm (scoped)](https://img.shields.io/npm/v/@clysema/meteor.svg)](https://www.npmjs.com/package/@clysema/meteor)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@clysema/meteor.svg)](https://www.npmjs.com/package/@clysema/meteor)

A simpleDDP package wrapper.

## Install

```
$ npm install @clysema/meteor
```

## Usage

This package is intended to use with the generic-controller app.

Create a config file `config/meteor.json`:

```json
{
  "server": "localhost",
  "port": 3000,
  "creds": {
    "email": "username@example.com",
    "password": "MY_PASSWORD"
  }  
}
```
