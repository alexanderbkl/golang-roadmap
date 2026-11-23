'use strict';

/* ============================================================
   Data
   ============================================================ */

const PHASES = [
  {
    id: 'p1',
    no: '01',
    nav: 'Arrays & hashing',
    title: 'Arrays, strings & hashing',
    weeks: 'Weeks 1–2',
    goal: 'Build the reflex that answers half of every screening round: one pass, the right map, no wasted allocation.',
    how: 'Two focused days. Write each solution twice — once with a map, once with a fixed array where the domain allows — then say the space tradeoff out loud.',
    signal: 'You can name the cost of every map you create, and you reach for [26]int before map[byte]int when the alphabet is lowercase ASCII.',
    problems: [
      [1, 'Two Sum', 'E', 'Hash map', 'Map value to index; check the complement before inserting. Say the O(n) space cost out loud.'],
      [217, 'Contains Duplicate', 'E', 'Hash set', 'map[int]struct{} as a set; know why it is smaller than map[int]bool.'],
      [242, 'Valid Anagram', 'E', 'Counting', 'A fixed [26]int beats a map for lowercase ASCII; mention rune safety.'],
      [125, 'Valid Palindrome', 'E', 'Two pointers', 'Skip non-alphanumerics with unicode helpers; s[i] is a byte, not a rune.'],
      [121, 'Best Time to Buy and Sell Stock', 'E', 'Greedy', 'Track min-so-far and best profit in one pass, O(1) space.'],
      [53, 'Maximum Subarray', 'M', 'DP 1D', "Kadane's invariant: best ending here versus best overall."],
      [136, 'Single Number', 'E', 'Bit manipulation', 'XOR everything; equal values cancel regardless of order.'],
      [283, 'Move Zeroes', 'E', 'In-place', 'Write-index compaction; preserve order without allocating.'],
      [704, 'Binary Search', 'E', 'Binary search', 'Half-open [lo,hi) bounds; write the invariant as a comment.'],
      [70, 'Climbing Stairs', 'E', 'DP 1D', 'Bottom-up Fibonacci with two variables; explain the redundant recursion.'],
      [28, 'Find the Index of the First Occurrence in a String', 'E', 'Strings', 'strings.Index is the Go answer; defend its worst case honestly.'],
      [392, 'Is Subsequence', 'E', 'Two pointers', 'Greedy pointer walk; follow-up: precompute a next-occurrence table.'],
      [49, 'Group Anagrams', 'M', 'Hash map', 'Signature key design: sorted bytes versus a 26-count array. Say which is faster.'],
      [347, 'Top K Frequent Elements', 'M', 'Heap', 'Min-heap of size k versus bucket sort; pick one and justify it.'],
      [238, 'Product of Array Except Self', 'M', 'Prefix sums', 'Prefix and suffix products; division breaks when zeros appear.'],
      [128, 'Longest Consecutive Sequence', 'M', 'Hash set', 'Only start a run when n-1 is absent, so the inner scan stays O(n).'],
      [48, 'Rotate Image', 'M', 'Matrix', 'Transpose then reverse rows; in-place index arithmetic.'],
      [54, 'Spiral Matrix', 'M', 'Matrix', 'Four shrinking bounds; handle the final single row or column.'],
      [73, 'Set Matrix Zeroes', 'M', 'Matrix', 'First row and column as zero flags; explain the marker for row 0.'],
      [41, 'First Missing Positive', 'H', 'In-place', 'Index-as-hash: place value v at v-1, then scan. O(n) time, O(1) space.']
    ]
  },
  {
    id: 'p2',
    no: '02',
    nav: 'Pointers & windows',
    title: 'Pointers, windows & stacks',
    weeks: 'Weeks 2–3',
    goal: 'Turn O(n²) scans into linear windows and pointer walks. Highest-leverage phase for timed rounds.',
    how: 'Do these in pairs: brute force first, then the optimized version in the same file. Keep both and a benchmark — train the ability to see the improvement, not just the final code.',
    signal: 'You can prove why a pointer move is safe, and you never hand-wave a sliding window invariant.',
    problems: [
      [20, 'Valid Parentheses', 'E', 'Stack', 'Map each opening bracket to its closer; the stack makes the last-opened rule explicit.'],
      [167, 'Two Sum II - Input Array Is Sorted', 'M', 'Two pointers', 'Sorted input: move the pointer that can still improve the sum.'],
      [11, 'Container With Most Water', 'M', 'Two pointers', 'Move the shorter wall; prove that no better pair is being skipped.'],
      [15, '3Sum', 'M', 'Two pointers', 'Sort, fix one, two-pointer the rest; dedupe at all three levels.'],
      [42, 'Trapping Rain Water', 'H', 'Two pointers', 'Prefix-max arrays first, then the two-pointer O(1)-space version.'],
      [3, 'Longest Substring Without Repeating Characters', 'M', 'Sliding window', 'lastSeen jumps left forward, never backward; byte indexing is fine here.'],
      [424, 'Longest Repeating Character Replacement', 'M', 'Sliding window', 'Window is valid while len - maxFreq <= k; explain why maxFreq may go stale.'],
      [567, 'Permutation in String', 'M', 'Sliding window', 'Fixed window with a 26-count diff; compare counts, not substrings.'],
      [76, 'Minimum Window Substring', 'H', 'Sliding window', 'need/have counters; expand, shrink while valid, record the best window.'],
      [239, 'Sliding Window Maximum', 'H', 'Sliding window', 'Monotonic deque of indices; amortized O(n), never a heap.'],
      [155, 'Min Stack', 'M', 'Stack', 'Auxiliary min stack; O(1) push, pop, top and getMin.'],
      [150, 'Evaluate Reverse Polish Notation', 'M', 'Stack', '[]int stack; Go integer division truncates toward zero.'],
      [22, 'Generate Parentheses', 'M', 'Backtracking', 'Backtrack on open/close counts; prune instead of validating.'],
      [739, 'Daily Temperatures', 'M', 'Monotonic stack', 'Stack of indices still waiting for a warmer day.'],
      [853, 'Car Fleet', 'M', 'Stack', 'Sort by position; a car joins the fleet ahead if it arrives no later.'],
      [84, 'Largest Rectangle in Histogram', 'H', 'Monotonic stack', 'Index stack with sentinel zeros; the hard sibling of 739.'],
      [5, 'Longest Palindromic Substring', 'M', 'Two pointers', 'Expand around 2n-1 centers; rune-safe comparison in Go.']
    ]
  },
  {
    id: 'p3',
    no: '03',
    nav: 'Linked lists',
    title: 'Linked lists & recursion',
    weeks: 'Week 3',
    goal: 'Get pointer surgery into your fingers. Linked lists are where senior candidates lose credibility with off-by-one errors.',
    how: 'Draw the nodes before coding. Implement each rewiring iteratively, then recursively, and test nil, one-node and two-node lists. Table tests only — no "looks right".',
    signal: 'You reach for a dummy head without thinking, and you can explain exactly which pointer changes order.',
    problems: [
      [206, 'Reverse Linked List', 'E', 'Linked list', 'Iterative prev/curr/next and recursive; state the O(n) stack cost of the latter.'],
      [21, 'Merge Two Sorted Lists', 'E', 'Linked list', 'Dummy head idiom; know the pointer-to-pointer alternative.'],
      [141, 'Linked List Cycle', 'E', 'Fast & slow', "Floyd's tortoise and hare; explain why they must meet."],
      [143, 'Reorder List', 'M', 'Linked list', 'Find the middle, reverse the second half, merge alternately: three clean subroutines.'],
      [19, 'Remove Nth Node From End of List', 'M', 'Linked list', 'Gap of n between two pointers; a dummy node removes the head case.'],
      [138, 'Copy List with Random Pointer', 'M', 'Linked list', 'Map old to new in pass one, wire next and random in pass two.'],
      [2, 'Add Two Numbers', 'M', 'Linked list', 'Digit carry; do not forget the final carry node.'],
      [287, 'Find the Duplicate Number', 'M', 'Fast & slow', 'Floyd on the index graph; O(1) space is the entire point.'],
      [25, 'Reverse Nodes in k-Group', 'H', 'Linked list', 'Count k nodes, reverse the block, reconnect; guard the tail.'],
      [23, 'Merge k Sorted Lists', 'H', 'Heap', 'Min-heap of heads versus divide and conquer; compare complexity honestly.'],
      [92, 'Reverse Linked List II', 'M', 'Linked list', 'Dummy node plus four pointers; reverse only between left and right.']
    ]
  },
  {
    id: 'p4',
    no: '04',
    nav: 'Trees & heaps',
    title: 'Trees, BST, heaps & intervals',
    weeks: 'Weeks 4–5',
    goal: 'Recursion with explicit invariants, plus the heap and interval patterns that appear in almost every product-company loop.',
    how: 'Write the recursive contract in one sentence before any tree code. Implement container/heap from scratch once — the interface is fair game in Go rounds.',
    signal: 'You distinguish a valid BST from a locally ordered tree, and you choose BFS or DFS with a stated reason.',
    problems: [
      [94, 'Binary Tree Inorder Traversal', 'E', 'Binary tree', 'Recursive and iterative with an explicit stack; Morris is the bonus.'],
      [104, 'Maximum Depth of Binary Tree', 'E', 'Binary tree', '1 + max(left, right); one line, clear base case.'],
      [226, 'Invert Binary Tree', 'E', 'Binary tree', 'Swap children recursively; test nil and single-node trees.'],
      [543, 'Diameter of Binary Tree', 'E', 'Binary tree', 'Return height, update diameter in a closure; do not return the diameter.'],
      [110, 'Balanced Binary Tree', 'E', 'Binary tree', 'Height with a -1 early-exit sentinel; O(n), not O(n²).'],
      [100, 'Same Tree', 'E', 'Binary tree', 'Structural recursion; nil == nil is true.'],
      [235, 'Lowest Common Ancestor of a Binary Search Tree', 'M', 'BST', 'Use the BST ordering; iterate down instead of running a full-tree LCA.'],
      [102, 'Binary Tree Level Order Traversal', 'M', 'BFS', 'Queue with a level-size loop; slices as queues without shifting.'],
      [199, 'Binary Tree Right Side View', 'M', 'BFS', 'BFS last node per level, or DFS carrying depth.'],
      [98, 'Validate Binary Search Tree', 'M', 'BST', 'Bounds recursion, not parent comparison; use nil or int64 bounds.'],
      [230, 'Kth Smallest Element in a BST', 'M', 'BST', 'Inorder counter; follow-up: augmentation for frequent kth queries.'],
      [105, 'Construct Binary Tree from Preorder and Inorder Traversal', 'M', 'Binary tree', 'Map value to inorder index; recurse with boundary indices.'],
      [124, 'Binary Tree Maximum Path Sum', 'H', 'Binary tree', 'Gain = node + max(0, left) + max(0, right); clamp negatives.'],
      [297, 'Serialize and Deserialize Binary Tree', 'H', 'Binary tree', 'Design the format first: delimiter plus nil marker. Defend it.'],
      [703, 'Kth Largest Element in a Stream', 'E', 'Heap', 'Min-heap capped at k; the root is the answer.'],
      [215, 'Kth Largest Element in an Array', 'M', 'Heap', 'Quickselect average O(n) versus heap O(n log k); know both.'],
      [973, 'K Closest Points to Origin', 'M', 'Heap', 'Max-heap of size k on squared distance; skip math.Sqrt.'],
      [56, 'Merge Intervals', 'M', 'Intervals', 'Sort by start; merge while the next start overlaps the current end.'],
      [57, 'Insert Interval', 'M', 'Intervals', 'Three phases: before, overlap merge, after. No full re-sort.'],
      [435, 'Non-overlapping Intervals', 'M', 'Intervals', 'Greedy by earliest end; count removals, not kept intervals.']
    ]
  },
  {
    id: 'p5',
    no: '05',
    nav: 'Graphs',
    title: 'Graphs & union-find',
    weeks: 'Week 6',
    goal: 'Model the grid or graph, pick the traversal, and know when the answer is union-find rather than BFS.',
    how: 'One traversal family per day: flood fill, multi-source BFS, topological sort, Dijkstra, union-find. Reuse one skeleton file and swap only the core.',
    signal: 'You state the vertices and edges before coding, and you know why Dijkstra fails with negative weights.',
    problems: [
      [200, 'Number of Islands', 'M', 'DFS', 'Flood fill DFS, mutate the grid; mention recursion depth risk.'],
      [133, 'Clone Graph', 'M', 'BFS', 'old-to-new map built on first visit; BFS or DFS.'],
      [695, 'Max Area of Island', 'M', 'DFS', 'Same skeleton as 200; return area instead of count.'],
      [417, 'Pacific Atlantic Water Flow', 'M', 'DFS', 'Reverse the flow from both oceans; intersect the reachable sets.'],
      [130, 'Surrounded Regions', 'M', 'DFS', 'Border DFS first, then flip surrounded regions; watch recursion limits.'],
      [994, 'Rotting Oranges', 'M', 'BFS', 'Multi-source BFS; minutes equal BFS levels.'],
      [207, 'Course Schedule', 'M', 'Topological sort', 'Cycle detection via DFS colours or Kahn indegree counts.'],
      [210, 'Course Schedule II', 'M', 'Topological sort', "Kahn's algorithm; if the order is short, a cycle exists."],
      [547, 'Number of Provinces', 'M', 'Union-find', 'Union-find or DFS over an adjacency matrix; count distinct roots.'],
      [684, 'Redundant Connection', 'M', 'Union-find', 'The first edge whose endpoints already share a root.'],
      [127, 'Word Ladder', 'H', 'BFS', 'BFS over an implicit graph; wildcard buckets beat pairwise comparison.'],
      [743, 'Network Delay Time', 'M', 'Shortest path', 'Dijkstra with container/heap; skip stale heap entries.'],
      [787, 'Cheapest Flights Within K Stops', 'M', 'Shortest path', 'Bellman-Ford with k+1 relaxations; explain why greedy Dijkstra fails.'],
      [1584, 'Min Cost to Connect All Points', 'M', 'MST', 'Prim with a heap, or Kruskal with union-find; compare edge cases.']
    ]
  },
  {
    id: 'p6',
    no: '06',
    nav: 'DP & greedy',
    title: 'Dynamic programming & greedy',
    weeks: 'Weeks 7–8',
    goal: 'Define the state, write the recurrence, then compress the space. DP is pattern recognition plus discipline, not inspiration.',
    how: 'Always write brute-force recursion, then memoize, then tabulate, then compress. Four versions of the same problem is the actual exercise.',
    signal: 'You can name the state and transition in one sentence, and you know which dimension you can drop.',
    problems: [
      [198, 'House Robber', 'M', 'DP 1D', 'Two-variable DP: rob = max(skip, prev + take).'],
      [213, 'House Robber II', 'M', 'DP 1D', 'Run 198 twice: exclude the first house, then the last.'],
      [322, 'Coin Change', 'M', 'DP 1D', 'Unbounded knapsack; amount as state, unreachable = amount + 1.'],
      [300, 'Longest Increasing Subsequence', 'M', 'DP 1D', 'O(n²) DP, then patience sorting with sort.SearchInts for O(n log n).'],
      [139, 'Word Break', 'M', 'DP 1D', 'Prefix DP with a word set; be honest about the O(n²·m) bound.'],
      [152, 'Maximum Product Subarray', 'M', 'DP 1D', 'Track min and max; a negative value can flip the sign.'],
      [416, 'Partition Equal Subset Sum', 'M', 'DP 1D', '0/1 knapsack on sum/2; a bitset is a valid optimization.'],
      [91, 'Decode Ways', 'M', 'DP 1D', "One- and two-digit transitions; the character '0' rules the base cases."],
      [309, 'Best Time to Buy and Sell Stock with Cooldown', 'M', 'DP 1D', 'Three states — hold, sold, rest — and their transitions.'],
      [72, 'Edit Distance', 'H', 'DP 2D', '2D DP; map insert, delete and replace to the three neighbours.'],
      [1143, 'Longest Common Subsequence', 'M', 'DP 2D', '2D LCS; optimize to two rows and explain what you drop.'],
      [10, 'Regular Expression Matching', 'H', 'DP 2D', "Recursion plus memo on (i,j); '*' consumes zero or more."],
      [312, 'Burst Balloons', 'H', 'DP interval', 'Interval DP on the last balloon burst; pad both ends with 1.'],
      [55, 'Jump Game', 'M', 'Greedy', 'Greedy farthest reach; fail when the index passes it.'],
      [45, 'Jump Game II', 'M', 'Greedy', 'BFS-like greedy: count jumps at each reach boundary.'],
      [134, 'Gas Station', 'M', 'Greedy', 'Total gas decides feasibility; start after the lowest prefix.'],
      [763, 'Partition Labels', 'M', 'Greedy', 'Last-occurrence map; close the partition at the running max.']
    ]
  },
  {
    id: 'p7',
    no: '07',
    nav: 'Design',
    title: 'Design & advanced structures',
    weeks: 'Weeks 8–9',
    goal: 'Design data structures under O(1) constraints. The closest LeetCode gets to the actual senior design round.',
    how: 'Implement each in its own Go package with tests and a benchmark. For LRU and LFU, write the invariants as comments before the code and re-derive them from scratch on D+3.',
    signal: 'You define invariants first, handle zero and one capacity, and can extend the design when the interviewer adds a requirement.',
    problems: [
      [146, 'LRU Cache', 'M', 'Design', 'Map plus doubly linked list; O(1) get and put with sentinels.'],
      [460, 'LFU Cache', 'H', 'Design', 'Frequency buckets plus minFreq; the follow-up that separates candidates.'],
      [208, 'Implement Trie (Prefix Tree)', 'M', 'Trie', 'Trie node with map[byte]*node; Insert, Search, StartsWith.'],
      [211, 'Design Add and Search Words Data Structure', 'M', 'Trie', "Trie plus DFS for '.'; bound the branching."],
      [355, 'Design Twitter', 'M', 'Design', 'Per-user tweet lists plus a heap merge; global timestamp ordering.'],
      [380, 'Insert Delete GetRandom O(1)', 'M', 'Design', 'Slice plus index map; swap-delete keeps every operation O(1).'],
      [981, 'Time Based Key-Value Store', 'M', 'Design', 'Map key to sorted times and values; sort.Search for the floor.'],
      [295, 'Find Median from Data Stream', 'H', 'Heap', 'Two heaps with a balance invariant; handle even and odd counts.'],
      [4, 'Median of Two Sorted Arrays', 'H', 'Binary search', 'Binary search the partition; the invariant is the whole problem.'],
      [432, "All O'one Data Structure", 'H', 'Design', 'Bucket linked list plus per-bucket key sets; senior-level pointer work.'],
      [232, 'Implement Queue using Stacks', 'E', 'Queue', 'Two stacks; explain the amortized O(1).'],
      [706, 'Design HashMap', 'E', 'Design', "Buckets plus chaining; shows you understand Go's map runtime."],
      [641, 'Design Circular Deque', 'M', 'Design', 'Ring buffer: head, tail, size, capacity; never shift the slice.'],
      [622, 'Design Circular Queue', 'M', 'Design', 'Same ring buffer, simpler contract; test full and empty.'],
      [707, 'Design Linked List', 'M', 'Linked list', 'Sentinel nodes; index walk versus reverse walk.']
    ]
  }
];

