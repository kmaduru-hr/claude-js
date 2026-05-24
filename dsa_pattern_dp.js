//Minimum Swaps to Make Subsequences Increasing DP problem
/*  
nums1 = [1, 3, 5, 4]      
nums2 = [1, 2, 3, 7]

i = 1
Pairs: (3,2)  
Both arrays naturally increasing → Condition A applies.

keep[1] = keep[0] = 0
swap[1] = swap[0] + 1 = 2

i = 2

Pairs: (5,3)  
Still naturally increasing

keep[2] = 0
swap[2] = 3

i = 3

Pairs: (4,7)  
Now natural increasing fails because 5 < 4 <==false==>
But cross increasing works:
nums1[2] < nums2[3]   → 5 < 7 ✔
nums2[2] < nums1[3]   → 3 < 4 ✔
So:
keep[3] = swap[2] = 3
swap[3] = keep[2] + 1 = 1

Final answer = min(keep[3], swap[3]) = 1

*/
var minSwap = function(nums1, nums2) {
    let keep = 0;   // no swap at i
    let swap = 1;   // swap at i

    for (let i = 1; i < nums1.length; i++) {
        let keepNew = Infinity;
        let swapNew = Infinity;

        const natural =
            nums1[i - 1] < nums1[i] &&
            nums2[i - 1] < nums2[i];

        const cross =
            nums1[i - 1] < nums2[i] &&
            nums2[i - 1] < nums1[i];

        if (natural) {
            keepNew = keep;
            swapNew = swap + 1;
        }

        if (cross) {
            keepNew = Math.min(keepNew, swap);
            swapNew = Math.min(swapNew, keep + 1);
        }

        keep = keepNew;
        swap = swapNew;
    }

    return Math.min(keep, swap);
};

//coin change [1 2 5] amount= 5
Function coinConvert(arr, k){
    Let dp= Array(k+1).fill(k+1);
    dp[0] = 0;
    for(let i=1; I< k; I++){
    	for(let coin of arr){
    	   if(I - coin >= 0){
    		dp[i] = Math.min(dp[i], dp[i-coin] + 1);
    	   }			
    	}
    } 
 Return dp[k] !== amount +1 ? dp[amount] : -1;
}



