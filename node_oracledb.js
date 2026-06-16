SELECT
  user_id,
  COUNT(*)                                          AS event_count,
  RANK()     OVER (ORDER BY COUNT(*) DESC)          AS rnk,
  DENSE_RANK() OVER (ORDER BY COUNT(*) DESC)        AS dense_rnk,
  ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC)        AS row_num
FROM activity_events
WHERE created_at >= SYSDATE - 30          -- Oracle: last 30 days
GROUP BY user_id
ORDER BY event_count DESC;
Know the difference — they will ask:
FunctionTiesGapsRANK()Same rankLeaves gaps (1,1,3)DENSE_RANK()Same rankNo gaps (1,1,2)ROW_NUMBER()Unique alwaysNo gaps, arbitrary tiebreak
For "top N contributors" use DENSE_RANK — most natural for leaderboards.
Top-N with pagination (Oracle-style)
sql-- Oracle 12c+
SELECT user_id, event_count, rnk
FROM (
  SELECT user_id, COUNT(*) AS event_count,
         DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) AS rnk
  FROM activity_events
  WHERE workspace_id = :ws_id
  GROUP BY user_id
)
WHERE rnk <= 10;   -- top 10

-- Pre-12c Oracle (ROWNUM trick):
SELECT * FROM (
  SELECT user_id, COUNT(*) AS event_count
  FROM activity_events
  GROUP BY user_id
  ORDER BY event_count DESC
) WHERE ROWNUM <= 10;

Area 2: Oracle Schema Design
Likely schema they want you to design
sql-- Users
CREATE TABLE users (
  user_id    NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username   VARCHAR2(100) NOT NULL,
  email      VARCHAR2(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT SYSTIMESTAMP
);