const LABS = [
  {
    title: 'Bounded worker pool',
    time: '2–3 h',
    build: 'N workers, a fixed-capacity job channel, and graceful shutdown on context cancel. Prove there are no leaked goroutines.',
    graded: ['Accepts jobs without blocking the caller', 'Drains in-flight work on SIGTERM', 'Race-clean under go test -race', 'Returns the first error and stops cleanly']
  },
  {
    title: 'Fan-out / fan-in pipeline',
    time: '2 h',
    build: 'Three stages: generate, square, collect. Cancel upstream from any stage and still drain downstream without a send on a closed channel.',
    graded: ['Every stage closes its out-channel', 'Context propagated through each stage', 'No deadlock when the consumer exits early', 'Errgroup wiring']
  },
  {
    title: 'Token-bucket limiter',
    time: '2 h',
    build: 'Implement Allow(now) with burst and refill rate. Write a mutex version and a channel-based version. Test both with a fake clock.',
    graded: ['Burst correctness', 'No ticker goroutine leak', 'Concurrent safety', 'Mutex versus channel tradeoff articulated']
  },
  {
    title: 'Sharded map & counters',
    time: '2–3 h',
    build: 'Compare sync.Mutex, sync.RWMutex, atomic.Int64, and N sharded counters under go test -bench with -cpu=1,4,8.',
    graded: ['Benchmark numbers you can explain', 'False sharing awareness', 'Shard hash quality', 'When atomics stop scaling']
  },
  {
    title: 'Generics LRU',
    time: '3 h',
    build: 'LRU[K comparable, V any] with a mutex, sentinel list nodes and O(1) operations. Race-test concurrent readers and writers.',
    graded: ['Capacity 0 and 1 edge cases', 'Eviction order', 'No map/list desync', 'API ergonomics for callers']
  },
  {
    title: 'Bounded parallel Map with retry',
    time: '3 h',
    build: 'Map(ctx, items, fn, limit) with exponential backoff and jitter, first-error cancellation, and a per-item deadline.',
    graded: ['No unbounded goroutines', 'Context checked before each retry', 'errors.Is / errors.As preserved', 'Idempotency note in the README']
  },
  {
    title: 'singleflight + TTL cache',
    time: '2–3 h',
    build: 'Suppress duplicate loads, cache with TTL, and survive a thundering herd when a popular key expires.',
    graded: ['One load per key in flight', 'Stale-while-revalidate if you add it', 'Panic propagation is safe', 'Lock scope is minimal']
  },
  {
    title: 'Production HTTP service',
    time: '3–4 h',
    build: 'Router with request IDs, slog structured logs, recovery middleware, timeouts, /healthz, /debug/pprof, and graceful shutdown.',
    graded: ['Server ReadHeaderTimeout set', 'A panic never kills the process', 'Shutdown drains connections', 'Table-driven handler tests']
  },
  {
    title: 'Channel semantics drill',
    time: '1–2 h',
    build: 'Answer ten questions on nil, buffered and unbuffered channels, close, select and the memory model. Then prove each answer with a small program.',
    graded: ['Nil channel blocks forever', 'Close twice panics', 'Range over a closed channel is fine', 'Happens-before with WaitGroup']
  },
  {
    title: 'pprof lab',
    time: '3 h',
    build: 'Write a service with a deliberate CPU hotspot, heap growth and a mutex bottleneck. Capture all four profiles, then fix each.',
    graded: ['Reading top -cum', 'alloc_space versus inuse_space', 'Block and mutex profiles are opt-in', 'trace for scheduling questions']
  }
];

