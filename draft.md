# System Design Master Template

A complete, reusable framework for any system design or cloud architecture question — interview or real-world. Walk it top to bottom; skip what doesn't apply.

---

## Part 0 — The 45-Minute Clock (how to spend the time)

| Phase | Time | What you're doing |
|---|---|---|
| 1. Requirements | 5 min | Functional + non-functional, scope the problem |
| 2. Estimation | 5 min | QPS, storage, bandwidth — justify scale |
| 3. API + Data model | 5–7 min | Contracts and schema |
| 4. High-level design | 10 min | Boxes and arrows, happy path |
| 5. Deep dives | 10–15 min | 2–3 components the interviewer cares about |
| 6. Wrap-up | 3–5 min | Bottlenecks, tradeoffs, what you'd do next |

**Golden rule:** drive the conversation, but check in. "I'm going to assume X — does that match what you're looking for?"

---

## Part 1 — Requirements Clarification

Never start drawing until you've nailed these down. Say them out loud and write them on the board.

### Functional requirements (what the system does)
- What are the core use cases? (List 3–5, then ask which to prioritize.)
- Who are the actors/clients? (web, mobile, internal services, third parties)
- What's explicitly **out of scope**? (Naming this earns points and saves time.)

### Non-functional requirements (how well it does it)
- **Scale:** DAU/MAU, read:write ratio, peak vs. average traffic.
- **Latency:** p50/p99 targets. Is this user-facing (ms) or batch (minutes)?
- **Availability:** 99.9% (8.7h/yr down) vs. 99.99% (52 min/yr)?
- **Consistency:** strong, eventual, or read-your-writes? (This drives DB choice.)
- **Durability:** can we ever lose data? (Payments: no. Analytics: maybe.)
- **Security/compliance:** PII, PCI-DSS, GDPR, encryption at rest/in transit.

### Clarifying-question bank
> "What's the read-to-write ratio?" · "Do we need real-time or is eventual OK?" · "Single region or global?" · "What's the data retention requirement?" · "Are we optimizing for read latency or write throughput?"

---

## Part 2 — Capacity Estimation (back-of-envelope)

### Numbers every engineer should memorize

| Operation | Latency |
|---|---|
| L1 cache reference | ~1 ns |
| Main memory reference | ~100 ns |
| SSD random read | ~100 µs |
| Read 1 MB sequentially from memory | ~10 µs |
| Read 1 MB from SSD | ~1 ms |
| Round trip within same datacenter | ~500 µs |
| Disk seek (HDD) | ~10 ms |
| Round trip CA ↔ Netherlands | ~150 ms |

### Useful conversions
- 1 day ≈ **86,400 s** (round to 10⁵ for quick math).
- 1 million writes/day ≈ **~12 writes/sec**.
- "X per day to per second": divide by ~100,000.

### The estimation recipe
1. **QPS:** `DAU × actions-per-user-per-day ÷ 86,400`. Then `peak = average × 2–3`.
2. **Storage:** `writes/day × bytes/write × retention-days × replication-factor`.
3. **Bandwidth:** `QPS × payload-size` (in and out separately).
4. **Memory for cache:** apply the 80/20 rule — cache the 20% of data serving 80% of traffic.

> State assumptions explicitly. The interviewer cares about your method, not the exact digit.

---

## Part 3 — API Design

Define the contract before the internals. Prefer REST for CRUD/public APIs, gRPC for low-latency internal service-to-service, GraphQL when clients need flexible field selection.

```
POST   /v1/orders            → create        (idempotency-key header!)
GET    /v1/orders/{id}       → read
GET    /v1/orders?cursor=…   → list (cursor pagination, not offset)
PATCH  /v1/orders/{id}       → partial update
DELETE /v1/orders/{id}       → delete
```

**Checklist:** versioning (`/v1/`), pagination (cursor > offset at scale), idempotency keys for writes/payments, auth (OAuth2/JWT), rate-limit headers, consistent error envelope, request IDs for tracing.

---

## Part 4 — Data Model

### SQL vs. NoSQL — pick by access pattern, not hype

| Choose SQL when… | Choose NoSQL when… |
|---|---|
| Complex queries, joins, transactions | Massive scale, simple lookups by key |
| Strong consistency / ACID needed | Flexible/evolving schema |
| Relationships matter (orders↔users) | Write-heavy, horizontal scale first |

### NoSQL families
- **Key-value** (Redis, DynamoDB): caching, sessions, simple lookups.
- **Document** (MongoDB, Firestore): semi-structured, nested objects.
- **Wide-column** (Cassandra, Bigtable): time-series, huge write volume.
- **Graph** (Neo4j): relationship-heavy traversals (social, fraud rings).

