# Brittany action

This is a [GitHub Action][] that checks to make sure that Haskell files are
properly formatted with [Brittany][].

[GitHub Action]: https://github.com/features/actions
[Brittany]: https://hackage.haskell.org/package/brittany

## Example

``` yaml
name: Brittany
on: push
jobs:
  brittany:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: tfausak/brittany-action@v1
```