const STORE_KEY = 'go-senior-roadmap.v2';
const DIFF_LABEL = { E: 'Easy', M: 'Medium', H: 'Hard' };
const DIFF_RANK = { E: 0, M: 1, H: 2 };
const CIRC = 2 * Math.PI * 44;

// Each phase ramps easy -> hard; the stable sort keeps the curated order
// within a difficulty band.
PHASES.forEach(phase => {
  phase.problems.sort((a, b) => DIFF_RANK[a[2]] - DIFF_RANK[b[2]]);
});

const PATTERN_GROUPS = [
  ['Foundations', ['Hash map', 'Hash set', 'Counting', 'Two pointers', 'Prefix sums', 'Binary search', 'Bit manipulation', 'Strings', 'Greedy']],
  ['Arrays & windows', ['In-place', 'Sliding window', 'Stack', 'Monotonic stack', 'Matrix', 'Intervals', 'Heap']],
  ['Linked lists & trees', ['Linked list', 'Fast & slow', 'Binary tree', 'BST', 'BFS', 'DFS']],
  ['Graphs', ['Topological sort', 'Union-find', 'Shortest path', 'MST']],
  ['DP & backtracking', ['DP 1D', 'DP 2D', 'DP interval', 'Backtracking']],
  ['Design', ['Design', 'Trie', 'Queue']]
];