### Always discuss
- **Indexing:** which columns, composite indexes, the read-vs-write tradeoff.
- **Partitioning/sharding key:** how to avoid hot partitions.
- **Normalization vs. denormalization:** denormalize for read-heavy systems.

---

## Part 5 — High-Level Architecture Building Blocks

```
Client → DNS → CDN → Load Balancer → API Gateway
                                          │
                    ┌─────────────────────┼─────────────────────┐
                 Service A             Service B             Service C
                    │                     │                     │
                  Cache                Message Queue          Cache
                    │                     │                     │
                 Primary DB ──replica──► Read Replicas      Object Store
```

### Component cheat sheet

**Load balancer** — L4 (TCP, fast) vs. L7 (HTTP-aware, routing/SSL termination). Algorithms: round-robin, least-connections, consistent hashing. Health checks + failover.

**CDN** — cache static assets and cacheable API responses at the edge. Push vs. pull. TTL + cache invalidation strategy.

**API Gateway** — auth, rate limiting, request routing, aggregation, protocol translation. Single entry point.

**Caching** — strategies: **cache-aside** (lazy, most common), write-through, write-back, write-around. Eviction: LRU/LFU/TTL. Beware: thundering herd, cache stampede (use locks/jitter), stale data, the cache-invalidation problem.

**Message queue / event bus** — decouple producers from consumers, absorb spikes, enable async. Kafka (log, replay, high throughput) vs. SQS/RabbitMQ (task queue). Discuss: at-least-once vs. exactly-once, ordering guarantees, dead-letter queues, consumer lag.

**Object storage** — S3/GCS for blobs, images, backups, data lake. Cheap, durable, not for low-latency random access.

**Search** — Elasticsearch/OpenSearch for full-text and faceted search. Keep it in sync via CDC or event stream.

---

## Part 6 — Deep-Dive Topics (where Staff-level points are won)

### CAP & PACELC
In a **P**artition you choose **C**onsistency or **A**vailability; **E**lse (normal operation) you trade **L**atency vs. **C**onsistency. State which corner your system sits in and why.

### Consistency models
Strong → linearizable → sequential → causal → eventual. Read-your-writes and monotonic-reads are practical middle grounds. Match the model to the use case (bank balance = strong; like-count = eventual).

### Replication
- **Single-leader:** simple, strong on primary; replica lag for reads.
- **Multi-leader:** multi-region writes, conflict resolution needed.
- **Leaderless** (Dynamo-style): quorum reads/writes, `W + R > N` for consistency.

### Partitioning / sharding
- **By key range:** good for range scans, risks hot spots.
- **By hash:** even distribution, kills range queries.
- **Consistent hashing:** minimizes reshuffling when nodes change.
- Watch for **hot keys / celebrity problem** — mitigate with sub-sharding or caching.

### Consensus
Raft/Paxos for leader election, config, distributed locks. Don't reimplement — use etcd/ZooKeeper/Consul.

### Idempotency & exactly-once
True exactly-once delivery doesn't exist over networks. Achieve **effectively-once** via idempotency keys + dedup tables + idempotent consumers.

### Distributed transactions
- **2PC:** strong but blocking, poor availability.
- **Saga pattern:** sequence of local txns + compensating actions. Preferred in microservices.
- **Outbox pattern:** atomic DB write + event publish via CDC.

### Rate limiting
Token bucket (allows bursts), leaky bucket (smooths), fixed/sliding window. Where: gateway, per-user, per-IP. Store counters in Redis.

---

## Part 7 — Scaling Patterns

1. **Vertical** (bigger box) first — simplest, has a ceiling.
2. **Horizontal** (more boxes) — needs statelessness; push state to cache/DB.
3. **Read scaling:** read replicas + caching layers.
4. **Write scaling:** sharding, write-back caches, batching, async via queues.
5. **Database:** indexing → replication → sharding → consider purpose-built stores.
6. **Stateless services** behind a load balancer; sticky sessions only when forced.
7. **Async everything** that isn't on the critical user path.
8. **Backpressure & load shedding** to protect the system under overload.

---

## Part 8 — Reliability, Availability & Observability

### Resilience patterns
- **Redundancy** + no single point of failure (multi-AZ, multi-region).
- **Circuit breakers** to stop cascading failures.
- **Retries with exponential backoff + jitter** (never tight-loop retry).
- **Timeouts** on every network call.
- **Bulkheads** to isolate failure domains.
- **Graceful degradation** (serve stale cache rather than error).

### Observability — the three pillars
- **Metrics:** RED (Rate, Errors, Duration) for services; USE (Utilization, Saturation, Errors) for resources.
- **Logging:** structured, correlation/request IDs across services.
- **Tracing:** distributed traces (OpenTelemetry/Jaeger) to follow a request end-to-end.

