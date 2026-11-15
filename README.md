# status-board

JavaScript/Express application. Native setup `npm ci`; tests `npm test`.
Start `npm start`; PORT defaults to3201, all-interface listener.
Liveness `/health/live`; declared health/readiness `/live`.
POST /reports {id,status:up|degraded|down}; GET /reports?status=down; GET /reports/:id. Maximum100 reports; duplicate409, absent404.

Data is in memory or immutable source and does not survive process replacement.

Tests use in-process domain fixtures and ephemeral loopback HTTP. 
AI-assisted researcher-authored application; shared scaffolding is disclosed outside this app. No deployment configuration is supplied.
