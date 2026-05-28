//** palindrome
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function isPalindrome(head) {
  if (!head || !head.next) return true;

  // 1. Find middle (slow will be at mid)
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 2. Reverse second half
  let second = reverse(slow);

  // 3. Compare first and second halves
  let first = head;
  let copySecond = second; // to restore later if needed

  while (second) {
    if (first.val !== second.val) return false;
    first = first.next;
    second = second.next;
  }

  return true;
}

function reverse(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}
