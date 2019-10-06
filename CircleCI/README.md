# CircleCI

## Basics

* Config stored in `.circleci/config.yml`
* **Jobs** are collections of steps
* Sample:
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

## Workflows

* Sample:

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

## Cache
* Cache via `save_cache`, `restore_cache`

## Orbs

## Workspaces
* Workflow-aware storage mechanism
* `persist_to_workspace`, `attach_workspaces`

## Version 2.1
* `type: approval`

## Resources
* [Welcome to CircleCI Documentation](https://circleci.com/docs/2.0/): version 2.0
* [Pre-Built CircleCI Docker Images](https://circleci.com/docs/2.0/circleci-images/#buildpack-deps)
