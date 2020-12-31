
![Testspace Action](https://github.com/testspace-com/setup-testspace/workflows/Testspace%20Action/badge.svg)

# Testspace client Setup Action
A GitHub Action is used to install and configure the Testspace client used for publishing test content to [Testspace.com](https://testspace.com). 

## Usage
Setting up the Testspace client:

```yaml
uses: testspace-com/setup-testspace@v1
with:
  domain: ${{ github.repository_owner }}  # Testspace subdomain defaults to GitHub org
  token: ${{ secrets.TESTSPACE_TOKEN }} # optional, only required for private repos
```

Once the client is setup for a job [results](https://help.testspace.com/docs/publish/push-data-results#file-content) can be published to the Testspace server:

```
$ testspace results.xml
```

## Input
The Testspace client action requires a `domain` and optionally a token for pushing content.

* [Testspace domain](https://help.testspace.com/docs/dashboard/admin-signup) is the **organizational** name (*subdomain*) used when creating the account along with *.testspace.com*. The *.testspace.com* string is optional. 
* [Testspace access token](https://help.testspace.com/docs/dashboard/admin-user#account) is required when using a `private` repo. 

## Examples
A few usage examples:

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
      - uses: testspace-com/setup-testspace@v1
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

When using the [source directory](https://help.testspace.com/docs/publish/push-data-results#source) to organize your results in corresponding `folders`.

```
$ testspace results.xml{path/to/test-source}
```

For more information on Publishing test results refer to the help [Overview on publishing](http://help.testspace.com/docs/publish/overview). 

## Contributing 
Contributions are encouraged following the [Contribution Guide](CONTRIBUTING.md).


## License
This code is released under the [MIT License](LICENSE). 


