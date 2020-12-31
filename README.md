
![Testspace Action](https://github.com/testspace-com/setup-testspace/workflows/Testspace%20Action/badge.svg)

# Testspace client Setup JavaScript Action
A GitHub Action used to install and configure the Testspace client used for publishing test content to [Testspace.com](https://testspace.com). 

## Usage
Setting up the Testspace client:

```yaml
uses: testspace-com/setup-testspace@v2
with:
  domain: ${{ github.repository_owner }}  # Testspace subdomain defaults to GitHub org
  token: ${{ secrets.TESTSPACE_TOKEN }} # optional, only required for private repos
```

## Input
The Testspace client action requires a `domain` and optionally a token for pushing content.

* [Testspace domain](https://help.testspace.com/docs/dashboard/admin-signup) is the **organizational** name (*subdomain*) used when creating the account along with *.testspace.com*. The *.testspace.com* string is optional. 
* [Testspace token](https://help.testspace.com/docs/dashboard/admin-user#account) is required when using a `private` repo. 

## Example
The following hello world type of example:

```
name: CI
on:
  push:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 50
      - uses: testspace-com/setup-testspace@v2
        with:
          domain: ${{github.repository_owner}}
      - name: Publish Results to Testspace
        run: |
          testspace results.xml
        if: always()
```

When using a **Matrix** it is recommended to use a `folder` to store the results specific to each matric entry.

```
name: CI
on:
  push:
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    steps:
      ..
      - name: Publish Results to Testspace
        run: |
          testspace [ ${{ matrix.os }} ]results.xml   
```


For more information on Publishing test results refer to the help [Overview on publishing](http://help.testspace.com/docs/publish/overview). 

## Contributing 
Contributions are encouraged following the [Contribution Guide](CONTRIBUTING.md).


## License
This code is released under the [MIT License](LICENSE). 


