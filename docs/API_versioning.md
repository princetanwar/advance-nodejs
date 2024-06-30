## How to version a REST API?

There are several common strategies for versioning REST APIs, including:

1. **URL-Based Versioning:** This approach includes the API version in the request URL path, e.g., **`/api/v1/users`** or **`/api/v2/users`**.
2. **Query Parameter-Based Versioning:** The API version is passed as a query parameter in the request URL, e.g., **`/api/users?version=1.0`** or **`/api/users?version=2.0`**.
3. **Custom Header-Based Versioning:** A custom request header is used to indicate the API version, e.g., **`Accespt-Version: 1.0`** or **`Accespt-Version: 2.0`**.


```
//v1 router

const express = require("express");
const router = express.Router();

const userRoutes = require("../controllers/V1/user/routes");

router.use("/v1/user", userRoutes);

module.exports = router;

//v2 router

const express = require("express");
const router = express.Router();

const userRoutes = require("../controllers/V2/user/routes");

router.use("/v2/user", userRoutes);

module.exports = router;

```

While creating API make sure to create small reusable functions that can be used in v1 and v2 controllers to make code more reusable and less redundant
