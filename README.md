### Docker Datacenter Sample
test

We will be deploying this sample application to [Docker Datacenter](https://www.docker.com/products/docker-datacenter) using [Shippable Pipelines](http://ship-docsv2.s3-website-us-west-2.amazonaws.com/pipelines_overview/).

There are two steps in this process.
- __Continous Integration__ -We will be testing our code with Shippable CI and once all the tests pass, we will build a docker image and push it to a docker registry.

- __Deployment__ - We will configure Shippable pipelines to automatically deploy to Docker Datacenter, whenever a newer version of image tag appears in the registry.

#### Requirements
- [Docker Datacenter](https://www.docker.com/products/docker-datacenter) - Universal Control Plane is mandatory, whereas you Docker Trusted Registry is optional. You can get an idea of how to install it from [here](https://docs.docker.com/ucp/evaluation-install/).
- [Shippable account](https://shippable.com/) - You need to have a [Github](https://github.com/) or [Bitbucket](https://bitbucket.org/) account for using Shippable.

#### Continuous Integration
Shippable uses a file called `shippable.yml`, where you can configure various things for this stage.

Our shippable.yml file looks like this
```yaml
language: node_js

version:
  - 0.12

build:
  ci:
    - npm install -g mocha
    - npm install
    - npm run unit-tests
    - npm start &
    - npm run api-tests

  post_ci:
    - docker build -t scriptnull/sample_node_ddc:$BRANCH.$BUILD_NUMBER .
    - docker push scriptnull/sample_node_ddc:$BRANCH.$BUILD_NUMBER

integrations:
  hub:
    - integrationName : "Docker prod"
      type : docker
```
- __ci__ - Issue commands to run the tests. In our case, we are first running the unit tests to make sure each component is working properly. After that, we start the Node.js server and test the API endpoints.
- __post_ci__ - We will build a docker image with the tag of pattern `<BRANCH>.<BUILD_NUMBER>` (Eg. `master.1`) and push to docker registry.
- __integrations__ - You will need to [create hub integration](http://docs.shippable.com/int_docker_registries/) in Shippable, to pull and push image to Docker registries.

#### Deployment
To learn more about Shippable pipelines, refer [here](http://docs.shippable.com/pipelines_overview/).

 This involves two steps.
 - __Environment Creation__ - Environment represent the Docker Datacenter cluster, to which your containers will be deployed. Hence we need to configure this first.

 - __Pipeline Creation__ - One pipeline may represent one or  more containers created from one or more docker images. Lets just try deploying one container with one image.
