# Brittany action

This is a GitHub Action that checks to make sure that Haskell files are
properly formatted with [Brittany][].

[Brittany]: https://hackage.haskell.org/package/brittany

## Example

``` yaml
on: push
jobs:
  brittany:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: tfausak/brittany-action@v1
```

## Options

- `config`: Optional. Defaults to `brittany.yaml`. The Brittany config file to
  use. If this file does not exist, no error will be thrown.

- `pattern`: Optional. Defaults to `**/*.hs`. The Haskell files to check. If no
  files are found, the action will succeed.

- `version`: Optional. Defaults to `0.14.0.0`. The version of Brittany to use.
  Supports these versions: <https://github.com/tfausak/brittany/releases>.
