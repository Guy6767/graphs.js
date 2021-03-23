function printList(lst, parse = v => v) {
  let temp = lst ? lst.head : null;
  let lstStr = ``;
  while (temp != null) {
    lstStr += `(${parse(temp.data)})->`;
    temp = temp.next;
  }
  console.log(lstStr.slice(0, lstStr.length - 2));
}

function swapNodesData(nodeOne, nodeTwo) {
  const temp = nodeOne.data;
  nodeOne.data = nodeTwo.data;
  nodeTwo.data = temp;
}

function reverse(lst) {
  let toSwap = true;
  function rec(rightNode) {
    if (!rightNode) return lst.head;
    // the current stack is the right most node
    // but the return value from the recursion is the left most node
    const leftNode = rec(rightNode.next);
    // swap only the second half
    toSwap && swapNodesData(leftNode, rightNode);
    if (leftNode == rightNode || leftNode.next == rightNode) toSwap = false;
    // advance the left node
    return leftNode.next;
  }

  rec(lst.head);
}

function toArray(lst) {
  const array = [];
  for (const v of lst) {
    array.push(v);
  }
  return array;
}

export { printList, reverse, toArray };