/* ============================================================
   State + helpers
   ============================================================ */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const ALL_PROBLEMS = PHASES.flatMap(ph => ph.problems.map(p => ({ key: `lc-${p[0]}`, phase: ph.id })));

let done = loadProgress();
const state = { q: '', diff: 'all', pattern: 'all', hideDone: false };
let toastTimer = null;
let emptyEl = null;

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[\u2019']/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.done && typeof parsed.done === 'object') {
      return parsed.done;
    }
  } catch (error) {
    /* Storage can be unavailable on file:// in some browsers. */
  }
  return {};
}

function saveProgress() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ v: 2, done }));
  } catch (error) {
    toast('Progress could not be saved in this browser.');
  }
}

function toast(message) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 4200);
}

/* ============================================================
   Rendering
   ============================================================ */

function renderRailNav() {
  $('#railPhases').innerHTML = PHASES.map(ph => `
    <li>
      <a href="#phase-${ph.no}">
        <span class="rn">${ph.no}</span>
        <span class="rt">${esc(ph.nav)}</span>
        <span class="rc" data-rail-count="${ph.id}">0/${ph.problems.length}</span>
      </a>
    </li>`).join('');
}

function renderProblem(p) {
  const [id, title, diff, pattern, focus] = p;
  const key = `lc-${id}`;
  return `
    <div class="prob" data-key="${key}" data-diff="${diff}" data-pattern="${esc(pattern)}" data-title="${esc(title)}" data-search="${esc(`${id} ${title} ${pattern}`.toLowerCase())}">
      <label class="prob-check">
        <input type="checkbox" data-key="${key}" aria-label="Mark ${esc(title)} as solved">
        <span class="box" aria-hidden="true"></span>
      </label>
      <span class="pid">${id}</span>
      <span class="ptitle">${esc(title)}</span>
      <span class="pill p-${diff.toLowerCase()}">${DIFF_LABEL[diff]}</span>
      <span class="ptag">${esc(pattern)}</span>
      <span class="pfocus">${esc(focus)}</span>
      <a class="plink" href="https://leetcode.com/problems/${slugify(title)}/" target="_blank" rel="noopener" aria-label="Open ${esc(title)} on LeetCode">↗</a>
    </div>`;
}

