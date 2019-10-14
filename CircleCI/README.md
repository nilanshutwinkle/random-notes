# CircleCI

## Basics

* Config stored in `.circleci/config.yml`
* Deterministic builds are reproducible
  - **Version pinning**; e.g., `react@16.0.0` instead of `react@16.0`
  - Caching

## Jobs
* **Jobs** are collections of steps
* If only one job, should be named `build`. E.g.,:
```yaml
version: 2
jobs:
  build:
    docker:
      - image: circleci/ruby:2.4.1
    steps:
      - checkout
      - run: echo "A first hello"
```

* Multi-line commands:
```yaml
version: 2
jobs:
    build:
      # ...
      steps:
        # ...
        - run: |
          echo "foo"
          echo "bar"
```

* Working directory:

```yaml
version: 2
jobs:
  build:
    working_directory: ~/homebase
```

## Images

* E.g., `circleci/ruby:2.4.2-jessie-node`
* The **image tag** is `:<lang_ver>-<os_ver>-<image_variant>`
* Two types of images:
  - **language images**: e.g., Ruby, OpenJDK, Closure, Rust, etc
  - **service images**: e.g., DynamoDB, PostgreSQL, Redis, etc
* Two types of image variants:
  - **language image variants**: e.g., `-node`, `-browsers`, etc
  - **service image variants**: only one, `-ram`
* Comprehensive [list of image tags](https://circleci.com/docs/2.0/docker-image-tags.json) by image
* Using multiple images:

```yaml
version: 2
jobs:
  build:
    docker:
      - image: circleci/python:3.6.2-stretch-browsers
        environment:
          TEST_DATABASE_URL: postgresql://root@localhost/circle_test
      - image: circleci/postgres:9.6.5-alpine-ram
    steps:
      - checkout
      - run: sudo apt-get update
      - run: sudo apt-get install postgresql-client-9.6
      - run: |
        psql \
        -d $TEST_DATABASE_URL \
        -c "CREATE TABLE test (name char(25)));"
      - run: |
        psql \
        -d $TEST_DATABASE_URL \
        -c "INSERT INTO TABLE test VALUES ('John'), ('Joanna');"
      - run: |
        psql \
        -d $TEST_DATABASE_URL \
        -c "SELECT * FROM test;"
```

## Workflows

* To run two jobs in parallel:

```yaml
version: 2
jobs:
  one:
    docker:
      - image: circleci/ruby:2.4.1
    steps:
      # ...
  two:
    docker:
      - image: circleci/ruby:2.4.1
    steps:
      # ...
workflows:
  version: 2
  one_and_two:
    jobs:
      - one
      - two
```

* To run sequentially:

```yaml
version: 2
# ...
workflows:
  version: 2
  one_and_two:
    jobs:
      - one
      - two
        requires:
          - one
```

## Cache
* Whereas **workspaces** share files between jobs in a single workflow run, **caches** share files between jobs in subsequent workflow runs
* Cache via `save_cache`, `restore_cache`
* E.g., to store dependencies:

```yaml
version: 2
jobs:
  build:
    docker:
      - image: circleci/node:4.8.2
    steps:
      - checkout
      - restore_cache:
          key: npm-cache-{{ .Branch }}--{{ checksum "package.json" }}
      - run: npm install
      - save_cache:
          key: npm-cache-{{ .Branch }}--{{ checksum "package.json" }}
          paths:
            - node_modules
```
* If you want to delete cache at specific key, you must contact support. (Best to test before caching.)

## Contexts
* Secure way to store secrets
* These are encrypted
* Steps:
  1. In CircleCI website, go to Settings > Organization > Contexts
  2. Click "Add Environment Variable" and fill out (cannot edit once added)
  3. In `.circleci/config.yml`, simply dereference variable. E.g.,
```yaml
version: 2
jobs:
  ...
  deploy:
    ...
    steps:
      run: aws-cli deploy $AWS_CLI_KEY_SECRET
```

## Orbs

## Workspaces
* Workflow-aware storage mechanism
* `persist_to_workspace`, `attach_workspaces`
* Behind the scenes, tarbals the workspace upon persistence and stores on S3; and retrieves when attaching workspace

## Version 2.1
* `type: approval`

## Resources
* [Welcome to CircleCI Documentation](https://circleci.com/docs/2.0/): version 2.0
* [Webinar: Introduction to .circleci/config.yml](https://youtu.be/xOSHKNUIkjY): practical 42 minute overview
* [Pre-Built CircleCI Docker Images](https://circleci.com/docs/2.0/circleci-images/#buildpack-deps)
