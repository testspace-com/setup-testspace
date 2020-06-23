
![Testspace Action](https://github.com/testspace-com/setup-testspace/workflows/Testspace%20Action/badge.svg)

# Testspace client Setup JavaScript Action
A GitHub Action used to install and configure the Testspace client used for publishing test content to [Testspace.com](https://testspace.com). 

## Usage
Setting up the Testspace client:

```yaml
uses: testspace-com/setup-testspace@v1
with:
  domain: newco
  token: ${{ secrets.TESTSPACE_TOKEN }} # optional, only required for private repos
```

## Input
The Testspace client action requires a `domain` and optionally a token for pushing content.

* [Testspace domain](https://help.testspace.com/docs/dashboard/admin-signup) is the **organizational** name (*subdomain*) used when creating the account along with *.testspace.com*. The *.testspace.com* string is optional. 
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
      - uses: testspace-com/setup-testspace@v1
        with:
          domain: newco
      - name: Push test results
        run: |
          testspace results.xml
        if: always()
```

For more information on pushing Test content refer to the help [Overview on publishing](http://help.testspace.com/docs/publish/getting-started-overview). 

## Contributing 
Contributions are encouraged following the [Contribution Guide](CONTRIBUTING.md).


## License
This code is released under the [MIT License](LICENSE). 