function renderPhase(ph) {
  return `
    <article class="phase" id="phase-${ph.no}" data-phase="${ph.id}">
      <header class="phase-head">
        <div class="phase-no">
          <span>Phase</span>
          <strong>${ph.no}</strong>
          <em>${esc(ph.weeks)}</em>
        </div>
        <div class="phase-copy">
          <h3>${esc(ph.title)}</h3>
          <p class="phase-goal">${esc(ph.goal)}</p>
          <div class="phase-meta">
            <p><strong>Study it</strong>${esc(ph.how)}</p>
            <p class="phase-signal"><strong>Senior signal</strong>${esc(ph.signal)}</p>
          </div>
        </div>
        <div class="phase-meter">
          <p class="count"><b data-phase-done="${ph.id}">0</b> / <span data-phase-total="${ph.id}">${ph.problems.length}</span> solved</p>
          <div class="bar"><i data-phase-bar="${ph.id}" style="--w:0%"></i></div>
          <span class="pct" data-phase-pct="${ph.id}">0%</span>
        </div>
      </header>
      <div class="probs">
        <div class="prob-head" aria-hidden="true">
          <span>Done</span><span>ID</span><span>Problem</span><span>Level</span><span>Pattern</span><span>What to nail</span><span></span>
        </div>
        ${ph.problems.map(renderProblem).join('')}
      </div>
    </article>`;
}