Add: health checks, SLIs/SLOs/error budgets, alerting, dashboards, runbooks.

### Disaster recovery
Define **RPO** (data-loss tolerance) and **RTO** (downtime tolerance). Backups, replication, failover drills, multi-region active-active vs. active-passive.

---

## Part 9 — Cloud Service Mapping (GCP / AWS / Azure)

| Capability | GCP | AWS | Azure |
|---|---|---|---|
| Compute (VMs) | Compute Engine | EC2 | VMs |
| Containers/K8s | GKE | EKS | AKS |
| Serverless functions | Cloud Functions | Lambda | Functions |
| Serverless containers | Cloud Run | Fargate / App Runner | Container Apps |
| Object storage | Cloud Storage (GCS) | S3 | Blob Storage |
| Relational DB | Cloud SQL / AlloyDB | RDS / Aurora | SQL Database |
| Global/NewSQL | Spanner | Aurora / DynamoDB Global | Cosmos DB |
| Wide-column NoSQL | Bigtable | DynamoDB / Keyspaces | Cosmos DB (Cassandra API) |
| Document NoSQL | Firestore | DynamoDB | Cosmos DB |
| In-memory cache | Memorystore | ElastiCache | Cache for Redis |
| Pub/Sub messaging | Pub/Sub | SNS+SQS / EventBridge | Service Bus / Event Grid |
| Streaming/log | Pub/Sub + Dataflow | Kinesis / MSK | Event Hubs |
| Data warehouse | BigQuery | Redshift | Synapse |
| CDN | Cloud CDN | CloudFront | Front Door / CDN |
| Load balancer | Cloud Load Balancing | ELB/ALB/NLB | Load Balancer / App Gateway |
| API gateway | API Gateway / Apigee | API Gateway | API Management |
| Secrets | Secret Manager | Secrets Manager | Key Vault |
| IAM | Cloud IAM | IAM | Entra ID / RBAC |
| Observability | Cloud Monitoring/Logging | CloudWatch / X-Ray | Monitor / App Insights |

---

## Part 10 — Question-Type Playbook

Map the prompt to a pattern; each has a known skeleton.

- **URL shortener / paste bin** → hashing, key generation, read-heavy caching, redirect.
- **News feed (Twitter/Instagram)** → fan-out on write vs. read, celebrity problem, ranking.
- **Chat (WhatsApp/Slack)** → WebSockets, presence, message ordering, delivery receipts.
- **Rate limiter** → token bucket in Redis, distributed counters.
- **Notification system** → pub/sub, fan-out, channel adapters, retries, dedup.
- **Ride-sharing / proximity** → geospatial index (geohash/QuadTree), matching, real-time location.
- **Video streaming (YouTube/Netflix)** → upload pipeline, transcoding, CDN, adaptive bitrate.
- **Payment system** → idempotency, ledger (double-entry), strong consistency, saga, audit trail, reconciliation.
- **Distributed cache / KV store** → consistent hashing, replication, quorum.
- **Search/typeahead** → trie/inverted index, prefix sharding, ranking.
- **Web crawler** → frontier queue, politeness, dedup, distributed workers.
- **Metrics/monitoring system** → time-series DB, downsampling, retention tiers.

---

## Part 11 — Tradeoffs Cheat Sheet (say these out loud)

| Decision | You gain | You give up |
|---|---|---|
| SQL | consistency, joins | horizontal scale, flexibility |
| NoSQL | scale, flexibility | joins, multi-row ACID |
| Strong consistency | correctness | latency, availability |
| Eventual consistency | availability, speed | temporary staleness |
| Caching | latency, DB load | staleness, invalidation complexity |
| Denormalization | read speed | write amplification, storage |
| Sync calls | simplicity | coupling, latency, failure cascade |
| Async / queues | decoupling, resilience | complexity, eventual delivery, ordering |
| Monolith | simplicity, fast dev | scaling and deploy granularity |
| Microservices | independent scale/deploy | ops complexity, distributed-systems pain |
| More replicas | read scale, HA | write cost, replication lag |

---

## Part 12 — Wrap-Up Script

End every design with:
1. **Recap** the design in 3 sentences.
2. **Bottlenecks:** "The biggest risk is X; I'd mitigate with Y."
3. **What I'd monitor:** key SLIs and alerts.
4. **What I deferred:** "Given more time, I'd dig into Z."

> Staff-level signal = explicit tradeoffs, knowing where the system breaks, and connecting design choices back to the requirements you set at the start.

---

### One-line mental checklist
**Requirements → Estimate → API → Schema → Draw → Deep-dive → Scale → Fail gracefully → Observe → Tradeoffs.**
