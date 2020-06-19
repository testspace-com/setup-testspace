
![Testspace Action](https://github.com/testspacehq/setup-testspace/workflows/Testspace%20Action/badge.svg)

# Testspace client Setup JavaScript Action
A GitHub Action used to install and configure the Testspace client used for publishing test content to [Testspace.com](https://testspace.com). 

## Usage
Setting up the Testspace client:

```yaml
uses: testspace-com/setup-testspace@v1
with:
  subdomain: newco
  token: ${{ secrets.TESTSPACE_TOKEN }} # optional, only required for private repos
```

## Input
The Testspace client actions requires a `subdomain` and optionally a token for pushing content.

* [Testspace subdomain](https://help.testspace.com/docs/dashboard/admin-signup) is the *organizational* named used when signing up for an account.
* [Testspace token](https://help.testspace.com/docs/dashboard/admin-user#account) is required when using a `private` repo. 

## Example
The following hello world type of example:

```
name: hello
on:
  push:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: testspacehq/setup-testspace@v1
        with:
          subdomain: samples
      - name: Push test results
        run: testspace results.xml
        if: always()
```

## Contributing 
Contributions are encouraged following the [Contribution Guide](CONTRIBUTING.md).


## License
This code is released under the [MIT License](LICENSE). 