function renderPhases() {
  $('#phases').innerHTML = PHASES.map(renderPhase).join('');
}

function renderLabs() {
  $('#labGrid').innerHTML = LABS.map((lab, i) => {
    const key = `lab-${i + 1}`;
    return `
      <article class="lab" data-key="${key}" data-title="${esc(lab.title)}">
        <label class="prob-check lab-done">
          <input type="checkbox" data-key="${key}" aria-label="Mark the ${esc(lab.title)} lab as shipped">
          <span class="box" aria-hidden="true"></span>
        </label>
        <div class="lab-top">
          <span class="lab-no">Lab ${String(i + 1).padStart(2, '0')} · ${esc(lab.time)}</span>
        </div>
        <h3 class="lab-h">${esc(lab.title)}</h3>
        <p>${esc(lab.build)}</p>
        <div class="lab-graded">
          <span>What gets graded</span>
          <ul>${lab.graded.map(item => `<li>${esc(item)}</li>`).join('')}</ul>
        </div>
      </article>`;
  }).join('');
}

function renderPatternSelect() {
  const used = new Set(PHASES.flatMap(ph => ph.problems.map(p => p[3])));
  const rendered = new Set();
  let html = '<option value="all">All patterns</option>';

  PATTERN_GROUPS.forEach(([label, patterns]) => {
    const available = patterns.filter(p => used.has(p));
    if (!available.length) return;
    html += `<optgroup label="${esc(label)}">`;
    available.forEach(pattern => {
      rendered.add(pattern);
      html += `<option value="${esc(pattern)}">${esc(pattern)}</option>`;
    });
    html += '</optgroup>';
  });

  const leftovers = Array.from(used).filter(p => !rendered.has(p)).sort();
  if (leftovers.length) {
    html += '<optgroup label="Other">';
    leftovers.forEach(pattern => {
      html += `<option value="${esc(pattern)}">${esc(pattern)}</option>`;
    });
    html += '</optgroup>';
  }

  $('#patternSelect').innerHTML = html;
}

