## Micro-Services

Micro-Services a relatively a new format for create for sophisticated softwares
that can evolve fast.

In micro-services we create a individual application component as a service that can be development, deploy and scale independently. below are some example for some good candidates for micro-services in a ecom website.

- payment service
- cart service
- user-profile service
- product-service

micro services allow us to use any tech stack for any service. like the payment service can we written in java and cart service in node.js and product service in rust.

Note - it's recommended that each service should have it's own DB if needed. one service should not use other service DB directly.

when setup the micro services we have to setup a communication channel for services that they will use to communicate with each other. the communication channel we can setup are below

- http/https - (synchronous communication)
- message-broker - (asynchronous communication) rabbitMQ
- service mesh - istio

Note - MicroServices are not a magic bullet that fixes all application design
and development problem

#### Pros of micro services

- independent development
- independent deployment
- independent Dynamic scaling
- easy to choose services specific tech stack.
- easy to maintenance
- Improved fault tolerance

#### Cons of micro services

- Increased costs
- Testing and debugging challenges
- Complex integration overhead and dependency hell
- Decreased performance
- The need for automated deployments
