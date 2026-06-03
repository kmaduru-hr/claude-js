These are the four back-of-envelope numbers you compute to justify the scale of your design. Let me walk each one with a worked example so the arithmetic is concrete. I'll use a hypothetical "100M DAU social app where each user does 10 writes/day and 100 reads/day."
QPS — DAU × actions-per-user-per-day ÷ 86,400
QPS = queries (requests) per second. You can't reason about a system in "per day" terms because servers handle load per second, so you convert.

86,400 is just the number of seconds in a day (60 × 60 × 24).
You divide the daily total by it to get the average rate.

Writes: 100M users × 10 writes ÷ 86,400 ≈ 1B ÷ 86,400 ≈ 11,500 writes/sec.
Reads: 100M × 100 ÷ 86,400 ≈ 10B ÷ 86,400 ≈ 115,000 reads/sec.
That read:write ratio (~10:1) is itself a design signal — it tells you to invest in caching and read replicas.
peak = average × 2–3
Traffic is never evenly spread across 24 hours. People pile on at lunch, evenings, after a push notification. The average hides those spikes, but your servers must survive the peak or they fall over. So you multiply by a fudge factor (commonly 2–3×, higher for spiky workloads like ticketing or flash sales).
Peak writes ≈ 11,500 × 3 ≈ 34,500 writes/sec. You provision for this number, not the average.
Storage — writes/day × bytes/write × retention-days × replication-factor
How much disk you need over time. Each term:

writes/day — new records created daily (100M × 10 = 1B writes/day).
bytes/write — size of one record. Say each is 1 KB.
retention-days — how long you keep it. Say 5 years ≈ 1,825 days.
replication-factor — you store every record on multiple nodes for durability/availability (typically 3).

1B × 1KB × 1,825 × 3 ≈ 5.5 PB.
Reads don't appear here — reading doesn't consume storage. Only writes add data. Retention and replication are the multipliers people forget, and they dominate the total.
Bandwidth — QPS × payload-size
Network throughput, measured in bytes/sec. You compute ingress and egress separately because they're usually wildly different and may hit different limits.

Ingress (in): write QPS × write payload. 11,500 writes/sec × 1KB ≈ 11.5 MB/sec.
Egress (out): read QPS × response payload. 115,000 reads/sec × 1KB ≈ 115 MB/sec.

Egress is 10× ingress here — same reason the read:write ratio matters. This is what tells you whether a CDN earns its place (offload that egress to the edge) and helps size load balancers and inter-service links.
Memory for cache — the 80/20 rule
You can't (and shouldn't) cache everything in RAM — it's expensive. The Pareto principle says roughly 80% of your traffic hits about 20% of your data (the hot, popular records). So you only cache that hot 20% and serve the long tail from the database.
Rough sizing: take a day's worth of read data and cache ~20% of it.
Daily read volume ≈ 115,000 reads/sec × 86,400 × 1KB ≈ 10 TB/day. Cache 20% → ~2 TB of RAM (then spread across a Redis/Memorystore cluster).
The payoff: that 2 TB absorbs ~80% of your 115K read QPS, so the database only sees ~23K reads/sec instead of 115K — often the single biggest lever for read-heavy systems.

The meta-point for an interview: state every assumption out loud ("I'll assume 100M DAU, 10 writes each, 1KB per record..."). The interviewer is grading whether you know which numbers matter and why, not whether you land on the exact petabyte. Want me to run the same four calculations against one of your real systems — say VPNS or the pixeljs signal ingestion path — so you have a worked example grounded in numbers you already know?

DAU = Daily Active Users — the count of unique users who interact with your system in a single day.DAU = Daily Active Users — the count of unique users who interact with your system in a single day. ("Unique" matters: if one person opens the app five times, they count once.)
It's the headline scale number you anchor every estimate on, which is why it leads the QPS formula. Its siblings:

MAU = Monthly Active Users — unique users over a 30-day window. Always ≥ DAU.
The DAU/MAU ratio measures stickiness — what fraction of your monthly users show up daily. ~50% is excellent (people use it most days); ~10% is occasional usage.

In an interview you usually either get DAU directly or derive it: if you're told "500M MAU" you might assume a DAU/MAU of ~0.2 and work with ~100M DAU. Just state the assumption out loud.