/* ============================================================
   Progress
   ============================================================ */

function updateAll() {
  const total = ALL_PROBLEMS.length;
  const solved = ALL_PROBLEMS.filter(p => done[p.key]).length;
  const pct = total ? (solved / total) * 100 : 0;
  const pctRounded = Math.round(pct);

  setText('#ringPct', `${pctRounded}%`);
  setText('#statPct', `${pctRounded}%`);
  setText('#statSolved', solved);
  setText('#statTotal', total);
  setText('#railSolved', solved);
  setText('#railTotal', total);
  setText('#heroProblemCount', total);
  $$('[data-total-problems]').forEach(el => { el.textContent = total; });

  const ring = $('#ringFill');
  if (ring) ring.style.strokeDashoffset = String(CIRC * (1 - pct / 100));
  const heroBar = $('#heroBar');
  if (heroBar) heroBar.style.setProperty('--w', `${pct}%`);

  ['E', 'M', 'H'].forEach(diff => {
    const all = ALL_PROBLEMS.filter(p => {
      const phase = PHASES.find(ph => ph.id === p.phase);
      const tuple = phase.problems.find(t => `lc-${t[0]}` === p.key);
      return tuple[2] === diff;
    });
    const solvedDiff = all.filter(p => done[p.key]).length;
    setText(`[data-diff-total="${diff}"]`, all.length);
    setText(`[data-diff-solved="${diff}"]`, solvedDiff);
  });
  setText('#statHard', ALL_PROBLEMS.filter(p => {
    const phase = PHASES.find(ph => ph.id === p.phase);
    const tuple = phase.problems.find(t => `lc-${t[0]}` === p.key);
    return tuple[2] === 'H' && done[p.key];
  }).length);
  setText('#statHardTotal', $$('.pill.p-h').length);

  setText('[data-diff-count="all"]', total);
  ['E', 'M', 'H'].forEach(diff => setText(`[data-diff-count="${diff}"]`, $$(`.pill.p-${diff.toLowerCase()}`).length));

  PHASES.forEach(ph => {
    const phaseTotal = ph.problems.length;
    const phaseSolved = ph.problems.filter(p => done[`lc-${p[0]}`]).length;
    const phasePct = phaseTotal ? Math.round((phaseSolved / phaseTotal) * 100) : 0;
    setText(`[data-phase-done="${ph.id}"]`, phaseSolved);
    setText(`[data-phase-total="${ph.id}"]`, phaseTotal);
    setText(`[data-phase-pct="${ph.id}"]`, `${phasePct}%`);
    setText(`[data-rail-count="${ph.id}"]`, `${phaseSolved}/${phaseTotal}`);
    $$(`[data-phase-bar="${ph.id}"]`).forEach(el => el.style.setProperty('--w', `${phasePct}%`));
  });

  const labTotal = LABS.length;
  const labDone = LABS.filter((lab, i) => done[`lab-${i + 1}`]).length;
  const labPct = labTotal ? (labDone / labTotal) * 100 : 0;
  setText('#labDoneCount', labDone);
  setText('#labTotalCount', labTotal);
  setText('#railLabs', labDone);
  setText('#railLabsTotal', labTotal);
  setText('#statLabs', labDone);
  setText('#statLabsTotal', labTotal);
  setText('[data-total-labs]', labTotal);
  const labBar = $('#labBar');
  if (labBar) labBar.style.setProperty('--w', `${labPct}%`);

  $$('.prob').forEach(row => {
    const isDone = Boolean(done[row.dataset.key]);
    row.classList.toggle('is-done', isDone);
    const input = $('input[type="checkbox"]', row);
    if (input) input.checked = isDone;
  });

  $$('.lab').forEach(lab => {
    const isDone = Boolean(done[lab.dataset.key]);
    lab.classList.toggle('is-done', isDone);
    const input = $('input[type="checkbox"]', lab);
    if (input) input.checked = isDone;
  });

  applyFilters();
}

function setText(selector, value) {
  $$(selector).forEach(el => { el.textContent = value; });
}

/* ============================================================
   Filtering
   ============================================================ */

function applyFilters() {
  const query = state.q.trim().toLowerCase();
  const rows = $$('.prob');

  rows.forEach(row => {
    const matchesQuery = !query || row.dataset.search.includes(query);
    const matchesDiff = state.diff === 'all' || row.dataset.diff === state.diff;
    const matchesPattern = state.pattern === 'all' || row.dataset.pattern === state.pattern;
    const matchesDone = !state.hideDone || !row.classList.contains('is-done');
    row.hidden = !(matchesQuery && matchesDiff && matchesPattern && matchesDone);
  });

  let visible = 0;
  $$('.phase').forEach(phase => {
    const phaseRows = Array.from(phase.querySelectorAll('.prob'));
    const shown = phaseRows.filter(row => !row.hidden).length;
    phase.classList.toggle('filtered-empty', shown === 0);
    visible += shown;
  });

  const total = ALL_PROBLEMS.length;
  const solvedVisible = rows.filter(row => !row.hidden && done[row.dataset.key]).length;
  const filtering = Boolean(query) || state.diff !== 'all' || state.pattern !== 'all' || state.hideDone;
  const label = filtering
    ? `${visible} of ${total} shown · ${solvedVisible} solved`
    : `Showing all ${total} problems · ${ALL_PROBLEMS.filter(p => done[p.key]).length} solved`;
  setText('#visibleCount', label);

  const empty = ensureEmptyState();
  empty.hidden = visible !== 0;
}

function ensureEmptyState() {
  if (emptyEl) return emptyEl;
  emptyEl = document.createElement('div');
  emptyEl.id = 'emptyState';
  emptyEl.className = 'empty-state';
  emptyEl.innerHTML = '<p>No problems match those filters. Loosen one — or clear them all.</p><button class="btn" type="button" id="clearFilters">Clear filters</button>';
  $('#phases').insertAdjacentElement('afterend', emptyEl);
  $('#clearFilters').addEventListener('click', clearFilters);
  return emptyEl;
}

function clearFilters() {
  state.q = '';
  state.diff = 'all';
  state.pattern = 'all';
  state.hideDone = false;
  $('#search').value = '';
  $('#patternSelect').value = 'all';
  $('#hideDone').checked = false;
  $$('[data-diff]').forEach(chip => chip.classList.toggle('is-active', chip.dataset.diff === 'all'));
  applyFilters();
}

/* ============================================================
   Interactions
   ============================================================ */

function handleToggle(input) {
  const key = input.dataset.key;
  if (!key) return;

  if (input.checked) done[key] = Date.now();
  else delete done[key];

  saveProgress();
  updateAll();

  const item = input.closest('.prob, .lab');
  const title = item ? item.dataset.title : 'item';
  const isLab = item && item.classList.contains('lab');

  if (input.checked) {
    toast(isLab ? `Lab shipped: ${title}.` : `Solved: ${title}. Re-solve it in 3 days.`);
  } else {
    toast(`Unchecked: ${title}.`);
  }
}

function bindEvents() {
  ['#phases', '#labGrid'].forEach(selector => {
    $(selector).addEventListener('change', event => {
      if (event.target.matches('input[type="checkbox"][data-key]')) {
        handleToggle(event.target);
      }
    });
  });

  $('#search').addEventListener('input', event => {
    state.q = event.target.value;
    applyFilters();
  });

  $$('[data-diff]').forEach(chip => {
    chip.addEventListener('click', () => {
      state.diff = chip.dataset.diff;
      $$('[data-diff]').forEach(other => other.classList.toggle('is-active', other === chip));
      applyFilters();
    });
  });

  $('#patternSelect').addEventListener('change', event => {
    state.pattern = event.target.value;
    applyFilters();
  });

  $('#hideDone').addEventListener('change', event => {
    state.hideDone = event.target.checked;
    applyFilters();
  });

  $('#resetBtn').addEventListener('click', () => {
    if (!Object.keys(done).length) {
      toast('Nothing to reset yet.');
      return;
    }
    if (window.confirm('Clear all solved problems and lab checkmarks?')) {
      done = {};
      saveProgress();
      updateAll();
      toast('Progress cleared.');
    }
  });

  $('#drillBtn').addEventListener('click', pickDrill);

  document.addEventListener('keydown', event => {
    const tag = document.activeElement ? document.activeElement.tagName : '';
    if (event.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) {
      event.preventDefault();
      $('#search').focus();
    }
    if (event.key === 'Escape' && document.activeElement === $('#search')) {
      $('#search').value = '';
      state.q = '';
      applyFilters();
      $('#search').blur();
    }
  });
}

function pickDrill() {
  const phasesWithWork = PHASES
    .map(ph => ({ ph, open: ph.problems.filter(p => !done[`lc-${p[0]}`]) }))
    .filter(entry => entry.open.length);

  if (!phasesWithWork.length) {
    toast('Every problem is checked. Re-solve the oldest hard one cold instead.');
    return;
  }

  const { ph, open } = phasesWithWork[0];
  const problem = open[Math.floor(Math.random() * open.length)];
  const key = `lc-${problem[0]}`;

  clearFilters();
  const row = $(`.prob[data-key="${key}"]`);
  if (!row) return;

  row.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'center'
  });
  row.classList.remove('flash');
  void row.offsetWidth;
  row.classList.add('flash');
  setTimeout(() => row.classList.remove('flash'), 2600);

  const minutes = problem[2] === 'H' ? 60 : problem[2] === 'M' ? 45 : 30;
  toast(`Phase ${ph.no} · ${problem[0]}. ${problem[1]} — ${minutes} min on a blank file.`);
}

/* ============================================================
   Boot
   ============================================================ */

function init() {
  renderRailNav();
  renderPhases();
  renderLabs();
  renderPatternSelect();
  bindEvents();
  updateAll();
}

init();
